/**
 * Mocking client-server processing
 * 只发送请求，不处理业务逻辑
 */
import {
  post,
  get
} from '../js/common'
// const BASEURL = 'https://server.jianxiakeji.com'
const BASEURL = ''

export default {
  // 获取微信二维码
  getWxCode() {
    return get(BASEURL + '/api/wechat/code')
  },
  // 获取扫码状态
  getWxCodeStatus(sign) {
    return post(BASEURL + '/api/wechat/status', sign)
  },
  // 获取用户信息
  getUserInfo() {
    return post(BASEURL + '/api/me')
  },
  // 获取验证码 已移除
  getImgCode(code) {
    return get(BASEURL + '/api/login/code', code)
  },
  // 获取手机验证码
  getMobileCode(params) {
    return post(BASEURL + 'api/login/send/code', params)
  },
  // 手机号登陆
  login4mobile(params) {
    return post(BASEURL + '/api/login', params)
  },
}
