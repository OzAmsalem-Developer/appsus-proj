import {eventBus, EMAILS_FILTERED_EV} from '../../../services/eventBus.service.js'
import {emailService} from '../../../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'

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
            const filteredByTxt = this.emails.filter(email => {
                const txt = this.filterBy.txt.toLowerCase()
                const subject = email.subject.toLowerCase()
                const body = email.body.toLowerCase()
                const fromName = email.from.toLowerCase()

                return subject.includes(txt) || body.includes(txt) || fromName.includes(txt)
            })
            if(this.filterBy.readUnread === 'All') return filteredByTxt
            else {
                const isRead = (this.filterBy.readUnread === 'Read')? true : false
                return filteredByTxt.filter(email => {
                    return email.isRead === isRead
                })
            }
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
                console.log('Emails Data:', this.emails)
            })
            
            eventBus.$on(EMAILS_FILTERED_EV, (filterBy) => {
                console.log('ss');
                
                this.filterBy = JSON.parse(JSON.stringify(filterBy)) 
            })
    }
}