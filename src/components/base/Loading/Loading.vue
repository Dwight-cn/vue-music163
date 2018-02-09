<template>
  <div class="mf-loading-container">
    <img src="./loading.gif"><span>正在加载...</span>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading';

  export default {
    name: COMPONENT_NAME,
  };
</script>
<style scoped>
  .mf-loading-container{
    text-align: center;
    padding: 30px 0;
  }
  .mf-loading-container img{
    width: 20px;
    height: 20px;
    /*display: block;*/
  }
  .mf-loading-container span{
    font-size: 14px;
    line-height: 20px;
    vertical-align: top;
    padding-left: .5em;
    color: #7e7e7e;
  }
</style>
