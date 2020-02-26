import { eventBus, EMAILS_FILTERED_EV } from '../../../services/eventBus.service.js'
import { emailService } from '../../../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailSideFilter from '../cmps/email-side-filter.cmp.js'

export default {
    template: `
    <section class="email-app">
        <email-side-filter @filtered="setSideFilter">
        </email-side-filter>

        <email-filter></email-filter>

        <email-list v-if ="emails" 
        :emails="emailsForDisplay"
        :filterBy="filterBy"
        @updateEmail="updateEmail">
        </email-list>
    </section>
    `
    ,
    data() {
        return {
            emails: null,
            filterBy: {
                txt: '',
                readUnread: 'All',
                sideFilter: 'inbox'
            }
        }
    },
    components: {
        emailFilter,
        emailList,
        emailSideFilter
    },
    methods: {
        updateEmail(emailId, prop, val) {
            emailService.updateEmail(emailId, prop, val)
        },
        setSideFilter(by) {
            this.filterBy.sideFilter = by
            console.log(this.filterBy);
        }
    },
    computed: {
        emailsForDisplay() {
            if (!this.filterBy) return this.emails
            const filteredEmails = this.emails.filter(email => {
                const txt = this.filterBy.txt.toLowerCase()
                const subject = email.subject.toLowerCase()
                const body = email.body.toLowerCase()
                const fromName = email.from.toLowerCase()
                
                return (subject.includes(txt) || body.includes(txt) || fromName.includes(txt))
                    && email.boxes[this.filterBy.sideFilter]
            })
            if (this.filterBy.readUnread === 'All') return filteredEmails
            else {
                const isRead = this.filterBy.readUnread === 'Read'
                return filteredEmails.filter(email => {
                    return email.isRead === isRead
                })
            }
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
            })

        eventBus.$on(EMAILS_FILTERED_EV, (filterBy) => {
            this.filterBy = JSON.parse(JSON.stringify(filterBy))
        })
    }
}