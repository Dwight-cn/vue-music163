<!--头部组件-->
<template>
  <div class="search">
    <!--搜索历史-->
    <scroll class="search-hidtory-scroll">
      <p class="search-label search-hidtory-label">搜索历史</p>
      <ul>
        <li v-for="(item, index) in searchHistory" :key="`searchhistory${index}`" class="search-suggest-item search-hidtory-item">
          <i class="iconfont icon-time"></i>
          <p class="overflow-ellipsis" @click="toSearch(item)">{{ item }}</p>
          <i class="iconfont icon-close2" @click="deleteSearchHistory(item)"></i>
        </li>
      </ul>
    </scroll>

    <!--搜索建议-->
    <scroll class="search-suggest-scroll" v-if="searchKeyWords">
      <router-link to="/search/1">
        <div v-if="searchKeyWords" class="search-suggest-to-search">搜索：{{ searchKeyWords }}</div>
      </router-link>
      <!--单曲-->
      <div v-if="searchSuggest.songs">
        <p class="search-label search-suggest-label">单曲</p>
        <ul>
          <li v-for="item in searchSuggest.songs" :key="item.id" class="search-suggest-item overflow-ellipsis" @click="_insertSong(item)">{{ item.name }} - {{ item.album.name }}</li>
        </ul>
      </div>

      <!--专辑-->
      <div v-if="searchSuggest.albums">
        <p class="search-label search-suggest-label">专辑</p>
        <ul>
            <li v-for="item in searchSuggest.albums" :key="item.id" class="search-suggest-item overflow-ellipsis">{{ item.name }} - {{ item.artist.name }}</li>
        </ul>
      </div>

      <!--歌单-->
      <div v-if="searchSuggest.playlists">
        <p class="search-label search-suggest-label">歌单</p>
        <ul>
            <li v-for="item in searchSuggest.playlists" :key="item.id" class="search-suggest-item overflow-ellipsis">{{ item.name }}</li>
        </ul>
      </div>
    </scroll>

    <!-- 搜索结果 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from '@/components/base/Scroll/Scroll';
import { getSearchSuggest } from '@/api/search';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    Scroll,
  },
  data() {
    return {

    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'searchKeyWords',
      'searchSuggest',
      'searchResult',
      'searchFocus',
      'searchHistory',
    ]),
  },
  methods: {
    // 获取搜索建议
    _getSearchSuggest(val) {
      getSearchSuggest(val).then((res) => {
        if (res.data.result) {
          this.setSearchSuggest(res.data.result);
        }
        // console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    // 点击搜索历史
    toSearch(keywords) {
      this.setSearchKeyWorde(keywords);
      this.$router.push('/search/1');
    },
    // 向播放列表添加歌曲
    _insertSong(song) {
      // console.log(song);
      this.insertSong(song);
    },
    ...mapMutations({
      setSearchSuggest: 'SET_SEARCH_SUGGEST',
      setSearching: 'SET_SEARCHING',
      setSearchKeyWorde: 'SET_SEARCH_KEYWORDS',
    }),
    ...mapActions([
      'deleteSearchHistory',
      'insertSong',
    ]),
  },
  created() {
    this.setSearching(true);
  },
  beforeDestroy() {
    this.setSearching(false);
    this.setSearchKeyWorde('');
  },
  mounted() {

  },
  watch: {
    searchKeyWords: function searchKeyWords(val) {
      if (val) {
        this._getSearchSuggest(val);
      } else {
        this.setSearchSuggest('');
      }
    },
  },
};
</script>

<style scoped>
  .search{
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
  }
  .search-label{
    font-size: 12px;
    background: #f5f5f5;
    line-height: 2;
    padding-left: .5em;
  }

  /*搜索历史*/
  .search-hidtory-scroll{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 1;
  }

  /*搜索建议*/
  .search-suggest-scroll{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #fff;
  }

  .search-suggest-item{
    display: flex;
    align-items: center;
    height: 42px;
    margin-left: 6px;
    box-sizing: border-box;
    border-bottom: 1px solid #e2e3e5;
    color: #000;
  }
  .search-suggest-item:last-child{
    border: none;
  }
  .search-suggest-to-search{
    font-size: 14px;
    line-height: 3;
    border-bottom: 1px solid #e2e3e5;
    margin-left: 0.5em;
    color: #547fb2;
  }
  
  /*搜索历史*/
  .search-hidtory-item>p{
    flex: 1 1 auto;
    padding: 0 6px;
    line-height: 1;
  }
  .search-hidtory-item .iconfont{
    flex: 0 0 auto;
    color: #9c9d9f;
  }
  .search-hidtory-item .icon-close2{
    padding: 0 10px;
  }
</style>
