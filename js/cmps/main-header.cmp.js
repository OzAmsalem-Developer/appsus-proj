import mainNav from './main-nav.cmp.js'

export default {
    template: `
    <section class="main-header">
        <div class="header-container container">
            <img src="img/logo/logo.png" alt="logo" class="logo-img" />
            <img class="menu-icon" @click="isMenuOpen = !isMenuOpen"
            src="img/icons/menu.png" alt="menu" />
            <main-nav v-if="isMenuOpen"></main-nav>
        </div>
    </section>
    `
    ,
    data() {
        return {
            isMenuOpen: false
        }
    },
    watch: {
        '$route.path'() {
            this.isMenuOpen = false
        }
    },
    components: {
        mainNav
    }
}