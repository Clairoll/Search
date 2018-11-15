<template>
    <div class="library-hot">
      <ul class="library-hot-ul" v-if="hotArr.length>0">
        <li class="library-hot-li">
          <span class="library-li-span"></span>
          <span class="library-li-title">统计范围:3个月</span>
        </li>
        <li class="library-hot-li">
          <span class="library-li-span"></span>
          <span class="library-li-title">统计方式:借阅次数</span>
        </li>
        <li class="library-hot-li">
          <span class="library-li-span"></span>
          <span class="library-li-title">分类:总体排行</span>
        </li>
      </ul>
      <div class="library-message-loading" v-if="hotArr.length===0">
        <img src="../../../assets/img/index.gif"/>
      </div>
      <div class="library-message" v-if="hotArr.length>0">
        <table class="library-message-table">
          <tr class="library-message-tr-small" >
            <th class="library-message-th">题名</th>
            <th class="library-message-th">责任者</th>
            <th class="library-message-th">出版信息</th>
            <th class="library-message-th">索书号</th>
            <th class="library-message-th">借阅次数</th>
          </tr>
          <tr
            v-for="(item,index) of hotArr"
            :key="index"
            class="library-message-tr-big"
            @click="routerToContent(item.ssh)"
          >
            <td class="library-message-td">{{item.tm}}</td>
            <td class="library-message-td">{{item.dyzz}}</td>
            <td class="library-message-td">{{item.cbsmc}}</td>
            <td class="library-message-td">{{item.ssh}}</td>
            <td class="library-message-td">{{item.yjcs}}</td>
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
              :class="currentIndex===item?'active':''"
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
</template>
<script>

  export default {
    data(){
      return{
         hotArr:[],
         navigatepageNums:[],
         page:this.$route.params.page,
         pages:0,
         currentIndex:1
      }
    },
    created(){
      this.hotArr=[];
      let _this=this;
      $.ajax({
        type: "GET",
        url:`${_this.GLOBAL.URL}/library/topRanking/${this.page}`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          if(res.code===200){
            _this.hotArr=res.data.list;
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
      showPageArr(page){
        this.hotArr=[];
        let _this=this;
          if(page==='reduce'){
            this.page-=1;
            if(this.page<=1){
              this.page=1;
            }
          }else  if(page==='add'){
            this.page+=1;
            if(this.page>=this.pages){
              this.page=this.pages;
            }
          }else{
            this.page=page;
          }
        this.currentIndex=this.page;

        $.ajax({
          type: "GET",
          url:`${_this.GLOBAL.URL}/library/topRanking/${this.page}`,
          dataType: "jsonp",
          async: true,
          jsonp: "callback",
          success: function(res) {
            if(res.code===200){
              _this.hotArr=res.data.list;
              _this.pages=res.data.pages;
              _this.navigatepageNums=res.data.navigatepageNums;
            }

          },
          error: function() {
            console.log("获取失败");
          }
        });
      },
      routerToContent(ssh){
        this.$router.push(`/library-content?ssh=${ssh}`);
      }
    }
  }

</script>
<style scoped>
  .library-hot{
    height:auto;
    margin-top:21px;
    position: relative;
  }
  .library-hot-ul{
    margin-left:30px;
    z-index: 99;
    background: #fff;
  }
  .library-hot-li{
    margin-bottom:14px;
  }
  .library-li-span{
    border-left:5px solid #186d92;
  }
  .library-li-title{
    margin-left:6px;
    font-family: SIMHEI;
    color:#a1a19c;
  }
  .library-message-loading{
    position: absolute;
    left:50%;
    top:50%;
    width:800px;
    height:600px;
    margin-left: -400px;
    margin-top: 40px;
  }

  .library-message{
    margin-top:36px;
    width:100%;
    height: auto;
  }

  .library-message-table{
    width:100%;
    height: auto;
    display: inline-block;
    border-top:1px solid #ccc;
    box-shadow: 0 -1px 2px #ccc;
  }
  .library-message-table tr{
    display: inline-block;
    width:100%;
  }
  .library-message-tr-small{
    width: 100%;
    border-bottom:1px solid #ccc;
    box-shadow: 0 1px 2px #ccc;
    height:33px;
    line-height: 33px;
    z-index: 99;
    background: #fff;
  }
  .library-message-th{
    display: inline-block;
    font-size: 25px;
    width:18%;
    height:60px;
    text-align: center;
    font-family: SIMHEI;
    color:#186d92;
  }
  .library-message-tr-big{
    width:100%;
    height:65px;
    line-height: 65px;
    border-bottom:1px solid #ccc;
    box-shadow: 0 1px 2px #ccc;
  }
  .library-message-td{
    font-family: SIMHEI;
    color:#000 ;
    display: inline-block;
    width: 18%;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    color: #000;
  }
  .active{
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

</style>
