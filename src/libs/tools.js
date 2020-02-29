/*
* 判断数据类型
* */
export const checkTools = {
  _typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }

    if (obj instanceof Element) {
      return 'element'
    }

    return map[toString.call(obj)]
  },
  isFunction (obj) {
    return this._typeOf(obj) === 'function'
  },
  isBoolean (obj) {
    return this._typeOf(obj) === 'boolean'
  },
  isNumber (obj) {
    return this._typeOf(obj) === 'number'
  },
  isString (obj) {
    return this._typeOf(obj) === 'string'
  },
  isDate (obj) {
    return this._typeOf(obj) === 'date'
  },
  isRegExp (obj) {
    return this._typeOf(obj) === 'regExp'
  },
  isArray (obj) {
    return this._typeOf(obj) === 'array'
  },
  isUndefined (obj) {
    return this._typeOf(obj) === 'undefined'
  },
  isNull (obj) {
    return this._typeOf(obj) === 'Null'
  },
  isObject (obj) {
    return this._typeOf(obj) === 'object'
  }
}
/**
 * @function deepClone
 * @Description: 用于数据的深拷贝
 * @params target：需要拷贝的对象
 */
export const deepClone = (target) => {
  let obj = null

  if (checkTools.isArray(target)) {
    obj = []
    target.forEach((item) => {
      obj.push(deepClone(item))
    })
  } else if (checkTools.isObject(target)) {
    obj = {}

    for (const key in target) {
      obj[key] = deepClone(target[key])
    }
  } else {
    return target
  }

  return obj
}
/**
 * 操作localStorage
 * @type {{set(*=, *=, *=): void, get(*=, *=): string | null, remove(*)}}
 */
export const ls = {
  set (key = '', val, type = 'JSON') {
    if (arguments.length < 2) {
      throw Error('Invalid Params')
    } else {
      type = type === 'JSON'

      if (type) {
        val = JSON.stringify(val)
      }

      localStorage.setItem(key, val)
    }
  },
  get (key, type = 'JSON') {
    type = type === 'JSON'
    let val = localStorage.getItem(key)

    if (type) {
      val = JSON.parse(val)
    }

    return val
  },
  remove (...keys) {
    for (const key of keys) {
      localStorage.removeItem(key)
    }
  },
  clear () {
    localStorage.clear()
  }
}
/**
 * 操作sessionStorage
 * @type {{set(*=, *=, *=): void, get(*=, *=): string | null, remove(*)}}
 */
export const ss = {
  set (key = '', val, type = 'JSON') {
    if (arguments.length < 2) {
      throw Error('Invalid Params')
    } else {
      type = type === 'JSON'

      if (type) {
        val = JSON.stringify(val)
      }

      sessionStorage.setItem(key, val)
    }
  },
  get (key, type = 'JSON') {
    type = type === 'JSON'
    let val = sessionStorage.getItem(key)

    if (type) {
      val = JSON.parse(val)
    }

    return val
  },
  remove (...keys) {
    for (const key of keys) {
      sessionStorage.removeItem(key)
    }
  },
  clear () {
    sessionStorage.clear()
  }
}
/**
 * 日期格式化方法
 * @param format
 * @returns {string|Date}
 */
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (format = '') {
  if (!format) return this

  const y = this.getFullYear()
  const m = this.getMonth() + 1
  const d = this.getDate()
  const hh = this.getHours()
  const mm = this.getMinutes()
  const ss = this.getSeconds()

  return format.replace(/yyyy/gi, y)
    .replace(/MM/g, m)
    .replace(/dd/g, d)
    .replace(/hh/g, hh)
    .replace(/mm/g, mm)
    .replace(/ss/g, ss)
}
/**
 * 是否为空对象
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj = {}) => {
  for (const key in obj) {
    return false
  }
  return true
}
