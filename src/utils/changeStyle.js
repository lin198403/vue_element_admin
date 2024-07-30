import { TinyColor } from '@ctrl/tinycolor'

function changeStyle (color) {
  let styleEl = document.querySelector('style[id = theme-rewrite]')
  let content = `
    :root {
      --el-color-primary: ${color};
      --el-color-primary-light-3: ${new TinyColor(color).setAlpha(0.7).toRgbString()};
      --el-color-primary-light-5: ${new TinyColor(color).setAlpha(0.5).toRgbString()};
      --el-color-primary-light-7: ${new TinyColor(color).setAlpha(0.3).toRgbString()};
      --el-color-primary-light-8: ${new TinyColor(color).setAlpha(0.2).toRgbString()};
      --el-color-primary-light-9: ${new TinyColor(color).setAlpha(0.1).toRgbString()};
      --el-color-primary-dark-2: ${new TinyColor(color).shade(30).toRgbString()};
    }
  `

  if(!styleEl) {
    styleEl = document.createElement('style')
    styleEl.setAttribute('id', 'theme-rewrite')
    styleEl.append(content)
    document.querySelector('head').append(styleEl)
  } else {
    styleEl.innerHTML = content
  }
}


export default changeStyle