<template>
   <div class="library-index">
     <div>
       <div class="library-index-header">
         <div class="library-index-title">
           <h1 class="library-title-h1">图书书目查询</h1>
           <div class="library-title-input">
             <input class="title-input" type="text"  v-model="textIndex" placeholder="请输入图书名称"  @keyup.enter="clearText"/>
             <span
                    class="title-search"
                    @click="clearText"
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
                 <img src="../../../assets/img/not-login.jpg" class="message-left-img"/>
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
           <div class="library-message-right">
             <router-view></router-view>
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
  window.$ = window.jQuery = require("jquery");

   export default {
     data(){
       return{
         textIndex:'',
       }
     },
     methods:{
       back(){
         this.$router.push('/');
       },
       clearText(){
         if(this.textIndex===''){
          return window.alert('书名不能为空！');
         }else{
           this.$router.push(`/library-find-book?page=1&tm=${this.textIndex}`);
           this.textIndex='';
         }
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
     padding-left: 20px;

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
    flex: 1;
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
</style>
