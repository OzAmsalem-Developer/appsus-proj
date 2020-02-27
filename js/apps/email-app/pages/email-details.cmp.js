import { emailService } from "../../../services/email.service.js"
import emailMenu from '../../email-app/cmps/email-menu.cmp.js'

export default {
    template: `
    <section v-if="email" class="email-details">
        <div class="email-header">
           <img src="img/icons/contact-icon.png" class="contact-img" alt="contact-icon">
        
            <button @click="isMenuOpen = !isMenuOpen" class="dots-menu">
            <i class="fas fa-ellipsis-v"></i>
            </button>

            <transition name="fade">
            <email-menu v-if="isMenuOpen">
            </email-menu>
            </transition>
        </div>

        <span class="from">From: {{email.from}}</span>
        <span class="time">At {{timeToShow}}, </span>
        <span class="date">{{dateToShow}}</span>
        <h2 class="email-subject">{{email.subject}}</h2>
        <p class="email-body">{{email.body}}</p>
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
            .then((email) => {this.email = email})
        }
    },
    computed: {
        timeToShow() {
            const time = new Date(this.email.sentAt)
            let hours = time.getHours();
            let minutes = time.getMinutes();
            const ampm = (hours >= 12) ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            const timeStr = hours + ':' + minutes + ' ' + ampm;
            return timeStr;
        },
        dateToShow() {
            const time = new Date(this.email.sentAt)
            // Replace '.' with '/'
            return time.toLocaleString().split(',')[0].replace(/\./g, '/');
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