<template>
  <div class="search-result-scroll">
      <div class="navigator-container" ref="viewport">
        <navigator :navList="searchResult" @change="change" :currentTabIndex="currentTabIndex">
          <span slot="item" slot-scope="props" class="tab-name" :class="{'link-active':isCurrent(props.index)}">{{props.text}}</span>
        </navigator>
      </div>
      <div class="tab-render-content">
        <!--单曲-->
        <scroll class="result-list songs-result" v-if="id==1" :pullUpLoad="loadmore">
          <ul>
            <li v-for="(item,index) in searchResult[0].result" :key="item.id" class="result-list-item" @click="_insertSong(item)">
              <div class="result-list-item-con">
                <h4 class="overflow-ellipsis">{{ item.name }}</h4>
                <h5 class="overflow-ellipsis">
                  <span><span v-for="artist in item.artists" :key="`${index}attist${artist.name}`" class="item-info-artist">{{ artist.name }}</span></span>
                  - <span>{{ item.album.name }}</span>
                </h5>
              </div>
            </li>
          </ul>
          <loading v-if="!searchResult[0].result.length"></loading>
        </scroll>

        <!--歌手-->
        <scroll class="result-list artists-result" v-if="id==100">
          <loading v-if="!searchResult[1].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[1].result" :key="item.id" class="result-list-item">
              <figure class="result-list-item-img" :style="`background-image:url(${item.img1v1Url})`">
                <!--<img :src="item.img1v1Url" alt="">-->
              </figure>
              <div class="result-list-item-con">
                <h4 class="overflow-ellipsis">{{ item.name }} <span v-for="i in  item.alia" :key="i">({{ i }})</span></h4>
              </div>
            </li>
          </ul>
        </scroll>

        <!--专辑-->
        <scroll class="result-list albums-result" v-if="id==10">
          <loading v-if="!searchResult[2].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[2].result" :key="item.id" class="result-list-item albums-result-list-item">
              <figure class="result-list-item-img" :style="`background-image:url(${item.blurPicUrl})`">
                <!--<img :src="item.blurPicUrl" alt="">-->
              </figure>
              <div class="result-list-item-con">
                <h4 class="overflow-ellipsis">{{ item.name }}</h4>
                <h5 class="overflow-ellipsis">{{ item.artist.name }}</h5>
              </div>
            </li>
          </ul>
        </scroll>

        <!--歌单-->
        <scroll class="result-list playlists-result" v-if="id==1000">
          <loading v-if="!searchResult[3].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[3].result" :key="item.id" class="result-list-item">
              <figure class="result-list-item-img" :style="`background-image:url(${item.coverImgUrl})`">
                <!--<img :src="item.coverImgUrl" alt="">-->
              </figure>
              <div class="result-list-item-con">
                <h4 class="overflow-ellipsis">{{ item.name }}</h4>
                <h5 class="overflow-ellipsis">{{ item.trackCount }}首音乐 by {{ item.creator.nickname }}，播放{{ item.playCount }}次</h5>
              </div>
            </li>
          </ul>
        </scroll>

        <!--用户-->
        <scroll class="result-list userprofiles-result" v-if="id==1002">
          <loading v-if="!searchResult[4].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[4].result" :key="item.id" class="result-list-item user-result-list-item">
              <figure class="result-list-item-img" :style="`background-image:url(${item.avatarUrl})`">
                <!--<img :src="item.avatarUrl" alt="">-->
              </figure>
              <div class="result-list-item-con">
                <h4 class="overflow-ellipsis">{{ item.nickname }}</h4>
                <h5 class="overflow-ellipsis">{{ item.signature }}</h5>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
  </div>
</template>

<script>
import Scroll from '@/components/base/Scroll/Scroll';
import Navigator from '@/components/base/Navigator/Navigator';
import Loading from '@/components/base/Loading/Loading';
import { mapState, mapActions } from 'vuex';
import { getSearchResult } from '@/api/search';

export default {
  name: 'HelloWorld',
  components: {
    Scroll,
    Navigator,
    Loading,
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
          // console.log(res);
          this.setSearchResultData(params);
        });
      }
    },
    // 向播放列表添加歌曲
    _insertSong(song) {
      // const song = this.searchResult[0].result[songIndex];
      // console.log(song);
      // if (song.copyrightId === 0) {
      //   alert('无版权！');
      //   return;
      // }
      this.insertSong(song);
    },
    loadmore() {
      console.log('加载更多');
    },
    ...mapActions([
      'setSearchResultData',
      'clearSearchResultData',
      'insertSong',
      'addSearchHistory',
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
    this.addSearchHistory(this.searchKeyWords);
  },
  beforeDestroy() {
    this.clearSearchResultData();
  },
  watch: {
    searchKeyWords(val) {
      if (val === '') {
        this.$router.push('/search');
      }
    },
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
  /*.result-list-item{
    margin-left: 10px;
    border-bottom: 1px solid #e2e3e5;
    padding: 10px 30px 10px 0;
    
  }*/
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
    color: #e2e3e5;
  }
  .item-name, .item-info{
    line-height: 1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  /*歌手*/
  .result-list-item{
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 6px;
    box-sizing: border-box;
    width: 100%;
  }
  .result-list-item .result-list-item-img{
    flex: 0 0 auto;
    position: relative;
    width: 54px;
    height: 54px;
    margin-right: 8px;
    line-height: 0;
    background-color: #e2e3e5;
    background-size: cover;
  }
  .result-list-item .result-list-item-img img{
    width: 100%;
  }
  .result-list-item .result-list-item-con{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    border-bottom: 1px solid #e2e3e5;
    overflow: hidden;
    padding-right: 30px;
  }
  .result-list-item .result-list-item-con span{
    color: #9c9d9f;
  }
  .result-list-item .result-list-item-con h4{
    font-size: 14px;
    font-weight: normal;
    color: #000;
    line-height: 1.5;
  }
  .result-list-item .result-list-item-con h5{
    font-size: 10px;
    font-weight: normal;
    color: #9c9d9f;
    line-height: 1.5;
  }

  /*专辑*/
  .albums-result-list-item .result-list-item-img{
    margin-right: 20px;
  }
  .albums-result-list-item .result-list-item-img::after{
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

  /*用户*/
  .user-result-list-item>figure{
    border-radius: 50%;
    overflow: hidden;
  }
</style>
