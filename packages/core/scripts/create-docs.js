/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */
const path = require('path')
const { outputFile } = require('zx-sml/nodejs')

const BLANK_LINE = ''

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
  outputFile(
    [
      path.resolve(__dirname, '../types.d.ts'),
      path.resolve(__dirname, '../src'),
    ],
    path.resolve(__dirname, '../../../README.md'),
    outputFileOptions
  )
}

main()
