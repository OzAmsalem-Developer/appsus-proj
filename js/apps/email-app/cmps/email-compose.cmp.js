import { emailService } from '../../../services/email.service.js'


export default {
    template: `
    <section class="email-compose">
    <h1>Compose</h1>
        <div v-if="isCompose">
        <form @submit.prevent="sendEmail">
            <input required type="text" v-model.trim="email.from" placeholder="Vendor name" />
            <input required type="text" v-model.trim="email.subject" placeholder="Vendor name" />          
            <textarea placeholder="Free text" v-model="email.body"></textarea>
            <button>Send</button>
            <button @click="closeCompose">delete</button>
        </form>
        </div>
    </section>
    `,
    props: ['isCompose'],
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
            emailService.createNewEmail(this.email)
        },
        closeCompose() {
            console.log('Email trash', this.email)
        }
    }
}