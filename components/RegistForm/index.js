import Helmet from 'react-helmet'
import styled from 'styled-components'
import Router from 'next/router'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Select, message } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

const Div = styled.div`
  margin-bottom:50px;
  .login-form-button {
    width: 100%;
    height:50px;
    font-size:20px;
    background:#42DBEA;
    border-color:#42DBEA;
    margin-top:0px;
  }
  .ant-input{
    border: 1px solid #42DCEB;
    border-radius: 2px;
    font-size:16px;
  }
  .ant-select{
    font-size:14px;
  }
  .ant-input-lg{
    height:40px;
  }
  .ant-input-affix-wrapper .ant-input:not(:first-child){
    padding-left:30px;
  }
  .forgot{
    font-size:14px;
  }
  .ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-indeterminate .ant-checkbox-inner, .ant-input-group-addon{
    background-color:#42DBEA;
    border-color:#42DBEA;
  }
  .ant-checkbox-input:focus+.ant-checkbox-inner, .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner{
    border-color:#42DBEA;
  }
  .verify-btn{
    height:40px;
    width:100%;
    color:#42DBEA;
    font-size:14px;
    border-color:#42DBEA;
  }
`
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NormalLoginForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      captchaFix: Math.random(),
      captchaBtnDisabled: false,
      captchaBtnText: '获取验证码',
    }

    this.refreshCode = this.refreshCode.bind(this);
    this.startCaptchaCount = this.startCaptchaCount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const json = await Post('/user/register', {...values});
        console.log(json);
        if(json.errno != 0){
          message.error(json.msg, 3);
          return;
        }
        message.success('注册成功！', 2, () => Router.push('/login'));
      }
    });
  }

  getCaptcha = async () => {
    const form = this.props.form;
    form.validateFields(['mobile', 'code'], { force: true }, async (errors, values) => {
      if(!errors){
        const mobile = form.getFieldValue('mobile');
        const code = form.getFieldValue('code');
        const json = await Post('/sms/send_mess', {mobile, type: 1, code});
        console.log(json);
        if(json.errno != 0){
          message.error(json.msg, 3);
          return;
        }
        message.success('验证码已发送');
        this.setState({
          captchaBtnDisabled: true,
          captchaBtnText: 60,
        });
        form.setFieldsValue({identifier: json.data.identifier});
        this.startCaptchaCount();
      }
    });
  }

  startCaptchaCount(){
    var itv = setInterval(() => {
      if(this.state.captchaBtnText > 0){
        this.setState({
          captchaBtnText: this.state.captchaBtnText - 1
        });
      }else{
        this.setState({
          captchaBtnText: '获取验证码',
          captchaBtnDisabled: false
        });
        clearInterval(itv);
      }
    }, 1000);
  }

  refreshCode(){
    this.setState({
      captchaFix: Math.random(),

    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
    <Div>
      <Helmet>
        <link rel="stylesheet" href="/static/dist/antd.min.css" />
      </Helmet>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入您的手机号' }],
          })(
            <Input type="number" addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('code', {
                rules: [
                  { required: true, message: '请输入图形验证码' },
                ],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={8}>
              <img
                src={`http://47.94.36.3:7721/captcha?v=${this.state.captchaFix}`}
                style={{display:'block', width: '100%', height: '100%', cursor: 'pointer'}}
                onClick={this.refreshCode}
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [
                  { required: true, message: '请输入验证码' },
                ],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={8}>
              <Button size="large" className="verify-btn" onClick={this.getCaptcha} disabled={this.state.captchaBtnDisabled}>{this.state.captchaBtnText}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 20, color:'#42DCEB' }} />} type="password" placeholder="请输入您的密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password_repeat', {
            rules: [{ required: true, message: '请再次输入您的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 20, color:'#42DCEB' }} />} type="password" placeholder="请再次输入您的密码" />
          )}
        </FormItem>
        <FormItem style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            rules: [{ required: true, message: '请勾选协议' }],
          })(
            <Checkbox style={{fontSize:"14px"}}>我已经阅读并接受<a href="" style={{color:'#48AEFD'}}>《浑水分销平台注册协议》</a></Checkbox>
          )}
        </FormItem>
        <FormItem style={{height: '0px'}}>
          {getFieldDecorator('identifier', {
            rules: [{ required: true, message: '短信验证码错误' }],
          })(
            <Input type="hidden" placeholder="" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())}>
          注册
        </Button>
      </Form>
    </Div>
  );
}
}
module.exports = Form.create()(NormalLoginForm);
