<template>
  <div class="search-result-scroll">
      <div class="navigator-container" ref="viewport" v-if="searchKeyWords">
        <navigator :navList="searchResult" @change="change" :currentTabIndex="currentTabIndex">
          <span slot="item" slot-scope="props" class="tab-name" :class="{'link-active':isCurrent(props.index)}">{{props.text}}</span>
        </navigator>
      </div>
      <div class="tab-render-content" v-if="searchKeyWords">
        <!--单曲-->
        <scroll ref="scroll-1" :data="searchResult[0].result" class="result-list songs-result" v-if="id==1" :pullUpLoad="pullUpLoad" @pullingUp="loadmore">
          <ul>
            <li v-for="(item,index) in searchResult[0].result" class="result-list-item" >
              <song-cell :tit="item.name" :song="item">
                <div slot="sub-tit">
                  <span><span v-for="artist in item.artists" class="item-info-artist">{{ artist.name }}</span></span>
                  - <span>{{ item.album.name }}</span>
                </div>
              </song-cell>
            </li>
          </ul>
          <loading v-if="!searchResult[0].result.length"></loading>
        </scroll>

        <!--歌手-->
        <scroll ref="scroll-100" class="result-list artists-result" v-if="id==100" :pullUpLoad="pullUpLoad" @pullingUp="loadmore">
          <loading v-if="!searchResult[1].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[1].result">
              <router-link :to="`/singer/${item.id}`">
                <cell :iconUrl="item.img1v1Url">
                  <div slot="tit">{{ item.name }} <span v-for="i in  item.alia" :key="i">({{ i }})</span></div>
                </cell>
              </router-link> 
            </li>
          </ul>
        </scroll>

        <!--专辑-->
        <scroll ref="scroll-10" class="result-list albums-result" v-if="id==10" :pullUpLoad="pullUpLoad" @pullingUp="loadmore">
          <loading v-if="!searchResult[2].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[2].result">
              <router-link :to="`/album/${item.id}`">
                <cell :iconUrl="item.blurPicUrl" :tit="item.name" :sub-tit="item.artist.name" class="albums-cell"></cell>
              </router-link>
            </li>
          </ul>
        </scroll>

        <!--歌单-->
        <scroll ref="scroll-1000" class="result-list playlists-result" v-if="id==1000" :pullUpLoad="pullUpLoad" @pullingUp="loadmore">
          <loading v-if="!searchResult[3].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[3].result">
              <router-link :to="`/playlist/${item.id}`">
                <cell :iconUrl="item.coverImgUrl"
                      :tit="item.name"
                      :sub-tit="`${item.trackCount}首音乐 by ${item.creator.nickname}，播放${item.playCount}次`"
                      ></cell>
              </router-link>
            </li>
          </ul>
        </scroll>

        <!--用户-->
        <scroll ref="scroll-1002" class="result-list userprofiles-result" v-if="id==1002" :pullUpLoad="pullUpLoad" @pullingUp="loadmore">
          <loading v-if="!searchResult[4].result.length"></loading>
          <ul>
            <li v-for="item in searchResult[4].result">
              <router-link :to="`/user/${item.userId}`">
                <cell class="user-cell"
                      :iconUrl="item.avatarUrl"
                      :tit="item.nickname"
                      :sub-tit="item.signature"
                      ></cell>
              </router-link>
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
import Cell from '@/components/base/Cell/Cell';
import SongCell from '@/components/base/SongCell/SongCell';
import { mapState, mapActions } from 'vuex';
import { getSearchResult } from '@/api/search';

export default {
  // mixins: [songMixin],
  components: {
    Scroll,
    Navigator,
    Loading,
    Cell,
    SongCell,
  },
  data() {
    return {
      id: this.$route.params.id,
      // 当前默认tab
      currentTabIndex: 1,
      // 配置上拉加载，threshold为距底部多少是开始加载
      pullUpLoad: {
        threshold: 50,
      },
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
      return new Promise((resolve, reject) => {
        const keywords = this.searchKeyWords;
        const type = this.id;
        const nowItem = this.searchResult.find(item => (item.id === parseInt(this.id, 10)));
        if (nowItem) {
          let page = nowItem.page;
          getSearchResult(keywords, type, page).then((res) => {
            page++;
            const params = {
              id: this.id,
              page,
              data: res.data.result[nowItem.key],
            };
            console.log(res);
            resolve(params);
          }).catch((err) => {
            reject(err);
          });
        }
      });
    },
    initSearchResult() {
      const nowItem = this.searchResult.find((item) => {
        return item.id === parseInt(this.id, 10);
      });
      if (!nowItem.result.length) {
        this._getSearchResult().then((res) => {
          this.addSearchResultData(res);
        });
      }
    },
    // 加载更多
    loadmore() {
      // 单曲
      // const id = Number(this.id);
      // console.log(id);
      // if (id === 1) {
      this._getSearchResult().then((res) => {
        this.addSearchResultData(res);
      }).catch(() => {
        this.$refs[`scroll-${this.id}`].forceUpdate();
      });
      // }
    },
    ...mapActions([
      'setSearchResultData',
      'addSearchResultData',
      'clearSearchResultData',
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
    if (this.searchKeyWords) {
      this.initSearchResult();
      this.addSearchHistory(this.searchKeyWords);
    }
  },
  beforeDestroy() {
    // this.clearSearchResultData();
  },
  watch: {
    searchKeyWords(val) {
      if (val === '') {
        this.$router.push('/search');
      }
    },
    $route(val) {
      this.id = val.params.id;
      this.initSearchResult();
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

</style>
