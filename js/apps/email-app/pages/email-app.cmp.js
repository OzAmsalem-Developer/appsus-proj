import { emailService } from '../../../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import searchBar from '../../../cmps/search-bar.cmp.js'
import emailSideFilter from '../cmps/email-side-filter.cmp.js'

export default {
    template: `
    <section class="email-app container" v-if="emails">
        
        <aside class="side-menu side-container">
            <button @click.prevent="composeEmail"
                class="compose-btn">
                <i class="fas fa-plus"></i>
                Compose
            </button>

            <email-side-filter @filtered="setSideFilter" 
            :unreadCount="unreadCount">
            </email-side-filter>
        </aside>

        <search-bar @filtered="setFilter" :searchData="searchData">
        </search-bar>

        <email-list v-if ="emails"
        @removed="removeEmail"
        :emails="emailsForDisplay"
        @emailChanged="updateEmail">
        </email-list>

        <email-compose :isReply="isReply"
         @emailCreated="isCompose = false"
          v-if="isCompose"></email-compose>
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
            isReply: false,
            unreadCount: null,
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
        },
        setSideFilter(by) {
            this.filterBy.sideFilter = by
        },
        setFilter(filterBy) {
            this.filterBy.txt = filterBy.txt
            this.filterBy.readUnread = filterBy.selectedOption
        },
        removeEmail(emailId) {
            emailService.removeEmail(emailId)
        },
        countUnread() { // This is not computed because of vue reactive   
            this.unreadCount = this.emails.reduce((acc,email) => {
                const boxes = email.boxes
                for (const prop in boxes) {
                    if (acc[prop] === undefined) acc[prop] = 0
                    if (boxes[prop] && !email.isRead) acc[prop]++
                }
                return acc
            },{})
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
    watch: {
        emails: {
            handler() {
                this.countUnread()
            },
            deep: true
        } 
    },
    components: {
        emailList,
        emailCompose,
        emailSideFilter,
        searchBar
    },
    created() {
        if (this.$route.path.includes('reply')) {
            this.isCompose = true
            this.isReply = true
        } else this.isReply = false
        
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
                this.countUnread()
            })
    }
}