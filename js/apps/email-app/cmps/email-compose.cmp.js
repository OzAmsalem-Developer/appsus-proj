import { emailService } from '../../../services/email.service.js'


export default {
    template: `
    <section class="email-compose">
    <h1>Compose</h1>
        <div>
        <form @submit.prevent="sendEmail">
            <input required type="text" v-model.trim="email.from" placeholder="To:" />
            <input required type="text" v-model.trim="email.subject" placeholder="Subject:" />          
            <textarea placeholder="Free text" v-model="email.body"></textarea>
            <button>Send</button>
            <button @click="closeCompose">delete</button>
        </form>
        </div>
    </section>
    `,
    // props: ['isCompose'],
    data() {
        return {
            email: {
                from: '',
                subject: '',
                body: '',
                boxes: {
                    inbox: true,
                    sentBox: true,
                    draft: false,
                    star: false
                }
            }
        }
    },
    methods: {
        sendEmail() {
            if (!this.email.from || !this.email.subject) return
            if (this.email.from.toLowerCase() === 'me' || this.email.from.toLowerCase() === 'myself') {
                console.log('email sent to myself')
                this.email.boxes.sentBox = true
            }
            console.log('Email sent to:', this.email.from)
            emailService.createNewEmail(this.email)
        },
        closeCompose() {
            console.log('Email trash', this.email)
        }
    }
}