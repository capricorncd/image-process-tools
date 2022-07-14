/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/14 21:34:02 (GMT+0900)
 */
import { $, createElement } from 'zx-sml'
import { handleMediaFile } from '../src'
import { MediaFileHandlerOptions } from '../types'

const img = createElement<HTMLImageElement>('img')
const input = createElement<HTMLInputElement>('input', { type: 'file' })
const textarea = createElement<HTMLTextAreaElement>('textarea', {
  style: {
    marginTop: '1em',
    display: 'block',
    minWidth: '90%',
    maxWidth: '100%',
    height: '50vh',
  },
})
const body = $('#app')!
body.append(input, img, textarea)

// const cropInfo = {
//   sx: 100,
//   sy: 200,
//   sw: 1500,
//   sh: 1500,
// }

const options: Partial<MediaFileHandlerOptions> = {
  // width: 600,
  // height: 200,
  // currentTime: 0
  // cropInfo
  longestSide: 1000,
}

input.addEventListener('change', (e) => {
  const el = e.currentTarget as HTMLInputElement
  const file = el.files![0]
  handleMediaFile(file, options)
    .then((res) => {
      console.log(res)
      img.src = res.url
      res.data = `${res.data.slice(0, 50)}...`
      res.raw.data = `${res.raw.data.slice(0, 50)}...`
      textarea.innerHTML = JSON.stringify(res, null, 2)
    })
    .catch((err) => {
      console.error(err)
    })
  el.value = ''
})
