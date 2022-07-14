/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/11 13:13:33 (GMT+0900)
 */
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')

const BLANK_LINE = ''
const METHOD_START = '<!--METHOD_START-->'
const METHOD_END = '<!--METHOD_END-->'

function handleFile(filePath, data) {
  let isMethod = false
  let isCode = false
  let methodName = null
  let tempStr
  fs.readFileSync(filePath)
    .toString()
    .split(new RegExp(EOL))
    .forEach((line) => {
      line = line.trim()
      // Start with method annotations
      // Extract the method name
      if (line.startsWith('* @method') && /^\*\s*@method\s*(.+)/.test(line)) {
        isMethod = true
        methodName = RegExp.$1
        data[methodName] = {
          desc: [],
          params: [],
          returns: [],
          codes: [],
        }
        return
      } else if (line === '*/' && isMethod) {
        isMethod = false
        methodName = null
        return
      }
      if (!isMethod || !methodName) return

      if (/^\*\s*```\w+/.test(line)) {
        isCode = true
      }

      if (/^\*\s*(.+)/.test(line)) {
        tempStr = RegExp.$1
        if (tempStr.startsWith('@param')) {
          data[methodName].params.push(tempStr.replace('@param', '').trim())
        } else if (tempStr.startsWith('@returns')) {
          data[methodName].returns.push(tempStr.replace('@returns', '').trim())
        } else if (isCode) {
          data[methodName].codes.push(tempStr)
        } else {
          data[methodName].desc.push(tempStr.replace('@description', '').trim())
        }
      }

      if (isCode && /^\*\s*```$/.test(line)) {
        isCode = false
      }
    })
}

function createMethodsDoc(data) {
  const lines = []
  let item
  Object.keys(data)
    .sort()
    .forEach((method) => {
      item = data[method]
      if (item.codes.length) {
        item.codes.unshift(BLANK_LINE)
        item.codes.push(BLANK_LINE)
      }
      lines.push(
        `### ${method}`,
        BLANK_LINE,
        item.desc.join(EOL),
        BLANK_LINE,
        // '*' will be replaced by 'npx pretty-quick --staged' with '-'
        // item.params.map((param) => `* @param ${param}`).join(EOL),
        item.params.map((param) => `- @param ${param}`).join(EOL),
        BLANK_LINE,
        item.returns.map((ret) => `- @returns ${ret}`).join(EOL),
        item.codes.join(EOL)
      )
    })
  return lines
}

/**
 * <!--METHOD_START-->
 * <!--METHOD_END-->
 * @param data
 */
function writeInReadmeFile(data) {
  const readmeFile = path.resolve(__dirname, '../README.md')
  const lines = []
  let isMethodStart = false
  fs.readFileSync(readmeFile, 'utf8')
    .toString()
    .split(new RegExp(EOL))
    .forEach((line) => {
      if (line.trim() === METHOD_START) {
        isMethodStart = true
        lines.push(METHOD_START, ...createMethodsDoc(data), METHOD_END)
        return
      }
      if (line.trim() === METHOD_END) {
        isMethodStart = false
        return
      }
      if (!isMethodStart) lines.push(line)
    })
  fs.writeFileSync(readmeFile, lines.join(EOL))
}

function main() {
  const data = {}
  // Read files from the src directory
  const srcDir = path.resolve(__dirname, '../src')
  fs.readdirSync(srcDir)
    .filter((file) => file !== 'index.ts')
    .forEach((file) => {
      if (/\w+\.ts$/.test(file)) {
        handleFile(path.join(srcDir, file), data)
      }
    })
  // README.md
  writeInReadmeFile(data)
}

main()
