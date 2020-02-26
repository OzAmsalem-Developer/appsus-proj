import mainNav from './main-nav.cmp.js'

export default {
    template: `
    <section class="main-header">
        <img src="img/logo/logo.jpg" alt="logo" class="logo">
        <main-nav></main-nav>
    </section>
    `
    ,
    components: {
        mainNav
    }
}