<template>
  <div class="library-index">
    <div>
      <div class="library-index-header">
        <div class="library-index-title">
          <h1 class="library-title-h1">图书书目查询</h1>
          <div class="library-title-input">
            <input class="title-input" type="text" v-model="textContent"  placeholder="请输入图书名称"/>
            <span
              class="title-search"

              @click="clearText"
            >
               <img src="../../../assets/img/search.png"/>
            </span>
          </div>
        </div>
      </div>
      <div class="library-index-message" >
        <div class="library-index-container">
          <div class="library-message-left">
            <div class="message-left-login">
              <router-link to="/login-library">
                <img src="../../../assets/img/not-login.jpg" class="message-left-img"/>
              </router-link>
              <div class="message-left-title">
                我的图书馆
              </div>
            </div>
            <router-link tag="div"
                         class="message-left-hot"
                         to="/library-hot-recommend/1"
            >
              热门推荐
            </router-link>
            <router-link tag="div"
                         class="message-left-category"
                         to="/library-category-one/1/A"
            >
              分类浏览
            </router-link>
          </div>
          <div class="library-message-right" ref="messageScroll" v-if="bookIntroductions!==''">
            <div class="library-right-scroll">
              <div class="message-right-header">
                <div class="message-introduction">
                  <div class="book-message">
                    <span class="book-slice"></span>
                    <span class="book-font">书目信息</span>
                  </div>
                  <div class="book-author book">
                    题名/作者:{{bookContents.tm}}、{{bookContents.dyzz}}
                  </div>
                  <div class="book-date book">
                    出版日期：{{bookContents.cbrq}}
                  </div>
                  <div class="book-city book">
                    出版发行项:{{bookContents.cbsmc}}
                  </div>
                  <div class="book-isbn book">
                    ISBN:{{bookContents.isbn}}
                  </div>
                  <div class="book-category book">
                    中图法分类号:{{bookContents.flh}}
                  </div>
                </div>
                <div class="message-img">
                  <img  class="img" src="../../../assets/img/index.jpg" alt=""/>
                </div>
              </div>
              <div class="message-right-introduction" v-if="bookIntroductions.summary">
                <span class="message-douban">豆瓣简介:</span>
                <span class="message-info">
                  {{computeBook(bookIntroductions.summary)}}
                </span>
                <button type="submit" class="message-read-all" @click="showAll(true)">阅读全文</button>
              </div>
              <div class="message-right-count">
                <div class="message-way">
                  <span class="message-splice"></span>
                  <span class="message-status">统计方式:借阅次数</span>
                </div>
                <table class="message-right-table">
                  <tr class="message-right-tr-small">
                    <th class="message-right-th">索书号</th>
                    <th class="message-right-th">条形码</th>
                    <th class="message-right-th">馆藏地</th>
                    <th class="message-right-th">文献类型</th>
                    <th class="message-right-th">应还日期</th>
                  </tr>
                  <tr class="message-right-tr-big"
                      v-for="(item,index) of bookBorrows"
                      :key="index"
                  >
                    <td class="message-right-td">{{item.ssh}}</td>
                    <td class="message-right-td">{{item.tstxm}}</td>
                    <td class="message-right-td">{{item.gcdmc}}</td>
                    <td class="message-right-td">{{item.wxlx}}</td>
                    <td class="message-right-td">
                      {{item.tsztdm==42?'不可以借出':item.userInfo==null?'可以借出':item.userInfo.yhrq}}
                    </td>
                  </tr>
                </table>

                <ul class="library-message-ul">
                  <li
                    class="library-message-previous li"
                    @click="showPageArr('reduce')"
                  >
                    上一页
                  </li>
                  <li
                    class="library-message-li li"
                    v-for="(item,index) of navigatepageNums"
                    :key="index"
                    :class="currentIndex===item?'on':''"
                    @click="showPageArr(item)"
                  >
                    {{item}}
                  </li>
                  <li class="library-message-next li" @click="showPageArr('add')">
                    下一页
                  </li>
                </ul>
              </div>
            </div>

            </div>
          <div class="library-message-right-loading" v-if="bookIntroductions===''">
            <img src="../../../assets/img/index.gif"/>
          </div>
          </div>
        </div>
      <transition name="show">
        <div class="mask" v-if="show==true" @click="showAll(false)"></div>

      </transition>
      <transition name="show">
        <div class="showIntroduction" v-if="show==true">
          <div class="introduction" ref="introductionScroll">
            <div>
              {{computeBook(bookIntroductions.summary)}}
            </div>
          </div>
          <div class="close" @click="showAll(false)">
            ×
          </div>
        </div>
      </transition>



      <div class="library-index-back" @click="back">
          返回
        </div>
      </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        ssh:this.$route.query.ssh,
        bookContents:{},
        bookIntroductions:{},
        bookBorrows:[],
        textContent:'',
        show:false,
        pages:0,
        navigatepageNums:[],
        page:1,
        currentIndex:1
      }
    },
    computed:{
      computeBook(){
        return function (text) {
            let bookIntroduction=text.replace(/(\s+)?<br(\s+)?\/?>(\s+)?/gi,'\t\n');
            return bookIntroduction;
        }
      }
    },
    created(){
      let _this=this;
      $.ajax({
        type: "POST",
        url:`${_this.GLOBAL.URL}/library/findBookBySSH?SSH=${this.ssh}`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          if(res.code===200){
             _this.bookContents=res.data[0];
             let isbn=_this.bookContents.isbn;
             $.ajax({
               type: "GET",
               url:`${_this.GLOBAL.URL}/library/introduce/${isbn}`,
               dataType: "jsonp",
               async: true,
               jsonp: "callback",
               success: function(res) {
                _this.bookIntroductions=res;

               },
               error: function() {
                 console.log("获取失败");
               }
             });
           }

        },
        error: function() {
          console.log("获取失败");
        }
      });
      $.ajax({
        type: "GET",
        url:`${_this.GLOBAL.URL}/library/findBookStatus/${this.page}?SSH=${this.ssh}`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          if(res.code===200){
            _this.bookBorrows=res.data.list;
            _this.pages=res.data.pages;
            _this.navigatepageNums=res.data.navigatepageNums;
          }

        },
        error: function() {
          console.log("获取失败");
        }
      });
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      showAll(type){
        if(type==true){
          this.show=true;

        }else{
          this.show=false;
        }
      },
      clearText(){
        if(this.textContent===''){
          return window.alert('书名不能为空！');
        }else{
          this.$router.push(`/library-find-book?page=1&tm=${this.textContent}`);
          this.textContent='';
        }


      },
      showPageArr(page){
        if(page==='reduce'){
          this.page-=1;
          if(this.page<=1){
            this.page=1;
          }
        }
        else  if(page==='add'){
          this.page+=1;
          if(this.page>=this.pages){
            this.page=this.pages
          }
        }else{
          this.page=page;
        }
        this.currentIndex=this.page;
        let _this=this;
        $.ajax({
          type: "GET",
          url:`${_this.GLOBAL.URL}/library/findBookStatus/${this.page}?SSH=${this.ssh}`,
          dataType: "jsonp",
          async: true,
          jsonp: "callback",
          success: function(res) {
            if(res.code===200){
              _this.bookBorrows=res.data.list;
              _this.pages=res.data.pages;
              _this.navigatepageNums=res.data.navigatepageNums;
            }
          },
          error: function() {
            console.log("获取失败");
          }
        });
      }
    }
  }
