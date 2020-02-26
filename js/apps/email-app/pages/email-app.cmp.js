import {eventBus, EMAILS_FILTERED_EV} from '../../../services/eventBus.service.js'
import {emailService} from '../../../services/email.service.js'
import emailList from '../cmps/email-cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-cmps/email-filter.cmp.js'

export default {
    template: `
    <section class="email-app">
        <h1>email</h1>
        <email-list v-if ="emails" 
        :emails="emails"
        @updateEmail="updateEmail">
        </email-list>
        <pre>
        {{emailsForDisplay}}
        </pre>
    </section>
    `
    ,
    data() {
        return {
            emails: null,
            filterBy: null
        }
    },
    components: {
        emailFilter,
        emailList
    },
    methods: {
        updateEmail(emailId, prop, value) {
            emailService.updateEmail(emailId, prop, value)
        }
    },
    computed: {
        emailsForDisplay() {
            if (!this.filterBy) return this.emails
            return this.emails.filter(email => {
                return email.subject.includes(this.filterBy.txt) &&
                    email.isRead === this.filterBy.isRead
            })
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
                console.log('Emails Data:', this.emails)
            })
            
            eventBus.$on(EMAILS_FILTERED_EV, (filterBy) => {
                this.filterBy = filterBy
            })
    }
}