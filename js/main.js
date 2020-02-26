import routes from './routes.js'
import mainHeader from './cmps/main-header.cmp.js'

const router = new VueRouter({ routes })

console.log('HI OZ!')

new Vue({
    el: '#app',
    router,
    template: `
    <section class="main-app">
        <main-header></main-header>
        <router-view></router-view>
    </section>
`,
    components: {
        mainHeader
    }
})