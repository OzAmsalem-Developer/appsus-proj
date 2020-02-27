import { emailService } from '../../../services/email.service.js'


export default {
    template: `
    <section class="email-compose">
        <form @submit.prevent="sendEmail" class="compose-form">
        
            <div class="compose-header">
            <span>New Message</span>
            </div>

            <input class="form-txt" required type="text" v-model.trim="email.from" placeholder="To:" />
            <input class="form-txt" required type="text" v-model.trim="email.subject" placeholder="Subject:" />          
            <textarea class="form-txt" v-model="email.body" rows="20"></textarea>

            <div class="form-btns">
                <button class="send-btn"><i class="far fa-paper-plane"></i> Send</button>
                <button class="delete-btn" @click.prevent="closeCompose">delete</button>
            </div>
        </form>
    </section>
    `,
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
                    star: false,
                    note: false
                }
            }
        }
    },
    methods: {
        sendEmail() {
            if (!this.email.from || !this.email.subject) return
            if (this.email.from.toLowerCase() === 'me' || this.email.from.toLowerCase() === 'myself') {
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