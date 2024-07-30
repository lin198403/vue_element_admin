// token
const TOKEN = 'token'

// 国际化
const LOCALE = 'locale'

// 主题颜色
const THEME_COLOR = 'theme_color'
const THEME_COLOR_DEFAULT = 'rgba(64, 158, 255, 1)'  // 该值格式为 rgba(xx, xx, xx, xx)


// Excel 列名映射
const EXCEL_HEADERS = {
  eloyeeTable: {
    zhCn: {
      username: '姓名',
      mobile: '手机号码',
      role: '角色',
      openTime: '开通时间'
    },
    en: {
      username: 'username',
      mobile: 'mobile',
      role: 'role',
      openTime: 'openTime'
    }
  }
}


export {
  TOKEN,
  LOCALE,
  THEME_COLOR,
  THEME_COLOR_DEFAULT,
  EXCEL_HEADERS
}