import mainNav from './main-nav.cmp.js'

export default {
    template: `
    <section class="main-header">
        <div class="header-container container">
            <img src="img/logo/logo.png" alt="logo" class="logo-img" />
        
            <div class="menu-icon-container">
                <img class="menu-icon" @click="isMenuOpen = !isMenuOpen"
                src="img/icons/menu.png" alt="menu" />
            </div>
        

            <transition name="fade">
                <main-nav v-if="isMenuOpen" @clicked="isMenuOpen=false">
                </main-nav>
            </transition>
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