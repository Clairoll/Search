<template>
  <div class="library">
    <!--header-->
    <div class="header">
      <span class="header-name">我的图书馆</span>
    </div>
    <!--content-->
    <div class="content">
      <!--left-->
      <div class="left">
        <div class="left-header">
          <div class="header-img">
            <img src="../../../renderer/assets/img/headSuc.png" width="79" height="76">
          </div>
          <div class="header-name">{{this.$route.query.DZXM}},欢迎您！</div>
        </div>
        <transition>
          <div
            class="left-current"
            :class="{'isActive': on}"
            @click="currentShow"
          >当前借阅</div>
        </transition>
        <transition>
          <div
            class="left-local"
            :class="{'isActive': close}"
            @click="localShow"
          >历史借阅</div>
        </transition>
      </div>
      <dic class="current-none" v-if="MSG">{{MSG}}</dic>
      <!--right-->
      <div class="right" v-show="showLocal">
        <div class="current">
          <div class="right-header border-bottom" >
            <span class="header-signal"></span>
            <span class="header-content">历史借阅</span>
            <div class="current-title border-bottom">
              <span class="title-num" style="width: 400px;">书名</span>
              <span class="rentd" style="width: 400px;">续借次数</span>
              <span class="backd" style="width: 400px;">应还日期</span>
            </div>
              <div class="local-content" ref="wrapper">
                <ul class="content-ul">
                  <li class="content-li border-bottom" v-for="item of listlocal">
                    <span class="content-num" style="width: 400px;">{{item.tsmc}}</span>
                    <span class="content-or" style="width: 400px;">{{item.xjbs}}</span>
                    <span class="content-backd">{{item.hsrq}}</span>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
      <div class="right" v-show="showCurrent">
        <div class="current">
          <div class="right-header border-bottom" >
            <span class="header-signal"></span>
            <span class="header-content">当前借阅</span>
            <div class="current-title border-bottom">
              <span class="title-num">书名</span>
              <span class="title-name">结束日期</span>
              <span class="title-or">续借次数</span>
              <span class="rentd">续借日期</span>
              <span class="backd">应还日期</span>
              <div class="current-content">
                <ul>
                  <li class="content-li border-bottom" v-for="item of listcurrent">
                    <span class="content-num">{{item.tsmc}}</span>
                    <span class="content-name">{{item.jsrq}}</span>
                    <span class="content-or">{{item.xjbs}}</span>
                    <span class="content-rentd">{{item.xjrq}}</span>
                    <span class="content-backd">{{item.yhrq}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--footer-->
      <div class="footer">
        <router-link to="/">返回</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "LibrarySuc",
  data() {
    return {
      on: true,
      close: false,
      showLocal: false,
      showCurrent: true,
      listlocal: {},
      listcurrent: {},
      user: this.$route.query.SFRZH,
      MSG: ""
    };
  },
  created() {
    let _this = this;
    $.ajax({
      type: "GET",
      url: `http://222.195.120.110:8080/select/library/currentborrow/${
        this.user
      }`,
      dataType: "jsonp",
      async: true,
      jsonp: "callback",
      success: function(res) {
        if (res.code === 200) {
          _this.listcurrent = res.data;
        } else {
          _this.MSG = res.msg;
        }
      },
      error: function() {
        console.log("获取失败");
      }
    });
  },
  methods: {
    currentShow() {
      this.on = !this.on;
      this.close = !this.close;
      this.showLocal = !this.showLocal;
      this.showCurrent = !this.showCurrent;
      let _this = this;
      $.ajax({
        type: "GET",
        url: `http://222.195.120.110:8080/select/library/currentborrow/${
          this.user
        }`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          if (res.code === 200) {
            _this.listcurrent = res.data;
          } else {
            _this.MSG = res.msg;
          }
        },
        error: function() {
          console.log("获取失败");
        }
      });
    },
    localShow() {
      this.close = !this.close;
      this.on = !this.on;
      this.showLocal = !this.showLocal;
      this.showCurrent = !this.showCurrent;
      this.MSG = false;
      let _this = this;
      $.ajax({
        type: "GET",
        url: `http://222.195.120.110:8080/select/library/historyborrow/${
          this.user
        }`,
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          if (res.code === 200) {
            _this.listlocal = res.data;
          } else {
            _this.MSG = res.msg;
          }
        },
        error: function() {
          console.log("获取失败");
        }
      });
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
    console.log(this.scroll);
  }
};
</script>

