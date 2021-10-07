/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-10-07 16:46 (GMT+0900)
 */
export interface MediaFileHandlerOptions {
  // Process images according to device pixel ratio
  enableDevicePixelRatio: boolean;
  height: number;
  // When the image width or height is less than the set value,
  // force the target image width or height to be adjusted to the set value
  isForce: boolean;
  // Multipurpose Internet Mail Extensions
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  mimeType: string;
  // When large images are reduced several times,
  // the pixels are reduced each time
  perResize: number;
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  // A Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp.
  // If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
  quality: number;
  width: number;
  cropInfo?: OptionsCropInfo;
}

interface OptionsCropInfo {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

interface MediaFileHandlerData {
  base64: string;
  blob: Blob;
  element: HTMLCanvasElement;
  height: number;
  width: number;
  url: string;
  size: number;
  type: string;
  raw: MediaFileHandlerRawData;
  // The following data is returned when the video
  videoFile: File;
  videoWidth: number;
  videoHeight: number;
  duration: number;
  currentTime: number;
}

interface MediaFileHandlerRawData {
  element: HTMLImageElement;
  base64: string;
  height: number;
  width: number;
  size: number;
  type: string;
}

export function handleMediaFile(file: File, options: Partial<MediaFileHandlerOptions>): Promise<MediaFileHandlerData>;

export type AnyObject = Record<string, any>;

export function createElement(tag: string, attrs?: AnyObject): HTMLElement;
export function base64ToBlob(base64: string): Blob;
export function convertFileSize(size: number): string;

export interface CreateCanvasParams {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

export function createCanvas(el: HTMLImageElement | HTMLCanvasElement, params: CreateCanvasParams): HTMLCanvasElement;

export interface Base64Info {
  type: string;
  data: string;
}

export function getBase64Info(base64: string): Base64Info;
export function readFile(file: File): Promise<string | ArrayBuffer>;
export function toBlobUrl(file: File | Blob): string;
