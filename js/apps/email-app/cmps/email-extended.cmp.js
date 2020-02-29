import emailMenu from '../cmps/email-menu.cmp.js'

export default {
    template: `
<section class="email-extended">
    <div class="preview-row">
        <div class="preview-subject">
        {{email.subject}}
        </div>

        <div class="menu-container">
            <transition name="fade">
            <email-menu 
            :emailId="email.id" v-if="isMenuOpen"
            @clicked="isMenuOpen = false">
            </email-menu>
            </transition>
            <button @click="isMenuOpen = !isMenuOpen" class="dots-vertical">
            <i class="fas fa-ellipsis-h"></i>
            </button>

            <router-link :to="'email/'+email.id"><i class="fas fa-expand"></i></router-link>
            </div>
        </div>
        
     
    </div>
        <div class="preview-from">
            <h5>{{email.from}}</h5>
        </div>
        <div class="preview-body">
        <h5>{{email.body}}</h5>
    </div>
</section>
    `,
    data() {
        return {
            isMenuOpen: false
        }
    },
    components: {
        emailMenu
    },
    props: ['email']
}