<style scoped>
.library {
  position: relative;
  width: 100%;
  font-family: "SIMHEI";
}
.header {
  height: 160px;
  background: rgb(24, 109, 146);
  padding: 8px 46px 8px 50px;
}
.header-name {
  font-size: 50px;
  color: #ffffff;
}
.content {
  position: absolute;
  z-index: 100;
  left: 50px;
  top: 62px;
  width: 100%;
  height: 888px;
  background: #ffffff;
  border-top: 1px solid black;
  box-shadow: 0px 0px 10px #757575;
}
.left {
  position: relative;
  float: left;
  width: 140px;
  height: 816px;
  margin-left: 25px;
  margin-top: 4px;
}
.header-img {
  width: 79px;
  height: 76px;
  background-repeat: no-repeat;
  background-size: 79px 76px;
}
.library .left .header-name {
  font-size: 12px;
  background: #fff;
  color: #565656;
  font-weight: bold;
  margin-left: 4px;
  margin-top: 2px;
}
.left-current {
  display: inline-block;
  font-size: 25px;
  color: rgb(24, 109, 146);
  width: 105px;
  height: 38px;
  line-height: 38px;
  margin-left: 4px;
  margin-top: 40px;
  cursor: pointer;
}
.left-local {
  display: inline-block;
  height: 38px;
  width: 105px;
  line-height: 38px;
  font-size: 25px;
  color: rgb(24, 109, 146);
  margin-left: 3px;
  margin-top: 30px;
  cursor: pointer;
}
.isActive {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  margin-left: 3px;
  box-shadow: -3px -2px 4px 2px rgb(24, 109, 146);
}
.right {
  position: relative;
  float: left;
  width: 100%;
  height: 816px;
  margin-left: 133px;
  padding: 7px;
  margin-top: -820px;
  box-shadow: 0px 0px 10px #757575;
}
.right-header {
  position: relative;
  height: 55px;
  line-height: 55px;
  left: 0px;
  top: 0px;
}
.header-signal {
  position: relative;
  display: inline-block;
  width: 5px;
  height: 17px;
  background: rgb(24, 109, 146);
  left: 25px;
  top: 2px;
}
.header-content {
  position: relative;
  display: inline-block;
  font-size: 16px;
  color: rgb(161, 161, 156);
  left: 28px;
}
.current-none {
  position: absolute;
  font-size: 20px;
  color: red;
  width: 100%;
  margin-top: 300px;
  margin-left: 280px;
}
.local-content {
  position: absolute;
  left: 0px;
  width: 100%;
  height: 700px;
  overflow: hidden;
}
.content-ul {
}
.content-li {
  width: 100%;
  height: 77px;
  line-height: 77px;
  paddding-left: 37px;
  color: rgb(161, 161, 156);
}
.current-title {
  width: 100%;
  height: 33px;
  line-height: 33px;
  font-size: 16px;
  color: rgb(24, 109, 146);
}
.title-num {
  display: inline-block;
  width: 200px;
  margin-left: 30px;
}
.title-name {
  display: inline-block;
  width: 200px;
}
.title-or {
  display: inline-block;
  width: 200px;
}
.rentd {
  display: inline-block;
  width: 200px;
}
.backd {
  display: inline-block;
  width: 200px;
}
.current-content {
  position: absolute;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 760px;
}
.content-num {
  display: inline-block;
  width: 200px;
  margin-left: 30px;
}
.content-name {
  display: inline-block;
  width: 200px;
}
.content-or {
  display: inline-block;
  width: 200px;
}
.content-rentd {
  display: inline-block;
  width: 200px;
}
.content-backd {
  display: inline-block;
  width: 200px;
}
.footer {
  position: absolute;
  font-size: 50px;
  width: 100%;
  height: 72px;
  line-height: 72px;
  background: rgb(24, 109, 146);
  text-align: center;
  margin-top: 780px;
}
.footer a {
  color: #fff;
  font-weight: bold;
  font-family: JLH;
}
</style>

