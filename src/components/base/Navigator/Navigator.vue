<template>
  <div ref="viewport" class="navigator-component">
    <scroll ref="scroll" direction="horizontal">
      <ul class="tab-list" ref="tabList">
        <li v-for="item in navList" class="tab-item" @click="selectNav(item)" :key="item.id">
          <slot name="item" :text="item.name" :index="item.id">
            <span class="tab-name" :class="{'link-active':isCurrentTab(item.id)}">{{item.name}}</span>
          </slot>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@/components/base/Scroll/Scroll';

  const EVENT_CHANGE = 'change';

  export default {
    props: {
      navList: {
        type: Array,
        default() {
          return [{
            id: 1,
            name: 'default',
          }];
        },
      },
      currentTabIndex: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        currentTab: 4,
        current: 1,
      };
    },
    mounted() {
      this._initTabListWidth();
      this.$emit(EVENT_CHANGE);
      if (this.currentTabIndex === null) {
        this.current = this.currentTab;
      } else {
        this.current = this.currentTabIndex;
      }
      setTimeout(() => {
        this._adjust(this.current);
      }, 500);
    },
    methods: {
      isCurrentTab(index) {
        return index === this.current;
      },
      selectNav(item) {
        this.current = item.id;
        this._adjust(item.id);
        this.$emit(EVENT_CHANGE, item);
      },
      _initTabListWidth() {
        const tabList = this.$refs.tabList;
        const items = tabList.children;
        let width = 0;
        for (let i = 0; i < items.length; i++) {
          width += items[i].clientWidth;
        }
        tabList.style.width = `${width + 1}px`;
      },
      _adjust(tabId) {
        const viewportWidth = this.$refs.viewport.clientWidth;
        const tabListWidth = this.$refs.tabList.clientWidth;
        const minTranslate = Math.min(0, viewportWidth - tabListWidth);
        const middleTranslate = viewportWidth / 2;
        const items = this.$refs.tabList.children;
        let width = 0;
        this.navList.every((item, index) => {
          if (item.id === tabId) {
            return false;
          }
          width += items[index].clientWidth;
          return true;
        });
        let translate = middleTranslate - width;
        translate = Math.max(minTranslate, Math.min(0, translate));
        this.$refs.scroll.scrollTo(translate, 0, 300);
      },
    },
    components: {
      Scroll,
    },
  };
</script>

<style >
  .navigator-component .list-wrapper{
    background: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
  }
  .navigator-component .list-wrapper .scroll-content{
    display: inline-block;
  }
  .navigator-component .list-wrapper .tab-list{
    margin: 0 auto;
  }
  .navigator-component .list-wrapper .tab-list .tab-item{
    display: inline-block;
    width: 82px;
    text-align: center;
  }
  .navigator-component .list-wrapper .tab-list .tab-item .tab-name{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    position: relative;
    padding: 0 5px;
    font-size: 14px;
    color: #000;
    box-sizing: border-box;
  }
  .navigator-component .list-wrapper .tab-list .tab-item .tab-name.link-active{
    transition: all 0.1s;
    /*transform: scale(1.04);*/
    color: #d63c34;
    border-bottom: 2px solid #d63c34;
  }
</style>
