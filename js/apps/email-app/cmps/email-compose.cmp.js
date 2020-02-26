// import { emailService } from '../cmps/email-preview.cmp'


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
            <button>delete</button>
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
            }
        }
    },
    methods: {
        sendEmail() {
            console.log('EMAIL SENT!')
            console.log('From', this.email.from)
            console.log('subject', this.email.subject)
            console.log('body', this.email.body)
        }
    }
}