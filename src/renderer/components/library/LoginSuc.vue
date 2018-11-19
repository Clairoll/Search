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
          <div
            class="left-current"
            :class="{'isActive': on}"
            @click="currentShow"
          >当前借阅</div>
          <div
            class="left-local"
            :class="{'isActive': close}"
            @click="localShow"
          >历史借阅</div>
      </div>
      <dic class="current-none" v-if="MSG">{{MSG}}</dic>
      <!--right-->
      <div class="right" v-show="showLocal">
        <div class="current" v-if="!MSGH">
          <div class="right-header border-bottom" >
            <span class="header-signal"></span>
            <span class="header-content">历史借阅</span>
            <div class="current-title border-bottom">
              <el-table :data="this.listlocal.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                <el-table-column label="书名" prop="tsmc"></el-table-column>
                <el-table-column label="续借次数" prop="xjbs"></el-table-column>
                <el-table-column label="应还日期" prop="hsrq"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="listlocal.length"@size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-show="showCurrent">
        <div class="current" v-if="!MSGC">
          <div class="right-header border-bottom" >
            <span class="header-signal"></span>
            <span class="header-content">当前借阅</span>
            <div class="current-title border-bottom">
              <el-table :data="this.listcurrent.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)">
                <el-table-column label="书名" prop="tsmc"></el-table-column>
                <el-table-column label="结束日期" prop="jsrq"></el-table-column>
                <el-table-column label="续借次数" prop="xjbs"></el-table-column>
                <el-table-column label="续借日期" prop="xjrq"></el-table-column>
                <el-table-column label="应还日期" prop="yhrq"></el-table-column>
              </el-table>
              <el-pagination  background layout="prev, pager, next" :total="listcurrent.length"@size-change="handleSizeChange1" @current-change="handleCurrentChange1"></el-pagination>
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
export default {
  name: "LibrarySuc",
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 10, // 每页的数据
      currentPage1: 1, // 初始页
      pagesize1: 10,
      listcurrent: [],
      listlocal: [],
      on: true,
      close: false,
      showLocal: false,
      showCurrent: true,
      user: this.$route.query.SFRZH,
      MSG: "",
    };
  },
  created() {
    let _this = this;
    $.ajax({
      type: "GET",
      url: `${_this.GLOBAL.URL}/library/currentborrow/${
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
          _this.MSGC=res.msg;
        }
      },
      error: function() {
        console.log("获取失败");
      }
    });
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size; //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange1(size1) {
      this.pagesize1 = size1; //每页下拉显示数据
    },
    handleCurrentChange1(currentPage1) {
      this.currentPage1 = currentPage1;
    },
    currentShow() {
      this.on = !this.on;
      this.close = !this.close;
      this.showLocal = !this.showLocal;
      this.showCurrent = !this.showCurrent;
      let _this = this;
      $.ajax({
        type: "GET",
        url: `${_this.GLOBAL.URL}/library/currentborrow/${
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
            _this.MSGC=res.msg;
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
        url: `${_this.GLOBAL.URL}/library/historyborrow/${
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
            _this.MSGH=res.msg;
          }
        },
        error: function() {
          console.log("获取失败");
        }
      });
    }
  },
};
</script>

<style scoped>
.library {
  width: 100%;
  height: 100%;
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
  display: flex;
  z-index: 100;
  left: 50px;
  top: 64px;
  width: 100%;
  height:80%;
  background: #ffffff;
  border-top: 1px solid black;
  box-shadow: 0px 0px 10px #757575;
}
.left {
  flex: 0 0 140px;
  width: 140px;
  height:100%;
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
  flex: 1;
  width: 100%;
  height: 100%;
  margin-left: -30px;
  padding: 7px;
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
  margin-top: 400px;
  text-align: center;
}
.current-title {
  width: 100%;
  height: 33px;
  line-height: 33px;
  font-size: 16px;
  color: rgb(24, 109, 146);
}
.footer {
  position: absolute;
  font-size: 50px;
  width: 100%;
  height: 72px;
  background: rgb(24, 109, 146);
  text-align: center;
  margin-top: 830px;
}
.footer a {
  color: #fff;
  font-weight: bold;
  font-family: JLH;
}
</style>

