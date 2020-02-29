import { emailService } from '../../../services/email.service.js'
import { eventBus } from '../../../services/eventBus.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import searchBar from '../../../cmps/search-bar.cmp.js'
import emailSideFilter from '../cmps/email-side-filter.cmp.js'

export default {
    template: `
    <section class="email-app container" v-if="emails">

        <div class="search-bar-container">
            <search-bar @filtered="setFilter" :searchData="searchData">
            </search-bar>
        </div>
        
        <section class="main-content">
            <aside class="side-menu side-container">
                <button @click.prevent="composeEmail"
                class="compose-btn">
                <i class="plus-icon fas fa-plus"></i>Compose
                </button>

                <email-side-filter @filtered="setSideFilter" 
                :unreadCount="unreadCount">
                </email-side-filter>
            </aside>

            <email-list v-if ="emails"
            :emails="emailsForDisplay"
            @updated="updateEmail">
            </email-list>
        </section>
        

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
            if (this.$route.path !== '/email') this.$router.push('/email')
        },
        updateEmail(prop, val, emailId) {
            emailService.updateEmail(prop, val, emailId)
        },
        sendToNotes(emailId) {
            emailService.sendToNotes(emailId)
        },
        replyToEmail(emailId) {
            this.$router.push('/email/reply/' + emailId)
        },
        replyCompose(isReply) {
            if (isReply) {
                this.isCompose = true
                this.isReply = true
            } else this.isReply = false
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
        },
        '$route.path'(newVal,oldVal){
            if (newVal.includes('reply')) this.replyCompose(true)
            else this.replyCompose(false)
        }
    },
    components: {
        emailList,
        emailCompose,
        emailSideFilter,
        searchBar
    },
    created() {
        if (this.$route.path.includes('reply')) this.replyCompose(true)
        else this.replyCompose(false)
        
        emailService.getEmails()
            .then(emails => {
                this.emails = emails
                this.countUnread()
            })

        //Listen to the eventBus
        eventBus.$on('removed', this.removeEmail)
        eventBus.$on('updated', this.updateEmail)
        eventBus.$on('sentToNotes', this.sendToNotes)
        eventBus.$on('reply', this.replyToEmail)
    }
}