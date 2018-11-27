<template>
  <div class="login-class">
    <div class="bg">
      <img src="../../assets/bg.jpg">
      <div class="return">
        <span @click="_back">返回</span>
      </div>
      <div class="content">
        <div class="title"><span>课程表服务</span></div>
        <div class="table">
          <div class="user">
            <span>用户:</span>
            <input type="type" ref="user" oninput="value=value.replace(/[^\d]/g,'')" value="">
          </div>
          <div class="pass">
            <span>密码:</span>
            <input type="password" ref="pass" value="" @keyup.enter="_check">
          </div>
          <div class="search">
            <button  @click='_check'>查询</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-class",
  methods: {
    _back() {
      this.$router.go(-1);
    },
    _check() {
      //获取用户输入的学号
      this.user = this.$refs.user.value;
      this.pass = this.$refs.pass.value.toUpperCase();
      let _this = this;
      if (this.user === "" || this.pass === "") {
        alert("请输入账号和密码");
      } else {
        $.ajax({
          type: "POST",
          url: _this.GLOBAL.URL + "/subject/login.action",
          data: { XGH: this.user, password: this.pass },
          dataType: "jsonp",
          async: true,
          jsonp: "jsonpCallback",
          success: function(res) {
            console.log(res);
            if (res.status === 200) {
              _this.$router.push({
                path: "/class",
                query: { xgh: _this.$refs.user.value, XM: res.data.xm }
              });
            } else {
              alert(res.msg);
            }
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

<style>
@import "../../assets/font/font.css";

.login-class .bg {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 auto;
}
.login-class img {
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
}
.login-class .return {
  width: 115px;
  height: 55px;
  background: linear-gradient(
    to right,
    rgba(0, 34, 52, 0.4),
    rgba(54, 191, 255, 1)
  );
  box-shadow: 0px 0px 8px #fff;
  position: absolute;
  top: 9%;
  left: 7%;
  line-height: 55px;
  text-align: center;
  border-radius: 15px;
}
.login-class span {
  text-decoration: none;
  color: white;
  font-size: 40px;
  font-family: JLH;
  -webkit-text-fill-color: #fff;
  -webkit-text-stroke: 2px #fff;
}
.login-class .content {
  width: 589px;
  height: 798px;
  background: rgba(9, 59, 85, 0.33);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 14px #fff;
}
.login-class .title {
  text-align: center;
  margin: 127px 0 113px 0;
}
.login-class .title span {
  font-size: 80px;
}
.login-class .table {
  text-align: center;
}

.login-class .user input {
  width: 273px;
  height: 40px;
  border-radius: 15px;
  outline: none;
  margin-left: 20px;
  font-size: 28px;
  color: #186d92;
  padding-left: 13px;
  line-height: 40px;
  margin-top: -13px;
}
.login-class .pass {
  margin: 75px 0 118px 0px;
}
.login-class .pass input {
  width: 273px;
  height: 40px;
  border-radius: 15px;
  margin-left: 20px;
  outline: none;
  font-size: 28px;
  color: #186d92;
  padding-left: 13px;
  line-height: 40px;
  margin-top: -13px;
}
.login-class .search {
  margin: 0 auto;
  border-radius: 15px;
  height: 70px;
  width: 388px;
}
.search button {
  color: rgb(4, 40, 57);
  height: 100%;
  width: 100%;
  font-size: 40px;
  border-radius: 15px;
  font-family: JLH;
  -webkit-text-fill-color: rgb(4, 40, 57);
  -webkit-text-stroke: 2px rgb(4, 40, 57);
  outline: none;
}
</style>
