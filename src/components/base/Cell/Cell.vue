<template>
  <div class="cell">
    <figure class="cell-icon" :style="`background-image:url(${iconUrl})`">
      <slot name="left"></slot>
    </figure>
    <div class="cell-con">
      <h4 class="overflow-ellipsis cell-con-tit">
        <slot name="tit">{{ tit }}</slot>
      </h4>
      <h5 class="overflow-ellipsis cell-con-sub-tit">
        <slot name="sub-tit">{{ subTit }}</slot>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    iconUrl: String,
    tit: {
      type: [String, Number],
      default: '大标题'
    },
    subTit: [String, Number],
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
  .cell{
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 6px;
    box-sizing: border-box;
    width: 100%;
  }
  .cell .cell-con{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    border-bottom: 1px solid #e2e3e5;
    overflow: hidden;
    padding-right: 30px;
  }
  .cell .cell-con span{
    color: #9c9d9f;
  }
  .cell .cell-con .cell-con-tit{
    font-size: 14px;
    font-weight: normal;
    color: #000;
    line-height: 1.5;
  }
  .cell .cell-con .cell-con-sub-tit{
    font-size: 10px;
    font-weight: normal;
    color: #9c9d9f;
    line-height: 1.5;
  }
</style>
