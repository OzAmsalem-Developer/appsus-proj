import mainNav from './main-nav.cmp.js'

export default {
    template: `
    <section class="main-header">

        <router-link to="/">
            <img src="img/logo/logo.png" alt="logo" class="logo-img" />
        </router-link>
            <div class="menu-icon-container">
                <img class="menu-icon" @click="isMenuOpen = !isMenuOpen"
                src="img/icons/menu.png" alt="menu" />
            </div>
        

            <transition name="fade">
                <main-nav v-if="isMenuOpen" @clicked="isMenuOpen=false">
                </main-nav>
            </transition>
     
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