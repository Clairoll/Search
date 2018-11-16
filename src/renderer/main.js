// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';;
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import '../renderer/assets/css/reset.css'
import '../renderer/assets/font/font.css'
import '../renderer/assets/css/border.css'
import '../renderer/assets/font/fonthei.css'
import global_ from '../renderer/assets/js/global'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_;

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      timeOut: ''
    }
  },
  created() {
    this.isTimeOut();
  },
  methods: {
    //页面15分钟无操作时返回首页
    startTimer() {
      let that = this;
      clearInterval(that.timeOut);
      that.timeOut = setInterval(function () {
        that.$router.push({ path: '/rbck' })
      }, 1000 * 60 * 0.2)
    },
    isTimeOut() {
      let that = this;
      if (that.$route.path == "/") {
        that.startTimer();
      }
      document.body.onmouseup = that.startTimer;
      document.body.onmousemove = that.startTimer;
      document.body.onkeyup = that.startTimer;
      document.body.onclick = that.startTimer;
      document.body.ontouchend = that.startTimer;
    },
  },
  // 解决跳转之前路由等于跳转之后路由问题
  watch: {
    '$route'(to, from) {
      if (to.path == from.path) {
        this.$router.push({
          path: '/rbck'
        })
      }
    }
  },
  router,
  components: { App },
  template: '<App/>'
})

