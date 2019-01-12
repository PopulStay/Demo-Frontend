<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/index.scss';
@import 'http://at.alicdn.com/t/font_876039_h5xbel6q707.css';
@import 'http://at.alicdn.com/t/font_896136_amodn458mfa.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
