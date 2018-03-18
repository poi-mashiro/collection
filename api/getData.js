import fetch from './fetch';

/*
 * 获取短信验证码
 */

export const sendMessageCode = phone => fetch('/app/system/smsSend', { tel: phone }, 'POST');

/*
 * 验证码登录
 */

export const codeLogin = (phone, codeMessage) =>
  fetch(
    '/app/system/loginRegister',
    {
      tel: phone,
      code: codeMessage,
      platform: '',
      alias: ''
    },
    'POST'
  );

/*
 * 密码登录
 */

export const passwordLogin = (phone, password) =>
  fetch(
    '/app/system/pwdLogin',
    {
      tel: phone,
      pwd: password,
      alias: ''
    },
    'POST'
  );

/*
 * 发送邮箱验证
 */

export const sendEmail = email => fetch('/app/system/sendMail', { email }, 'POST');

/*
 * 验证邮箱验证码
 */

export const checkEmail = (email, code) => fetch('/app/system/yanEmail', { email, code }, 'POST');

/*
 * 验证手机是否可用
 */

export const checkPhone = tel => fetch('/app/system/telYz', { tel }, 'POST');

/*
 * 修改账号
 */

export const changePhone = (tel, email, emailCode, messageCode) =>
  fetch('/app/system/upTel', { tel, email, codes: emailCode, code: messageCode, alias: '' }, 'POST');
