/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */
const path = require('path')
const fs = require('fs')
const { EOL } = require('os')
const { outputFile, writeFileSync } = require('zx-sml/nodejs')

const BLANK_LINE = ''

const LOCALE_TYPES = {
  US: 'en_US',
  CN: 'zh_CN',
  JP: 'ja_JP',
}
const locales = [LOCALE_TYPES.US, LOCALE_TYPES.CN, LOCALE_TYPES.JP]

/**
 * get i18n data
 * @returns `Record<string, Map<string, string>>`
 */
function getI18n() {
  const data = {}
  let index = 0
  let key
  fs.readFileSync(path.resolve(__dirname, './i18n.properties'), 'utf8')
    .toString()
    .split(EOL)
    .forEach((line) => {
      if (index >= locales.length && line) {
        index = 0
      }

      if (line) {
        if (index === 0) {
          key = line
          data[key] = new Map()
        } else {
          data[key].set(locales[index], line)
        }
      }
      index++
    })

  return data
}

const i18nData = getI18n()

function toLocaleString(line, locale) {
  return i18nData[line]?.get(locale) || line
}

const outputFileOptions = {
  typeWithAuto: true,
  lines: {
    end: [
      '## Other methods',
      BLANK_LINE,
      "These methods's documentation see https://github.com/capricorncd/zx-sml",
      BLANK_LINE,
      '```js',
      'import {',
      '  fileToBase64,',
      '  createElement,',
      '  formatBytes,',
      '  splitBase64,',
      '  createBlobURL,',
      '  base64ToBlob,',
      "} from 'image-process'",
      '```',
      BLANK_LINE,
      '## License',
      BLANK_LINE,
      'Code and documentation copyright 2018-Present. [Capricorncd](https://github.com/capricorncd). Code released under the MIT License.',
    ],
  },
}

function main() {
  const { lines } = outputFile(
    [
      path.resolve(__dirname, '../types.d.ts'),
      path.resolve(__dirname, '../src'),
    ],
    path.resolve(__dirname, '../../../README.md'),
    outputFileOptions
  )

  // zh_CN
  writeFileSync(
    path.resolve(__dirname, '../../../docs/README.md'),
    lines.map((line) => toLocaleString(line, LOCALE_TYPES.CN))
  )

  // ja_JP
  writeFileSync(
    path.resolve(__dirname, '../../../docs/ja_JP.md'),
    lines.map((line) => toLocaleString(line, LOCALE_TYPES.JP))
  )
}

main()
