<template>
  <div class="card">
    <div>
      <div class="bg">
        <span class="title">学生卡服务</span>
      </div>
      <div class="main">
        <div class="center">
          <div class="menu-card">
            <div class="menu">
              <img class="avator" src="../../assets/avator.png">
              <span class="name">{{this.$route.query.XM}}</span>
              <span class="id">卡号：{{this.$route.query.xgh}}</span>
              <span class="money">余额：<i>{{data.ye}}</i></span>
            </div>
            <div class="detailed">
              <span>账单明细</span>
            </div>
          </div>
          <div class="wapper-card">
            <h1>我的账单</h1>
            <div class="search-card">
              <form>
                <span class="search">查询年月:</span>
                <input type="date" class="search-input" ref="mintime" value=""><span class="searchto">至</span>
                <input type="date" class="search-input" ref="maxtime" value="">
                <button class="btn-card" @click="_btnCard" type="button">查询</button>
              </form>
            </div>
            <div style="margin: 0 45px;" class="table" v-if="newlist.length!==0">
              <el-table :data="this.newlist.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column label="消费类型" prop="jylx"></el-table-column>
                <el-table-column label="时间" prop="jysj"></el-table-column>
                <el-table-column label="地点" prop="shmc"></el-table-column>
                <el-table-column label="金额" prop="jye"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="newlist.length"@size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
            <div style="margin: 0 45px;" class="table" v-else>
              <el-table :data="this.userList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column label="消费类型" prop="jylx"></el-table-column>
                <el-table-column label="时间" prop="jysj"></el-table-column>
                <el-table-column label="地点" prop="shmc"></el-table-column>
                <el-table-column label="金额" prop="jye"></el-table-column>
              </el-table>
              <el-pagination background layout="prev, pager, next" :total="userList.length"@size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span class="return" @click="_back">返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const first = 1;

export default {
  name: "card",
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 10, // 每页的数据
      userList: [],
      mintime: null, // 起始时间
      maxtime: null, // 结束时间
      data: {},
      name: {},
      newlist: []
    };
  },
  beforeCreate() {
    let _this = this;
    $.ajax({
      type: "POST",
      url: _this.GLOBAL.URL+"/select/selectYe.action",
      data: { xgh: this.$route.query.xgh },
      dataType: "jsonp",
      async: true,
      jsonp: "callback",
      success: function(res) {
        _this.data = res.data;
      },
      error: function() {
        console.log("获取失败");
      }
    });
    if ((_this.first = 1)) {
      $.ajax({
        type: "POST",
        url: _this.GLOBAL.URL+"/select/selectRecord.action",
        data: { xgh: this.$route.query.xgh},
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        success: function(res) {
          _this.newlist = res.data;
          _this.first++;
        },
        error: function() {
          console.log("获取失败");
        }
      });
    }
  },
  methods: {
    _back() {
      this.$router.go(-1);
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    _btnCard() {
      // 获取到用户输入的起始时间
      this.mintime = this.$refs.mintime.value;
      // 获取到用户输入的结束时间
      this.maxtime = this.$refs.maxtime.value;
      // 判断用户输入的起始时间与结束时间之间的关系
      var mint = new Date(this.mintime).getTime();
      var maxt = new Date(this.maxtime).getTime();
      var nowt = new Date().getTime() + ( 8 * 60 * 60 * 1000);
      var Dvalue = parseInt((nowt - mint) / (1000 * 60 * 60 * 24 ));
      console.log(this.$refs.maxtime.value);
      var _this = this;
      if( _this.$refs.maxtime.value == '' || _this.$refs.mintime.value == '') {
        alert("请输入时间");
      } else if (this.mintime > this.maxtime || mint > nowt || maxt > nowt) {
        alert("请输入合理时间");
      } else if (Dvalue > 365) {
        alert("只能查询一年内的消费记录，请输入合理时间");
      } else {
        $.ajax({
          type: "GET",
          url: _this.GLOBAL.URL+"/select/selectRecoredBytime.action",
          data: { xgh: this.$route.query.xgh, mintime: this.mintime, maxtime: this.maxtime},
          dataType: "jsonp",
          async: true,
          jsonp: "callback",
          success: function(res) {
            _this.newlist = res.data;
          },
          error: function() {
            console.log("获取失败");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.card .bg {
  width: 100%;
  height: 160px;
  background: #135677;
  position: absolute;
  left: 0;
}
.card .loading{
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.card .title {
  display: block;
  margin-left: 54px;
  height: 70px;
  line-height: 70px;
  color: white;
  font-size: 62px;
  font-family: JLH;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke: 2px #fff;
}
.card .center {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 80px;
  margin-left: 54px;
  bottom: 80px;
  width: 90%;
  background:#fff;
  box-shadow: 1px 13px 25px #949494;
}
.card .menu-card {
  flex: 0 0 134px;
  width: 134px;
}
.card .menu {
  font-size: 16px;
  font-weight: 700;
  color: #a1a19c;
  font-family: SimHei;
}
.card .menu .avator {
  margin: 5px 0 3px 25px;
}
.card .menu .name {
  display: block;
  text-align: center;
}
.card .menu .id {
  display: block;
  margin: 30px 0 13px 13px;
}
.card .menu .money {
  margin-left: 13px;
}
.card .money i {
  font-style: normal;
  background: #186d92;
  color: #fff;
}
.card .detailed span {
  color: #186d92;
  font-size: 25px;
  font-family: SimHei;
  display: block;
  box-shadow: -6px 0px 18px #949494;
  margin-left: 13px;
  margin-top: 15px;
  background: white;
  position: absolute;
  width: 122px;
  height: 30px;
  line-height: 30px;
}
.card .wapper-card {
  flex: 1;
  box-shadow: -2px 0px 10px #949494;
}
.card .wapper-card h1 {
  color: #a1a19c;
  font-size: 25px;
  font-family: SimHei;
  font-weight: normal;
  margin: 30px 0 30px 35px;
  padding-left: 6px;
  box-shadow: -5px 0px 0px #186d92;
}
.card .search-card {
  color: #a1a19c;
  margin: 0 0 30px 35px;
  font-weight: 700;
  height: 20px;
}
.card .search {
  font-size: 16px;
  box-shadow: -5px 0px 0px #186d92;
  padding-left: 9px;
}
.card .searchto {
  font-size: 16px;
}
.card .search-input {
  outline: none;
  height: 20px;
  border: 1px solid #a1a19c;
}
input[type="date"]::-webkit-inner-spin-button {
  display: none;
}
input[type="date"]::-webkit-clear-button {
  display: none;
}
.card .btn-card {
  height: 25px;
  width: 45px;
  background: #fff;
  border: 1px solid #a1a19c;
  border-radius: 5px;
}
.card .bottom {
  position: absolute;
  width: 90%;
  height: 80px;
  background: #135677;
  bottom: 0px;
  margin-left: 54px;
}
.bottom .return {
  display: block;
  text-align: center;
  height: 80px;
  line-height: 80px;
  color: white;
  font-size: 62px;
  font-family: JLH;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke: 2px #fff;
  box-shadow: 0px 6px 21px #545454;
}
</style>