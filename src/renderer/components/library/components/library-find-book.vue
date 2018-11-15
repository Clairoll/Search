<template>
  <div class="library-index">
    <div>
      <div class="library-index-header">
        <div class="library-index-title">
          <h1 class="library-title-h1">图书书目查询</h1>
          <div class="library-title-input">
            <input class="title-input" type="text" v-model="textFind" placeholder="请输入图书名称"/>
            <span
              class="title-search"
              @click="showBottomBook(1)"
            >
              <img src="../../../assets/img/search.png"/>
            </span>
          </div>
        </div>
      </div>
      <div class="library-index-message">
        <div class="library-index-container">
          <div class="library-message-left">
            <div class="message-left-login">
              <router-link to="/login-library">
                <img src="../../../assets/img/not-login.png" class="message-left-img"/>
              </router-link>
              <div class="message-left-title">
                我的图书馆
              </div>
            </div>
            <router-link tag="div"
                         class="message-left-hot"
                         to="/library-hot-recommend/1"
                         active-class="active"
            >
              热门推荐
            </router-link>
            <router-link tag="div"
                         class="message-left-category"
                         to="/library-category-one/1/A"
                         active-class="active"
            >
              分类浏览
            </router-link>
          </div>
          <div class="library-message-right" v-if="!errorMsg&&bookArr.length>0">
              <ul class="library-message-ul" v-if="!errorMsg">
                <li
                  v-for="(item,index) of bookArr"
                  :key="index"
                  class="library-message-li"
                  @click="routerToContent(item.ssh)"
                >
                  <p class="library-item-tm">
                    <span class="library-item-tm-left">{{index+1}}.{{item.tm}}</span>
                    <span class="library-item-tm-right">{{item.dyzz}}</span>
                  </p>
                  <p class="library-item-cbsmc">
                    {{item.cbsmc}}&nbsp;&nbsp;&nbsp;{{item.cbrq}}
                  </p>

                </li>
              </ul>

            <ul class="library-message-ul-other" v-if="!errorMsg">
              <li
                class="library-message-previous li"
                @click="showPageArr('reduce')"
              >
                上一页
              </li>
              <li
                class="library-message-li-other"
                v-for="(item,index) of navigatepageNums"
                :key="index"
                :class="currentIndex===item?'on':''"
                @click="showPageArr(item)"
              >
                {{item}}
              </li>
              <li class="library-message-next" @click="showPageArr('add')">
                下一页
              </li>
            </ul>
          </div>
          <div class="library-message-error" v-if="errorMsg&&bookArr.length===0">
            {{errorMsg}}
          </div>
          <div class="library-message-right-loading" v-if="!errorMsg&&bookArr.length===0">
            <img src="../../../assets/img/index.gif"/>
          </div>
        </div>
        <div class="library-index-back" @click="back">
          返回
        </div>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    data(){
      return{
         tm:this.$route.query.tm,
         bookArr:[],
         textFind:'',
         page:this.$route.query.page,
         pages:0,
         navigatepageNums:[],
         errorMsg:'',
         currentIndex:1
      }
    },
    created(){

      this.bookArr=[];
      let _this=this;
      $.ajax({
        type: "GET",
        url:`${_this.GLOBAL.URL}/library/findBookByName/${this.tm}/${this.page}`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
           if(res.code===200){
               _this.bookArr=res.data.list;
               _this.pages=res.data.pages;
               _this.navigatepageNums=res.data.navigatepageNums;
           }else{
             _this.errorMsg=res.msg;
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
      routerToContent(ssh){
          this.$router.push(`/library-content?ssh=${ssh}`);
      },
      showBottomBook(page){
        if(this.textFind===''){
          return window.alert('书名不能为空!');
        }
        this.bookArr=[];
        let _this=this;
        this.page=page;
        this.tm=this.textFind;
        this.textFind='';
        this.currentIndex=page;
        $.ajax({
          type: "GET",
          url:`${_this.GLOBAL.URL}/library/findBookByName/${this.tm}/${this.page}`,
          dataType: "jsonp",
          async: true,
          jsonp: "callback",
          success: function(res) {
            if(res.code===200){
              _this.bookArr=res.data.list;
              _this.pages=res.data.pages;
              _this.navigatepageNums=res.data.navigatepageNums;
            }else{
              _this.errorMsg=res.msg;
            }

          },
          error: function() {
            console.log("获取失败");
          }
        });
      },
      showPageArr(page){
        let _this=this;
        if(page==='reduce'){
          this.page-=1;
          if(this.page<=1){
            this.page=1;
          }
        }else  if(page==='add'){
          this.page+=1;
          if(this.page>=this.pages){
            this.page=this.pages
          }
        }else{
          this.page=page;
        }
        this.currentIndex=this.page;
        this.bookArr=[];
        $.ajax({
          type: "GET",
          url:`${_this.GLOBAL.URL}/library/findBookByName/${this.tm}/${this.page}`,
          dataType: "jsonp",
          async: true,
          jsonp: "callback",
          success: function(res) {
            if(res.code===200){
              _this.bookArr=res.data.list;
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
  .library-index{
    width:100%;
    height:100%;
    position: absolute;
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
    display: inline-block;
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
    bottom:124px;
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
    flex: 1;
    width: 100%;
  }
  .library-message-error{
    width:100%;
    text-align: center;
    color: red;
    font-size: 20px;
    margin-top:100px;
  }
  .library-index-back{
    position: absolute;
    left:50px;
    bottom:52px;
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
  .library-message-ul{
    width: 100%;

  }
  .library-message-li{
    width: 100%;
    height:80px;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 1px 1px #ccc;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .library-item-tm{
    margin-left: 30px;
    line-height: 40px;

  }
  .library-item-tm-left{
    font-size: 16px;
    font-family: SIMHEI;
    color: #186d92;
  }
  .library-item-tm-right{
    color: #a1a19c;
    font-family: SIMHEI;
    font-size: 14px;
  }
  .library-item-cbsmc{
    margin-left: 45px;
    font-size: 12px;
    color: #a1a19c;
    font-family: SIMHEI;
  }


  .library-message-ul-other{
    position: absolute;
    left:50%;
    margin-left: -175px;
    margin-top: 30px;
    width: 330px;
    height:auto;
  }
  .library-message-li-other{
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

</style>
