<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    },
}
</script>

<style>
.el-message .el-icon-warning {
    color: #e6a23c;
    font-size: 0.15rem;
}
.el-message--success {
    font-size: 0.15rem;
}
.el-message .el-icon-error {
    font-size: 0.15rem;
}

body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    font-family: "Microsoft Yahei",sans-serif;
    -webkit-tap-highlight-color:transparent;
    -webkit-font-smoothing: antialiased;
}

</style>
