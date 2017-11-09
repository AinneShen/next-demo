import styled from 'styled-components'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Form, Input, Button, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const Div = styled.div`
	width:886px;
	height:725px;
	border:1px solid #ccc;
	background:#fff;
	padding:28px 30px 82px 30px;
	box-sizing:content-box;
	margin-bottom:117px;
	font-family: PingFangSC-Regular;
	color: #333333;
	line-height:20px;
	.has-error .ant-form-explain{
		margin-left:10px;
		display:inline-block;
	}
	.ant-form-item{
		margin-bottom:20px;
	}
	label{
		font-size: 14px !important;
		font-family: PingFangSC-Regular;
	}
	.ant-form-item-label{
		text-align:left;
	}
	.ant-form-item-required::before{
		content:'';
		display:none;
	}
	.ant-form-extra{
		padding-top:10px;
		font-size: 14px !important;
		color: #666666;
		font-family: PingFangSC-Regular;
	}
	.ant-input{
		width:200px;
		height:30px;
		border: 1px solid #979797;
		border-radius: 2px;
	}
	.IPs{
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #333333;
		line-height: 24px;
	}
	.coprBtn{
		width:48px;
		height:24px;
		line-height:24px;
		text-align:center;
		display:inline-block;
		border: 1px solid #03A0F0;
		border-radius: 2px;
		color: #03A0F0;
		margin-left:22px;
		cursor:pointer;
	}
	.submitBtn{
		margin:77px 0 0 100px;
		width:138px;
		height:40px;
		display:block;
		line-height:40px;
		text-align:center;
		color:#fff;
		background: #F55200;
		border-radius: 2px;
		font-size:16px;
		border:none;
	}
`

class SettingsForm extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 3
			},
			wrapperCol: {
				span: 21
			},
		};
		let IPs = [];
		let copys=''
		for(let i=0;i<this.props.IP.length;i++){
			copys+=this.props.IP[i]+"\n";
			IPs.push(this.props.IP[i]);
			if(i!==this.props.IP.length-1){
				IPs.push(<br key={i}/>);
			}
		}
    return (
    	<Div>
				<Form onSubmit={this.handleSubmit}>
				    <FormItem
							{...formItemLayout}
							label=" 类型"
						>
				      {getFieldDecorator('type')(
				        <label style={{color:' #333333'}} onClick={this.props.changeRenzheng}>
									<img style={{verticalAlign:'middle',marginRight:'10px'}} src={`/static/images/radio-${this.props.renzheng?'on':'off'}.png`}/>
									认证公众号
								</label>
				      )}
				    </FormItem>
            <FormItem
							{...formItemLayout}
							label=" 类型"
						>
				      {getFieldDecorator('type',{
                initialValue:1
              })(
                <RadioGroup name="radiogroup" defaultValue={1}>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </RadioGroup>
				      )}
				    </FormItem>
				    <FormItem
							{...formItemLayout}
				    	label="原始ID"
							extraColor="red"
				    >
				      {getFieldDecorator('wxid', {
				        rules: [{ required: true, message: '请输入原始ID' }],
				      })(
								<div>
					        <Input type="text" />
									<div style={{color:'#E80000'}} className="ant-form-extra">上线后请不要随意修改公众号，否则会影响先前的粉丝，如需换号请申请开新号。</div>
								</div>
							)}
				    </FormItem>
						<FormItem
		          {...formItemLayout}
		          label="微信号"
		        >
		          {getFieldDecorator('wechatNum', {
		            rules: [{
		              required: true, message: '请输入微信号',
		            }],
		          })(
		            <Input />
		          )}
		        </FormItem>
						<FormItem
		          {...formItemLayout}
		          label="昵称"
		        >
		          {getFieldDecorator('nickname', {
		            rules: [{
		              required: true, message: '请输入昵称',
		            }],
		          })(
		            <Input />
		          )}
		        </FormItem>
						<FormItem
		          {...formItemLayout}
		          label="App ID"
		        >
		          {getFieldDecorator('AppID', {
		            rules: [{
		              required: true, message: '请输入App ID',
		            }],
		          })(
		            <Input />
		          )}
		        </FormItem>
						<FormItem
		          {...formItemLayout}
		          label="App Secret"
		        >
		          {getFieldDecorator('AppSecret', {
		            rules: [{
		              required: true, message: '请输入App Secret',
		            }],
		          })(
		            <Input />
		          )}
		        </FormItem>
						<FormItem
		          {...formItemLayout}
		          label="IP白名单"
		        >
		          {getFieldDecorator('IPs')(
								<div>
									<span className="IPs">
										{IPs}
									</span>
									<CopyToClipboard text={copys} >
										<span className="coprBtn">复制</span>
									</CopyToClipboard>
								</div>
		          )}
		        </FormItem>
						<FormItem
		          {...formItemLayout}
		          label="引导关注链接"
							extra="如果不填，则默认使用公众号的二维码引导关注"
		        >
		          {getFieldDecorator('subscribe_url')(
		            <Input />
		          )}
		        </FormItem>
				    <FormItem>
				      <Button
				        type="primary"
				        htmlType="submit"
				        disabled={hasErrors(getFieldsError())}
				        className="submitBtn"
				      >
				        确认
				      </Button>
				    </FormItem>
				</Form>
		</Div>
    );
  }
}

export default Form.create()(SettingsForm);
