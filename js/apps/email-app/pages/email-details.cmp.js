import { emailService } from "../../../services/email.service.js"

export default {
    template: `
    <section v-if="email" class="email-details">
        <button @click="isMenuOpen = !isMenuOpen" class="dots-menu">
        <i class="fas fa-ellipsis-v"></i>
        </button>

        <section v-if="isMenuOpen" class="menu-container">
        <button class="reply">Reply<i class="fas fa-reply"></i></button>
        <button class="unread">Switch to unread<i class="fas fa-envelope-open-text"></i></button>
        <button class="to-notes">Send to notes<i class="far fa-lightbulb"></i></button>
        <button class="remove">Remove <i class="fas fa-trash"></i></button>
        </section>

        <h2 class="email-subject">{{email.subject}}</h2>
        <img src="img/icons/contact-icon.png" class="contact-img" alt="contact-icon">
        <span class="from">{{email.from}}</span>
        <span class="time">{{timeToShow}}</span>
        <span class="date">{{dateToShow}}</span>
        <p class="body">{{email.body}}</p>
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
            return time.toLocaleString().split(',')[0]
        }
    },
    watch: {
        '$route.params.emailId'() {
            this.getEmail()
        }
    },
    created() {
        this.getEmail()
    }
}