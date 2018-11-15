<template>
  <div class="library-category">
    <div>
      <div class="library-message-right">
            <div class="category-view">
              <div class="category-view-left">
                <div class="category-view-title">
                  <span class="title-span"></span>
                  <span class="title-info">图书分类</span>
                </div>
                <ul class="category-view-ul">
                  <li
                    class="category-view-li"
                    v-for="(value,key) of categories"
                    :key="key"
                    :class="showRight===key?'show':''"
                    @click="showRightList(key,1)"
                  >
                    {{key}}.{{value.title}}
                  </li>
                </ul>
              </div>
              <div class="category-view-right" v-if="categoryBooks.length>0">
                <table class="category-view-table">
                  <tr class="category-view-tr-small">
                    <th class="category-view-th">题名</th>
                    <th class="category-view-th">责任者</th>
                    <th class="category-view-th">出版信息</th>
                    <th class="category-view-th">索书号</th>
                    <th class="category-view-th">借阅次数</th>
                  </tr>
                  <tr
                      class="category-view-tr-big"
                      v-for="(item,index) of categoryBooks"
                      :key="index"
                      @click="routerToContent(item.ssh)"
                  >
                    <td class="category-view-td">{{item.tm}}</td>
                    <td class="category-view-td">{{item.dyzz}}</td>
                    <td class="category-view-td">{{item.cbsmc}}</td>
                    <td class="category-view-td">{{item.ssh}}</td>
                    <td class="category-view-td">{{item.yjcs}}</td>
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
              <div class="category-view-right-loading" v-if="categoryBooks.length===0">
                <img src="../../../assets/img/index.gif"/>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
  let data={
        "A":{
          "title":"马克思主义、毛泽东思想、邓小平理论"
        },
        "B":{
          "title":"哲学、宗教"
        },
        "C":{
          "title":"社会科学总论"
        },
        "D":{
          "title":"政治、法律"
        },
        "E":{
          "title":"军事"
        },
        "F":{
          "title":"经济"
        },
        "G":{
          "title":"文化、科学、教育、体育"
        },
        "H":{
          "title":"语言、文学"
        },
        "I":{
          "title":"文学"
        },
        "J":{
          "title":"艺术"
        },
        "K":{
          "title":"历史、地理"
        },
        "N":{
          "title":"自然科学总论"
        },
        "O":{
          "title":"数理科学与化学"
        },
        "P":{
          "title":"天文学、地球科学"
        },
        "Q":{
          "title":"生物科学"
        },
        "R":{
          "title":"医药、卫生"
        },
        "S":{
          "title":"农业科学"
        },
        "T":{
          "title":"工业技术"
        },
        "U":{
          "title":"交通运输"
        },
        "V":{
          "title":"航空、航天"
        },
        "X":{
          "title":"环境科学、安全科学"
        },
        "Z":{
          "title":"综合性图书"
        }
  };

  export default {
    data(){
      return{
        categories:{},
        categoryBooks:[],
        flh:this.$route.params.flh,
        text:'',
        navigatepageNums:[],
        page:parseInt(this.$route.params.page),
        pages:0,
        currentIndex:1,
        showRight:'A'
      }
    },
    created(){
      this.categories=data;
      let _this=this;
      $.ajax({
        type: "GET",
        url:`${_this.GLOBAL.URL}/library/categoryRanking/${this.flh}/${this.page}`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          if(res.code===200){
            _this.categoryBooks=res.data.list;
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
      routerToContent(ssh){
        this.$router.push(`/library-content?ssh=${ssh}`)
      },
      showRightList(flh,page){
        this.categoryBooks=[];
        let _this=this;
        this.showRight=flh;
        this.page=page;
        this.flh=flh;
        $.ajax({
          type: "GET",
          url:`${_this.GLOBAL.URL}/library/categoryRanking/${this.flh}/${this.page}`,
          dataType: "jsonp",
          async: true,
          jsonp: "callback",
          success: function(res) {
            if(res.code===200){
              _this.categoryBooks=res.data.list;
              _this.pages=res.data.pages;
              _this.navigatepageNums=res.data.navigatepageNums;
            }
          },
          error: function() {
            console.log("获取失败");
          }
        });
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
          this.categoryBooks=[];
          let _this=this;
          $.ajax({
            type: "GET",
            url:`${_this.GLOBAL.URL}/library/categoryRanking/${this.flh}/${this.page}`,
            dataType: "jsonp",
            async: true,
            jsonp: "callback",
            success: function(res) {
              if(res.code===200){
                _this.categoryBooks=res.data.list;
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
<style scoped>
  .library-category{
    height:100%;
    position: absolute;
    right: 0;
    left: 127px;
  }

  .active{
    width:118px;
    height: 30px;
    line-height: 30px;
    background: #fff;
    box-shadow: -3px -2px 2px 2px #ccc;
  }
  .category-view{
    display: flex;
  }
  .category-view-left{
    margin-left:30px;
    margin-top:17px;
    width:300px;
    height:800px;
    border-right:1px solid #ccc;

  }
  .title-span{
    border-left:5px solid #186d92;
  }
  .title-info{
    margin-left:6px;
    color: #186d92;
    font-family: SIMHEI;
    font-size: 16px;
  }
  .category-view-ul{
    margin-top: 18px;
  }
  .category-view-li{
    margin-bottom:16px;
    font-family: SIMHEI;
    color: #a1a19c;
    font-size: 14px;
  }
  .category-view-right{
    flex: 1;
    height:820px;
    position: relative;
  }
  .category-view-right-loading{
    width:400px;
    height: 300px;
  }
  .category-view-table{
    width: 100%;
    display: inline-block;
  }
  .category-view-tr-small{
    display: inline-block;
    width:100%;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 1px 2px #ccc;
    height:51px;
    line-height: 51px;
  }
  .category-view-th{
    display: inline-block;
    font-size: 16px;
    font-family: SIMHEI;
    color:#186d92;
    width:18%;
    text-align: center;
    padding-left:10px;

  }
  .category-view-tr-big{
    display: inline-block;
    width:100%;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 1px 2px #ccc;
  }


  .category-view-td{
    font-family: SIMHEI;
    display: inline-block;
    color: #000;
    width:18%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left:10px;

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


</style>
