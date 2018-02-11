<template>
  <div class="user">
    <my-header class="user-header"></my-header>
    <!-- 模糊背景 -->
    <div ref="bgImageRef" class="user-bg" v-lazy:background-image="user ? user.profile.backgroundUrl : ''"></div>
    <div class="user-con">
      <scroll class="user-scroll">
        <div class="user-info">
          <img class="user-avatar" v-lazy="user ? user.profile.avatarUrl : ''" alt="">
          <h2 class="user-nickname">{{ user ? user.profile.nickname : '' }} <i class="iconfont" :class="user ? genderClass(user.profile.gender) : ''"></i> </h2>
          <h3 class="user-follow">关注 {{ user ? user.profile.follows : '' }}　|　粉丝 {{ user ? user.profile.followeds : '' }}</h3>
        </div>
        <div class="navigator-container" ref="viewport">
          <navigator :navList="tabs" @change="change" :currentTabIndex="currentTabIndex"></navigator>
        </div>
        <div class="tab-container">
          <!-- 歌单 -->
          <div v-show="currentTabIndex === 0">
            <p class="list-label">歌单</p>
            <ul v-if="userPlaylist.length">
              <li v-for="item in userPlaylist" v-if="item.userId === user.profile.userId">
                <router-link :to="`/playlist/${item.id}`">
                  <cell :iconUrl="item.coverImgUrl"
                        :tit="item.name"
                        :sub-tit="`${item.trackCount}首音乐 by ${item.creator.nickname}，播放${item.playCount}次`"
                        ></cell>
                </router-link>
              </li>
            </ul>
            <p class="list-label">收藏的歌单</p>
            <ul v-if="userPlaylist.length">
              <li v-for="item in userPlaylist" v-if="item.userId !== user.profile.userId">
                <router-link :to="`/playlist/${item.id}`">
                  <cell :iconUrl="item.coverImgUrl"
                        :tit="item.name"
                        :sub-tit="`${item.trackCount}首音乐 by ${item.creator.nickname}，播放${item.playCount}次`"
                        ></cell>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 动态 -->
          <div v-show="currentTabIndex === 1">
            动态
          </div>
          <!-- 关于 -->
          <div v-show="currentTabIndex === 2">
            <div class="user-info-item">
              <h3>个人信息</h3>
              <p>等级：{{ user.level }}</p>
              <p>性别：{{ user.profile.gender === 1 ? '男' : '女'}}</p>
              <p></p>
            </div>
            <div class="user-info-item">
              <h3>个人简介</h3>
              <p v-if="user.profile.signature">{{ user.profile.signature }}</p>
              <p v-else>暂无简介</p>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/base/Header/Header';
import Navigator from '@/components/base/Navigator/Navigator';
import Scroll from '@/components/base/Scroll/Scroll';
import Cell from '@/components/base/Cell/Cell';
import { getUserDetail, getUserPlaylist } from '@/api/user';

export default {
  name: 'User',
  components: {
    myHeader,
    Navigator,
    Scroll,
    Cell,
  },
  data() {
    return {
      userid: this.$route.params.id,
      user: null,
      userPlaylist: [],
      // tab标签
      tabs: [
        {
          id: 0,
          name: '音乐',
        },
        // {
        //   id: 1,
        //   name: '动态',
        // },
        {
          id: 2,
          name: '关于TA',
        },
      ],
      // 当前标签索引
      currentTabIndex: 0,
    };
  },
  methods: {
    // 初始化用户页
    _initUser() {
      this._getUserDetail();
      this._getUserPlaylist();
    },
    // 获取用户详情
    _getUserDetail() {
      getUserDetail(this.userid)
        .then((res) => {
          // console.log(res.data);
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取用户歌单
    _getUserPlaylist() {
      getUserPlaylist(this.userid)
        .then((res) => {
          this.userPlaylist = res.data.playlist;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // tab切换
    change(item) {
      if (item !== undefined) {
        this.currentTabIndex = item.id;
        // this.$router.replace(`/search/${item.id}`);
      }
    },
    genderClass(val) {
      let cls = '';
      if (val) {
        cls = val === 1 ? 'icon-nan' : 'icon-nv';
      }
      return cls;
    },
  },
  created() {
    this._initUser();
  },
  mounted() {

  },
};
</script>

<style scoped>
  .header.user-header {
    background-color: transparent;
    background: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(rgba(0, 0, 0, 0.2)),
      to(rgba(0, 0, 0, 0))
    );
  }
  .user {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .user-bg {
    height: 50%;
    background-color: #323232;
    background-size: cover;
    background-position: center;
    /* filter: blur(20px) brightness(80%); */
    /* transform: scale(1.2); */
  }
  .user-con{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .user-info{
    text-align: center;
    padding-bottom: 20px;
  }
  .user-avatar{
    width: 100px;
    border-radius: 50%;
  }
  .user-nickname{
    font-size: 16px;
    line-height: 2;
    color: #fff;
  }
  .user-nickname .icon-font{
    font-size: 14px;
  }
  .user-nickname .icon-nan{
    color: rgb(97, 218, 255);
  }
  .user-nickname .icon-nv{
    color: rgb(255, 147, 174);
  }
  .user-follow{
    font-size: 14px;
    color: rgba(255, 255, 255, 0.733);
    line-height: 1;
    font-weight: normal;
  }
  .tab-container{
    min-height: 50vh;
    background-color: #fff;
  }

  .list-label{
    font-size: 12px;
    background: #f5f5f5;
    line-height: 2;
    padding-left: .5em;
    color: #7e7e7e;
  }
  .user-info-item{
    overflow: hidden;
  }
  .user-info-item>h3{
    font-size: 14px;
    color: #000;
    padding-left: 10px;
    border-left: 2px solid #d63c34;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-info-item>p{
    font-size: 12px;
    color:#9c9d9f;
    line-height: 1.5;
    padding: 0.1em 1em;
  }
</style>
