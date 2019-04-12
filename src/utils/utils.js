var reg = {
  phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
  email: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  name: /^[\u4E00-\u9FA5A-Za-z_]{1,20}$/,
  // name: /^[a-zA-Z]{3,20}$/,
  weakPassword: /(^\d{6,}$)|(^[a-zA-Z]{6,}$)|(^[^a-zA-Z0-9]{6,}$)/,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  // password: /\d*\D*((\d+[a-zA-Z]+[^0-9a-zA-Z]+)|(\d+[^0-9a-zA-Z]+[a-zA-Z]+)|([a-zA-Z]+\d+[^0-9a-zA-Z]+)|([a-zA-Z]+[^0-9a-zA-Z]+\d+)|([^0-9a-zA-Z]+[a-zA-Z]+\d+)|([^0-9a-zA-Z]+\d+[a-zA-Z]+))\d*\D*/,
  address: /^[A-Za-z0-9]{40,42}$/,
  price:/(^[0-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
}
export default {
  // 验证手机号
  checkTel (value) {
    if (value === '') {
      return true
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
      return true
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
      return true
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
      return true
    }
    if (!(reg.password.test(value))) {
      return true
    } else {
      return false
    }
  },
  // 判断密码强度
  checkPasswordStrength (value) {
    if (value.length < 6 || value.length > 20) {
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
  },
  // 验证钱包地址
  checkAddress (value) {
    if (value === '') {
      return true
    }
    if (!(reg.address.test(value))) {
      return true
    } else {
      return false
    }
  },
  // 验证价格
  checkPrice (value) {
    if (value === ''|| value == 0) {
      return true
    }
    if (!(reg.price.test(value))) {
      return true
    } else {
      return false
    }
  }
}
