webpackJsonp([1],{"/67d":function(e,s){},"8stH":function(e,s,t){"use strict";s.b=function(e){var s=c.a.baseUrl+"/search/suggest?keywords="+e;return a.a.get(s)},s.a=function(e,s,t){var r=t||0,i=s||1,n=c.a.baseUrl+"/search?keywords="+e+"&offset="+20*r+"&type="+i+"&limit=20";return a.a.get(n)};var r=t("mtWM"),a=t.n(r),c=t("T452")},GU1e:function(e,s,t){"use strict";var r=t("Dd8w"),a=t.n(r),c=t("NYxO"),i={data:function(){return{keywords:""}},computed:a()({},Object(c.e)(["searchKeyWords"])),methods:a()({clearKeywords:function(){this.keywords=""},searchFocus:function(){this.$router.push("/search"),this.setSearchFocus(!0)},searchBlur:function(){this.setSearchFocus(!1)},searchEnter:function(){this.blur(),this.$router.push("/search/1")},blur:function(){this.$refs.searchinput.blur()},focus:function(){this.$refs.searchinput.focus()}},Object(c.d)({setSearchKeyWords:"SET_SEARCH_KEYWORDS",setSearchFocus:"SET_SEARCHING_FOCUS"}),Object(c.b)(["clearSearchResultData"])),created:function(){this.keywords=this.searchKeyWords},watch:{keywords:function(e){this.setSearchKeyWords(e.trim())},searchKeyWords:function(e){this.keywords=e,this.clearSearchResultData()}}},n={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"search-box"},[t("i",{staticClass:"iconfont icon-search"}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.keywords,expression:"keywords"}],ref:"searchinput",attrs:{type:"search",placeholder:"搜索音乐、歌手、歌词"},domProps:{value:e.keywords},on:{focus:e.searchFocus,click:e.searchFocus,blur:e.searchBlur,keyup:function(s){if(!("button"in s)&&e._k(s.keyCode,"enter",13,s.key))return null;e.searchEnter(s)},input:function(s){s.target.composing||(e.keywords=s.target.value)}}}),e._v(" "),""!==e.keywords?t("i",{staticClass:"iconfont icon-close",on:{click:e.clearKeywords}}):e._e()])},staticRenderFns:[]};var o={components:{SearchBox:t("VU/8")(i,n,!1,function(e){t("ZNRH")},"data-v-09cb7c87",null).exports,PlayerMini:t("yCrj").a},data:function(){return{}},computed:a()({},Object(c.e)(["searching","playing","playlist"])),methods:a()({cancleSearch:function(){this.setSearchKeyWords(""),this.$router.push("/")},focus:function(){this.$refs.searchboxref.focus()}},Object(c.d)({setSearchKeyWords:"SET_SEARCH_KEYWORDS"})),watch:{searching:function(e){e||this.$refs.searchboxref.blur()}}},l={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"header"},[t("search-box",{ref:"searchboxref",staticClass:"header-search"}),e._v(" "),t("transition",{attrs:{name:"sx"}},[e.searching||e.playlist.length?t("div",{staticClass:"search-right"}):e._e()]),e._v(" "),t("transition",{attrs:{name:"fade"}},[t("player-mini",{directives:[{name:"show",rawName:"v-show",value:!e.searching,expression:"!searching"}],staticClass:"player-mini",attrs:{playing:e.playing}})],1),e._v(" "),t("transition",{attrs:{name:"slide"}},[t("span",{directives:[{name:"show",rawName:"v-show",value:e.searching,expression:"searching"}],staticClass:"cancle-search",on:{click:e.cancleSearch}},[e._v("取消")])])],1)},staticRenderFns:[]};var h=t("VU/8")(o,l,!1,function(e){t("iK4X")},"data-v-c8b0f104",null);s.a=h.exports},N2Ln:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=t("Gu7T"),a=t.n(r),c=t("Dd8w"),i=t.n(c),n=t("5jRo"),o=t("6/vo"),l=t("GU1e"),h=t("8stH"),u=t("NYxO"),d={mixins:[n.a],components:{Scroll:o.a,Top:l.a},data:function(){return{}},computed:i()({searchHistoryReverse:function(){return[].concat(a()(this.searchHistory)).reverse()}},Object(u.e)(["searchKeyWords","searchSuggest","searchResult","searchFocus","searchHistory"])),methods:i()({_getSearchSuggest:function(e){var s=this;Object(h.b)(e).then(function(e){e.data.result&&s.setSearchSuggest(e.data.result)}).catch(function(e){console.log(e)})},toSearch:function(e){this.setSearchKeyWorde(e),this.$router.push("/search/1")}},Object(u.d)({setSearchSuggest:"SET_SEARCH_SUGGEST",setSearching:"SET_SEARCHING",setSearchKeyWorde:"SET_SEARCH_KEYWORDS"}),Object(u.b)(["deleteSearchHistory"])),created:function(){this.setSearching(!0)},beforeDestroy:function(){this.setSearching(!1)},mounted:function(){this.searchKeyWords||this.$refs.topRef.focus()},watch:{searchKeyWords:function(e){e?this._getSearchSuggest(e):this.setSearchSuggest("")}}},f={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"search"},[t("top",{ref:"topRef"}),e._v(" "),t("scroll",{staticClass:"search-hidtory-scroll"},[t("p",{staticClass:"search-label search-hidtory-label"},[e._v("搜索历史")]),e._v(" "),t("ul",e._l(e.searchHistoryReverse,function(s,r){return t("li",{key:"searchhistory"+r,staticClass:"search-suggest-item search-hidtory-item"},[t("i",{staticClass:"iconfont icon-time"}),e._v(" "),t("p",{staticClass:"overflow-ellipsis",on:{click:function(t){e.toSearch(s)}}},[e._v(e._s(s))]),e._v(" "),t("i",{staticClass:"iconfont icon-close2",on:{click:function(t){e.deleteSearchHistory(s)}}})])}))]),e._v(" "),e.searchKeyWords?t("scroll",{staticClass:"search-suggest-scroll"},[t("router-link",{attrs:{to:"/search/1"}},[e.searchKeyWords?t("div",{staticClass:"search-suggest-to-search"},[e._v("搜索："+e._s(e.searchKeyWords))]):e._e()]),e._v(" "),e.searchSuggest.songs?t("div",[t("p",{staticClass:"search-label search-suggest-label"},[e._v("单曲")]),e._v(" "),t("ul",e._l(e.searchSuggest.songs,function(s){return t("li",{key:s.id,staticClass:"search-suggest-item overflow-ellipsis",on:{click:function(t){e._insertSong(s)}}},[e._v(e._s(s.name)+" - "+e._s(s.album.name))])}))]):e._e(),e._v(" "),e.searchSuggest.albums?t("div",[t("p",{staticClass:"search-label search-suggest-label"},[e._v("专辑")]),e._v(" "),t("ul",e._l(e.searchSuggest.albums,function(s){return t("li",{key:s.id,staticClass:"search-suggest-item overflow-ellipsis"},[t("router-link",{attrs:{to:"/album/"+s.id}},[e._v(e._s(s.name)+" - "+e._s(s.artist.name))])],1)}))]):e._e(),e._v(" "),e.searchSuggest.playlists?t("div",[t("p",{staticClass:"search-label search-suggest-label"},[e._v("歌单")]),e._v(" "),t("ul",e._l(e.searchSuggest.playlists,function(s){return t("li",{key:s.id,staticClass:"search-suggest-item overflow-ellipsis"},[t("router-link",{attrs:{to:"/playlist/"+s.id}},[e._v(e._s(s.name))])],1)}))]):e._e()],1):e._e(),e._v(" "),t("router-view")],1)},staticRenderFns:[]};var v=t("VU/8")(d,f,!1,function(e){t("/67d")},"data-v-c6db071a",null);s.default=v.exports},ZNRH:function(e,s){},iK4X:function(e,s){}});