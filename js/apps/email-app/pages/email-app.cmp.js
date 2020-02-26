import {emailService} from '../../../services/email.service.js'
import emailList from '../cmps/email-cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-cmps/email-filter.cmp.js'

export default {
    template: `
    <section class="email-app">
        <h1>email</h1>
        <email-list 
        v-if ="emails"
        :emails="emails"
        @updateEmail="updateEmail"></email-list>
    </section>
    `
    ,
    data() {
        return {
            emails: null,
        }
    },
    components: {
        emailFilter,
        emailList
    },
    methods: {
        updateEmail(emailId, prop, val) {
            emailService.updateEmail(emailId, prop, val)
            console.log(this.emails)
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
                console.log('Emails Data:', this.emails)
            })
            
    }
}