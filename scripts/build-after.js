/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/12 13:14:13 (GMT+0900)
 */
const fs = require('fs')
const { EOL } = require('os')
const path = require('path')
const { formatDate } = require('zx-sml')
const pkg = require('../package.json')

const distDir = path.resolve(__dirname, '../dist')

const header = [
  '/*!',
  ` * ${pkg.name} version ${pkg.version}`,
  ` * Author: ${pkg.author}`,
  ` * Repository: ${pkg.repository}`,
  ` * Released on: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss (g)')}`,
  ` */`,
]

function addHeader(file) {
  const liens = fs.readFileSync(file, 'utf8').toString().split(EOL)
  fs.writeFileSync(file, [...header, ...liens].join(EOL), 'utf8')
}

function createIndexHtml() {
  const html = `<!DOCTYPE html><html lang="en"><head><meta http-equiv="refresh" content="0;url=../demo"><meta name="author" content="capricorncd"><meta name="keywords" content="capricorncd"><meta name="description" content="https://github.com/capricorncd"></head><body>I can't log in to GitHub because I can't receive the mobile verification code.</body></html>`
  fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8')
}

function main() {
  fs.readdirSync(distDir).forEach((file) => {
    if (/\.js$/.test(file)) {
      addHeader(path.join(distDir, file))
    }
  })
  createIndexHtml()
}

main()
