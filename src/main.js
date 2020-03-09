import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Row, Col, Button, Progress, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button)
Vue.component(Progress.name, Progress)
Vue.component(Message.name, Message)

Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
