import { emailService } from '../../../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import searchBar from '../../../cmps/search-bar.cmp.js'
import emailSideFilter from '../cmps/email-side-filter.cmp.js'

export default {
    template: `
    <section class="email-app container" v-if="emails">
        
        <aside class="side-menu">
            <button @click="composeEmail"
                class="compose-btn">Compose
            </button>

            <email-side-filter @filtered="setSideFilter" 
            :unreadCount="unreadCount">
            </email-side-filter>
        </aside>

        <search-bar @filtered="setFilter" 
        :searchData="searchData">
        </search-bar>

        <email-list v-if ="emails" 
        :emails="emailsForDisplay"
        @updateEmail="updateEmail">
        </email-list>

        <email-compose v-if="isCompose">
        </email-compose>
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
            },
            isCompose: false,
            searchData: {
                placeholder: 'Search mail',
                selectOptions: ['All', 'Read', 'Unread']
            }
        }
    },
    methods: {
        updateEmail(emailId, prop, val) {
            emailService.updateEmail(emailId, prop, val)
        },
        composeEmail() {
            if (this.isCompose) return
            this.isCompose = true
            console.log('isCompose?', this.isCompose)
        },
        setSideFilter(by) {
            this.filterBy.sideFilter = by
        },
        setFilter(filterBy) {
            this.filterBy.txt = filterBy.txt
            this.filterBy.readUnread = filterBy.selectedOption
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
        },
        unreadCount() {
            let count = 0
            this.emails.forEach(email => {
                if (!email.isRead) count++
            })
            return (count > 0)? count : ''
        }
    },
    components: {
        emailList,
        emailCompose,
        searchBar,
        emailSideFilter
    },
    created() {
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
            })
    }
}