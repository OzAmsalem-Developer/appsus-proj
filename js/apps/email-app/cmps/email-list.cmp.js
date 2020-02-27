import emailPreview from '../cmps/email-preview.cmp.js'
import emailExtended from '../cmps/email-extended.cmp.js'
import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="email-list">
        <div v-for="email in emails" class="email-previews">

            <email-preview
            :email="email" 
            :key="email.id"
            @click.native="selectEmail(email.id)">
            </email-preview>

            <email-extended
            v-if="selectedEmailId === email.id"
            :email="email">
            </email-extended>
        </div>
    </section>
    `,
    data() {
        return {
            selectedEmailId: null,
            emailsToBeRead: []
        }
    },
    methods: {
        selectEmail(emailId) {
            this.selectedEmailId = (emailId === this.selectedEmailId)? null : emailId
            // Filter by UNREAD? be 'read' only after the route change again
            if (this.$route.params.filter === '+unread') {
                this.emailsToBeRead.push(emailId)
                return
            }
            // Make the email read
            this.$emit('emailChanged', emailId, 'isRead', true)
        },
        emitWaitingEmails() {
            this.emailsToBeRead.forEach(emailId => {
                this.$emit('emailChanged', emailId, 'isRead', true)
            })
            this.emailsToBeRead = []
        }
    },
    watch: {
        emails: {
            handler(newVal, oldVal) {
                if (!oldVal === null) this.selectedEmailId = null
                this.emitWaitingEmails()
            },
            deep: true
        },
        '$route.params.filter'(newVal,oldVal){
            if (oldVal === '+unread') {
                this.emitWaitingEmails()
            }
        }
     },
    components: {
        emailPreview,
        emailExtended
    },
    props: ['emails']
}

