<template>
  <div class="search-result-scroll">
      <div class="navigator-container" ref="viewport">
        <navigator :navList="searchResult" @change="change" :currentTabIndex="currentTabIndex">
          <span slot="item" slot-scope="props" class="tab-name" :class="{'link-active':isCurrent(props.index)}">{{props.text}}</span>
        </navigator>
      </div>
      <div class="tab-render-content">
        <!--单曲-->
        <scroll class="result-list songs-result" v-if="id==1">
          <ul>
            <li v-for="item in searchResult[0].result" :key="item.id" class="result-list-item">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-info">
                <span><span v-for="artist in item.artists" :key="artist.id" class="item-info-artist">{{ artist.name }}</span></span>
                 - <span>{{ item.album.name }}</span>
              </p>
            </li>
          </ul>
        </scroll>

        <!--歌手-->
        <scroll class="result-list artists-result" v-if="id==100">
          <ul>
            <li v-for="item in searchResult[1].result" :key="item.id" class="artists-result-list-item">
              <figure class="avatar-img">
                <img :src="item.img1v1Url" alt="">
              </figure>
              <div class="artist-name">
                <h4>{{ item.name }} <span v-for="i in  item.alia" :key="i">({{ i }})</span></h4>
                
              </div>
            </li>
          </ul>
        </scroll>

        <!--专辑-->
        <scroll class="result-list albums-result" v-if="id==10">
          <ul>
            <!--<li v-for="item in searchResult[2].result" :key="item.id" class="result-list-item">{{item.name}}</li>-->
            <li v-for="item in searchResult[2].result" :key="item.id" class="artists-result-list-item albums-result-list-item">
              <figure class="avatar-img">
                <img :src="item.blurPicUrl" alt="">
              </figure>
              <div class="artist-name">
                <h4>{{ item.name }}</h4>
                <h5>{{ item.artist.name }}</h5>
              </div>
            </li>
          </ul>
        </scroll>

        <!--歌单-->
        <scroll class="result-list playlists-result" v-if="id==1000">
          <ul>
            <li v-for="item in searchResult[3].result" :key="item.id" class="result-list-item">{{item.name}}</li>
          </ul>
        </scroll>

        <!--用户-->
        <scroll class="result-list userprofiles-result" v-if="id==1002">
          <ul>
            <li v-for="item in searchResult[4].result" :key="item.id" class="result-list-item">{{item.nickname}}</li>
          </ul>
        </scroll>
      </div>
  </div>
</template>

<script>
import Scroll from '@/components/base/Scroll/Scroll';
import Navigator from '@/components/base/Navigator/Navigator';
import { mapState, mapActions } from 'vuex';
import { getSearchResult } from '@/api/search';

export default {
  name: 'HelloWorld',
  components: {
    Scroll,
    Navigator,
  },
  data() {
    return {
      id: this.$route.params.id,
      currentTabIndex: 1, // 当前默认tab
    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'searchKeyWords',
      'searchResult',
    ]),
  },
  methods: {
    isCurrent(index) {
      return index === this.currentTabIndex;
    },
    change(item) {
      if (item !== undefined) {
        this.currentTabIndex = item.id;
        this.$router.replace(`/search/${item.id}`);
      }
    },
    _getSearchResult() {
      const keywords = this.searchKeyWords;
      const type = this.id;
      const nowItem = this.searchResult.find((item) => {
        return item.id === parseInt(this.id, 10);
      });
      if (nowItem) {
        const page = nowItem.page;
        getSearchResult(keywords, type, page).then((res) => {
          const params = {
            id: this.id,
            data: res.data.result[nowItem.key],
          };
          console.log(params);
          this.setSearchResultData(params);
        });
      }
    },
    ...mapActions([
      'setSearchResultData',
      'clearSearchResultData',
    ]),
  },
  created() {
    if (!this.searchKeyWords) {
      this.$router.push('/search');
    }
  },
  mounted() {
    setTimeout(() => {
      this.currentTabIndex = parseInt(this.id, 10);
    }, 20);
    this._getSearchResult();
  },
  beforeDestroy() {
    this.clearSearchResultData();
  },
  watch: {
    $route(val) {
      this.id = val.params.id;
      this._getSearchResult();
    },
  },
};
</script>

<style scoped>
  /* 搜索结果 */
  .search-result-scroll{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #fff;
  }
  .tab-render-content{
    position: absolute;
    left: 0;
    top: 41px;
    bottom: 0;
    width: 100%;
  }
  .result-list{
    height: 100%;
  }
  .result-list-item{
    margin-left: 10px;
    border-bottom: 1px solid #e2e3e5;
    padding: 10px 30px 10px 0;
    
  }
  .item-info-artist::after{
    content: ' / ';
  }
  .item-info-artist:last-child::after{
    content: '';
  }
  .item-name{
    margin-bottom: 6px;
    font-size: 14px;
    color: #000;
  }
  .item-info{
    font-size: 10px;
    color: #7e7e7e;
  }
  .item-name, .item-info{
    line-height: 1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  /*歌手*/
  .artists-result-list-item{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 60px;
    margin-left: 6px;
    box-sizing: border-box;
  }
  .artists-result-list-item .avatar-img, .artists-result-list-item .artist-name{
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    /*display: inline-block;*/
  }
  .artists-result-list-item .avatar-img{
    position: relative;
    width: 54px;
    height: 54px;
    margin-right: 8px;
    line-height: 0;
  }
  .artists-result-list-item .avatar-img img{
    width: 100%;
  }
  .artists-result-list-item .artist-name{
    width: 100%;
    height: 100%;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    border-bottom: 1px solid #e2e3e5;
  }
  .artists-result-list-item .artist-name span{
    color: #9c9d9f;
  }
  .artists-result-list-item .artist-name h4{
    font-size: 14px;
    font-weight: normal;
  }

  /*歌单*/
  .albums-result-list-item .avatar-img{
    margin-right: 20px;
  }
  .albums-result-list-item .avatar-img::after{
    content: "";
    position: absolute;
    top: 2px;
    right: -10px;
    width: 10px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(./albums-bg.png);
  }
</style>
