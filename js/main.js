import routes from './routes.js'

const router = new VueRouter({ routes })


new Vue({
    el: '#app',
    router,
    template: `
    <section class="main-app">
        <router-view></router-view>
    </section>
`,
    components: {

    }
})