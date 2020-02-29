import routes from './routes.js'
import mainHeader from './cmps/main-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import {eventBus} from './services/eventBus.service.js'

const router = new VueRouter({ routes })

new Vue({
    el: '#app',
    router,
    template: `
    <section class="main-app">
        <main-header></main-header>
        <router-view @message="showMsg"></router-view>

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
        }
    },
    components: {
        mainHeader,
        userMsg
    },
    created() {
        eventBus.$on('msg-closed', () => {this.isMsgShow = false})
        eventBus.$on('message', this.showMsg)
    }
})