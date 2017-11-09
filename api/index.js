
// @flow
import genSign from './sign';
import 'isomorphic-fetch';
import Cookies from 'universal-cookie';
import withErrorHandled from './withErrorHandled';

const cookies = new Cookies();

var API_DOMAIN = process.env.API_DOMAIN;
var uid = cookies.get('uid');
var token = cookies.get('token');

const preParam = () => ({
  ...GetParamsForFetch(),
  app: 'distribution_system_front',
  sv: 1.0,
});

export async function Get(path: string, data: Object){
  console.log(`API in get: ${API_DOMAIN}${path}`);
  const query_obj = { ...data, ...preParam() };
  const sign = genSign(query_obj);
  const obj = { ...query_obj, sign: sign };
  console.log('query in get api:', obj);
  const query = Object.keys(obj).map(function(key) {
    return key + '=' + obj[key];
  }).join('&');
  const url = `${API_DOMAIN}${path}?${query}`;
  try{
    const res = await fetch(url);
    const json = res.json();
    return withErrorHandled(json);
  }catch(err){
    console.log('err', err);
    return {errno: -1, msg: '请求失败!'};
  }
}

export async function Post(path: string, data: Object){
  console.log(`API in post: ${API_DOMAIN}${path}`);
  const query_obj = { ...data, ...preParam() };
  const sign = genSign(query_obj);
  const obj = { ...query_obj, sign: sign };
  console.log('query in post api:', obj);
  const form = Object.keys(obj).map(function(key) {
    return key + '=' + data[key];
  }).join('&');
  const url = `${API_DOMAIN}${path}`;
  try{
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        //'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      credentials: 'include',
      body: form
    });
    const json = res.json();
    return withErrorHandled(json);
  }catch(err){
    console.log('err', err);
    return {errno: -1, msg: '请求失败!'};
  }
}

export function SetApiUserInfo(id, t){
  uid = id;
  token = t;
}

export function ClearApiUserInfo(){
  uid = '';
  token = '';
}

export function GetParamsForFetch(){
  var obj = {};
  if(uid){
    obj.uid = uid;
  }
  if(token){
    obj.token = token;
  }
  return obj;
}
