import mainNav from './main-nav.cmp.js'
import { eventBus } from '../services/eventBus.service.js'

export default {
    template: `
    <section class="main-header">

        <router-link to="/">
            <img src="img/logo/logo.png" alt="logo" class="logo-img" />
        </router-link>
            <div class="menu-icon-container">
                <img class="menu-icon" id="menuIcon" @click="isMenuOpen = !isMenuOpen"
                src="img/icons/menu.png" alt="menu" />
            </div>
        

            <transition name="fade">
                <main-nav id="menu" v-if="isMenuOpen" @clicked="this.isMenuOpen = false">
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
    methods: {
        documentClick(ev) {
            if (ev.target.id !== 'menu' && ev.target.id !== 'menuIcon') this.isMenuOpen = false
        }
    },
    watch: {
        '$route.path'() {
            this.isMenuOpen = false
        }
    },
    components: {
        mainNav
    },
    created () {
        document.addEventListener('click', this.documentClick) //For closing menu on doc click
      },
}