</script>
<style  scoped>
  .show-enter-active,.show-leave-active{
    transition: all 0.5s ease;
  }
 .show-enter,.show-leave-active{
   opacity: 0

 }
  .library-index{
    width:100%;
    height:100%;
    position: absolute;
    z-index: 120;
  }
  .library-index-header{
    width:100%;
    height:160px;
    background :#135677;
  }
  .library-index-title{
    margin-left:50px;
    height:60px;
    margin-right:46px;
    padding-top:8px;
  }
  .library-title-h1{
    font-size: 50px;
    font-family: JLH;
    color: #fff;
    float: left;
  }
  .library-title-input{
    float: right;
    margin-bottom: 8px;


  }
  .title-input{
    width:400px;
    height:45px;
    border-radius: 10px;
    padding-left: 15px;
  }
  .title-search{
    margin-left:8px;
    cursor: pointer;
  }
  .library-index-message{
    height:auto;
  }
  .library-index-container{
    position: absolute;
    left:52px;
    background: #fff;
    top:60px;
    right:46px;
    bottom:82px;
    display: flex;
    box-shadow:-1px -1px 25px #555;

  }
  .library-message-left{
    width:130px;
    height:auto;
    border-right:2px solid #ccc;
    box-shadow: 1px 0 2px #ccc;
  }
  .message-left-img{
    margin-left:25px;
    margin-right:29px;
    margin-top:4px;
  }
  .message-left-title{
    text-align: center;
    font-family:SIMHEI;
    color:#a1a19c;
    font-size: 16px;
    margin-top:3px;
  }
  .message-left-hot{
    margin-top:31px;
    margin-left:17px;
    color:#186d92;
    font-family: SIMHEI;
    font-size: 25px;

  }
  .message-left-category{
    margin-top:30px;
    margin-left:17px;
    font-family: SIMHEI;
    color:#186d92;
    font-size: 25px;

  }
  .library-message-right{
    padding-left: 20px;
    padding-right: 10px;
    flex: 1;
    position: absolute;
    left:127px;
    top:10px;
    right:5px;
    bottom: 0;
    overflow: hidden;
  }
  .library-message-right-loading{
    position: absolute;
    left:127px;
    top:10px;
    right:0;
    bottom: 0;
  }
  .library-index-back{
    position: absolute;
    left:50px;
    bottom:10px;
    right:46px;
    font-family: SIMHEI;
    height:72px;
    text-align: center;
    line-height: 72px;
    font-size: 50px;
    color: #fff;
    background: #186d92;

  }
  .active{
    width:118px;
    height: 30px;
    line-height: 30px;
    background: #fff;
    box-shadow: -3px -2px 2px 2px #ccc;
  }

  .message-right-header{
    width:100%;
    height:auto;
  }
  .message-introduction{
    float: left;
  }
  .message-img{
    float: right;
    width:140px;
    height:185px;
  }
  .img{
    width: 100%;
    height:100%;
  }
  .book-slice{
    border-left: 5px solid #135677;
  }
  .book-font{
    margin-left:6px;
    color: #a1a19c;
    font-family: SIMHEI;
    font-size: 16px;
  }
  .book{
    margin-top:15px;
    color: #a1a19c;
    font-family: SIMHEI;
    font-size: 16px;
  }
  .book-author{
    line-height: 20px;
  }
  .message-right-introduction{
    clear: both;
    color: #a1a19c;
    font-family: SIMHEI;
    font-size: 16px;
  }
  .message-right-count{
    clear: both;
    padding-top:12px;
    color: #a1a19c;
    font-family: SIMHEI;
    font-size: 16px;
  }
  .message-info{
    line-height: 27px;
    display: -webkit-box;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-line-clamp: 3;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: 4px;
  }
  .message-read-all{
    display: inline-block;
    width:80px;
    height:30px;
    text-align: center;
    line-height:30px;
    color: #fff;
    background: #135677;
    border-radius: 5px;
    font-size: 14px;
    margin-top:10px;
  }
  .message-splice{
    border-left:5px solid #135677;
  }
  .message-status{
    margin-left:6px;
  }
  .message-right-table{
    margin-top:22px;
    width:100%;
    display: inline-block;
    border:1px solid #ccc;
    box-shadow: 1px 1px 1px #ccc;
  }
  .message-right-tr-small{
    display: inline-block;
    width:100%;
    height:40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 1px 1px #ccc;
  }
  .message-right-th{
    display: inline-block;
    width:18%;
    text-align: center;
  }
  .message-right-tr-big{
    display: inline-block;
    width:100%;
    height:40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 1px 1px #ccc;
  }
  .message-right-td{
    display: inline-block;
    width:18%;
    text-align: center;
  }
  .message-introduction{
    float: left;
    width: 70%;
  }
  .library-message-ul{
    position: absolute;
    left:50%;
    margin-left: -175px;
    margin-top: 30px;
    width: 330px;
    height:auto;
  }
  .library-message-li{
    width: 30px;
    height:30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
    float: left;
  }
  .on{
    color: red;
  }
  .library-message-previous,.library-message-next{
    float: left;
    width:80px;
    height:30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
  }
  .li:hover{
    cursor: pointer;
  }
  .show{
    color: red;
  }
  .mask{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background: #000;
    opacity: 0.6;
    z-index: 99;
  }
  .showIntroduction{
    width:80%;
    height:80%;
    margin-left: -40%;
    margin-top:-36%;
    position: absolute;
    left:50%;
    top:50%;
    right:0;
    bottom: 0;
    background:#fff;
    border-radius: 10px;
    z-index: 110;
    opacity: 0.8;
  }
  .introduction{
    position: absolute;
    left:20px;
    top:20px;
    right:20px;
    bottom: 20px;
    overflow: hidden;
    line-height: 27px;
    text-indent: 30px;
  }
  .close{
    width:40px;
    height:40px;
    border-radius: 50%;
    background: #fff;
    opacity: 0.6;
    text-align: center;
    line-height: 40px;
    font-size: 36px;
    position: absolute;
    margin-left: -20px;
    bottom: -60px;
    left:50%;
  }
  .show-enter-active, .show-leave-active {
    transition: opacity .5s
  }
  .show-enter, .show-leave-active {
    opacity: 0
  }


</style>

