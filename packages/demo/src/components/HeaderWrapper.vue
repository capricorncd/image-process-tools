<template>
  <header>
    <h1>
      image-process <span>v {{ pkg.version }}</span>
    </h1>
    <a
      href="https://github.com/capricorncd/image-process-tools"
      target="_blank"
    >
      <svg
        height="24"
        class="octicon octicon-mark-github"
        viewBox="0 0 16 16"
        version="1.1"
        width="24"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </a>
  </header>
</template>

<script setup>
import pkg from '../../../../package.json'
</script>

<style lang="scss">
header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #24292e;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: #fff;
    line-height: 60px;
    margin: 0 0 0 20px;
    font-weight: 500;
    font-size: 24px;
    font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei,
      Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
    span {
      font-size: 0.5em;
    }
  }
  a {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -12px;
    font-size: 0;
    opacity: 0.6;
    color: #fff;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
