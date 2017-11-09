/* eslint-disable */

import sha1 from 'simple-sha1';
import md5 from 'md5';

const IgnoreNull = true;

function encode(value) {
  return String(value);
}

function keys(obj) {
  return Object.keys(obj).sort();
}

function filterjoin(arr) {
  return arr.filter(e => e).join('&');
}

function objnest(name, obj) {
  return filterjoin(keys(obj).map(key => nest(`${name}[${key}]`, obj[key])));
}

function arrnest(name, arr) {
  return arr.length
    ? filterjoin(arr.map((elem, index) => nest(`${name}[${index}]`, elem)))
    : encode(`${name}[]`);
}

function nest(name, value) {
  const type = typeof value;
  let f = null;

  if (value === f) {
    f = IgnoreNull ? f : `${encode(name)}=${f}`;
  } else if (/string|number|boolean/.test(type)) {
    f = `${encode(name)}=${encode(value)}`;
  } else if (Array.isArray(value)) {
    f = arrnest(name, value);
  } else if (type === 'object') {
    f = objnest(name, value);
  }
  return f;
}

export default function genSign(data) {
  let str = data && filterjoin(keys(data).map(key => nest(key, data[key])));
  // console.log(str);
  str = sha1.sync(str);
  // console.log(`sha1: ${str}`);
  str = md5(str);
  // console.log(`md5: ${str}`);
  return str;
}

export function Md5(str){
  return md5(str);
}