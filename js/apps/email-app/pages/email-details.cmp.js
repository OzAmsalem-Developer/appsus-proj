import { emailService } from "../../../services/email.service.js"
import emailMenu from '../../email-app/cmps/email-menu.cmp.js'
import {utilService} from '../../../services/util.service.js'

export default {
    template: `
    <section v-if="email" class="email-details">
        <div class="email-header">
           <img src="img/icons/contact-icon.png" class="contact-img" alt="contact-icon">
        
            <button @click="isMenuOpen = !isMenuOpen" class="dots-menu">
            <i class="fas fa-ellipsis-v"></i>
            </button>

            <transition name="fade">
                <email-menu v-if="isMenuOpen"
                :emailId="email.id"
                class="menu-on-details"
                @clicked="isMenuOpen = false">
                </email-menu>
            </transition>
        </div>

        <span class="from">From: {{email.from}}</span>
        <span class="time">At {{timeToShow}}, </span>
        <span class="date">{{dateToShow}}</span>
        <h2 class="email-subject">{{email.subject}}</h2>
        <p class="email-body">{{email.body}}</p>

        <router-link to="/email" class="back-btn"><i class="fas fa-arrow-left"></i></router-link>
    </section>
    `
    ,
    data() {
        return {
            isMenuOpen: false,
            email: null
        }
    },
    methods: {
        getEmail() {
            const emailId = this.$route.params.emailId
            emailService.getEmailById(emailId)
            .then((email) => {
                this.email = email
            })
            .catch(() => {
                console.log('Id didnt exist');
                this.$router.push('/email')
            })
        }
    },
    computed: {
        timeToShow() {
            return utilService.getFormattedHour(this.email.sentAt)
        },
        dateToShow() {
            return utilService.getFormattedDate(this.email.sentAt)
        }
    },
    watch: {
        '$route.params.emailId'() {
            this.getEmail()
        }
    },
    components: {
        emailMenu
    },
    created() {
        this.getEmail()
    }
}