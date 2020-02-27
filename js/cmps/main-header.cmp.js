import mainNav from './main-nav.cmp.js'

export default {
    template: `
    <section class="main-header">
        <div class="header-container container">
            <img src="img/logo/logo.png" alt="logo" class="logo-img">
            <main-nav></main-nav>
        </div>
    </section>
    `
    ,
    components: {
        mainNav
    }
}

// main nav - v-if
// button to toggle 