var reg = {
  phone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  // name: /^\w{3,20}$/,
  name: /^[a-zA-Z]{3,20}$/,
  weakPassword: /(^\d{6,}$)|(^[a-zA-Z]{6,}$)|(^[^a-zA-Z0-9]{6,}$)/,
  password: /\d*\D*((\d+[a-zA-Z]+[^0-9a-zA-Z]+)|(\d+[^0-9a-zA-Z]+[a-zA-Z]+)|([a-zA-Z]+\d+[^0-9a-zA-Z]+)|([a-zA-Z]+[^0-9a-zA-Z]+\d+)|([^0-9a-zA-Z]+[a-zA-Z]+\d+)|([^0-9a-zA-Z]+\d+[a-zA-Z]+))\d*\D*/
}
export default {
  // 验证手机号
  checkTel (value) {
    if (value === '') {
      return ''
    }
    if (!(reg.phone.test(value))) {
      return true
    } else {
      return false
    }
  },
  // 验证email
  checkEmail (value) {
    if (value === '') {
      return ''
    }
    if (!(reg.email.test(value))) {
      return true
    } else {
      return false
    }
  },
  // 验证名字
  checkName (value) {
    if (value === '') {
      return ''
    }
    if (!(reg.name.test(value))) {
      return true
    } else {
      return false
    }
  },
  // 验证密码
  checkPassword (value) {
    if (value === '') {
      return ''
    }
    if (!(reg.password.test(value))) {
      return true
    } else {
      return false
    }
  },
  // 判断密码强度
  checkPasswordStrength (value) {
    if (value.length < 3 || value.length > 20) {
      return 'length'
    } else {
      if (reg.weakPassword.test(value)) {
        return 'weak'
      } else if (!reg.password.test(value)) {
        return 'middle'
      } else {
        return 'strong'
      }
    }
  },
  // 判断是否成年
  checkAdult (value) {
    if (!new Date(value)) { return false }
    let now = new Date()
    let bir = new Date(value)
    let agen = now - bir
    let age = Math.round((365 * 24 * 60 * 60 * 1000) * 18)
    return agen > age
  }
}