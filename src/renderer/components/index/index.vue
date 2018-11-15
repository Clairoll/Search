<template>
  <div>
    <div class="index">
      <img src="../../assets/img/bg.jpg" class="index-bg">
      <div class="index-header">
        巢湖学院查询系统
      </div>
        <div class="index-center">
          <ul>
            <li><router-link :to="{path:'/login-card'}" class="index-content">校园卡</router-link></li>
            <li><router-link :to="{path:'/login-class'}" class="index-content">课程表</router-link></li>
            <li><router-link :to="{path:'/library-index'}" class="index-content">图书馆</router-link></li>
            <li><router-link :to="{path:'/'}" class="index-content">请期待</router-link></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style>
  @import '../../assets/font/font.css';
  .index{
    width: 100%;
    height: 100%;
    font-family: 'JLH';
  }
  .index-bg{
    position: absolute;
    width: 100%;
    height:100%;
    background-size:100% 100%;
    background-repeat: no-repeat;
  }
  .index-header{
    position: absolute;
    width: 100%;
    height: 120px;
    line-height: 120px;
    font-size:88px;
    color: #fff;
    top: 43px;
    text-align: center;
  }
  .index-center{
    position:absolute;
    width: 100%;
    height:788px;
    background: url("../../assets/img/border-shade.png") no-repeat;
    background-size:100% 788px;
    margin-top: 182px;
  }
  .index-center ul{
    position: relative;
    display: flex;
    padding:250px 150px;
  }
  .index-center ul li{
    flex: 1;
    width:218px;
    height:224px;
    background-size:218px 224px;
    background: url("../../assets/img/circu.png") no-repeat;
  }
  .index-center ul li a{
    color: rgb(28,100,149);
    -webkit-text-fill-color: rgb(28,100,149);
    -webkit-text-stroke: 2px rgb(28,100,149);
    font-size: 50px;
    margin-left: 30px;
    height: 224px;
    line-height: 224px;
  }
</style>
