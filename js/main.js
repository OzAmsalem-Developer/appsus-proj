import routes from './routes.js'
import mainHeader from './cmps/main-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import {eventBus, EVENT_CLOSE_MESSAGE, EVENT_MESSAGE} from './services/eventBus.service.js'

const router = new VueRouter({ routes })

new Vue({
    el: '#app',
    router,
    template: `
    <section class="main-app">
        <main-header></main-header>
        <router-view></router-view>
        <transition name="fade">
        <user-msg :msg="msg" v-if="isMsgShow"></user-msg>
        </transition>
    </section>
`,
    data: {
        isMsgShow: false,
        msg: null
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            this.isMsgShow = true
            setTimeout(() => {
                this.isMsgShow = false
            }, 3100);
        },
        screenMode() {
            return this.isScreenOpen
        }
    },
    components: {
        mainHeader,
        userMsg
    },
    created() {
        eventBus.$on(EVENT_CLOSE_MESSAGE, () => {this.isMsgShow = false})
        eventBus.$on(EVENT_MESSAGE, this.showMsg)
    }
})