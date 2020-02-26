import emailPreview from '../email-cmps/email-preview.cmp.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'

export default {
    template: `
    <section class="email-list">
        <email-filter @filtered="setFilter"></email-filter>
        <h1>Emails List:</h1>

        <email-preview v-for="(email, idx) in emails" 
        :email="email" 
        :key="email.id"
        @click.native="selectEmail(email.id)">
            
        </email-preview>
    </section>
    `,
    data() {
        return {
            selectedEmail: null,
            filterBy: null
        }
    },
    methods: {
        selectEmail(emailId) {
            // this.selectedEmail = idx
            // this.emails[idx].isRead = true
            // console.log(this.emails[idx].isRead)
            this.$emit('updateEmail', emailId, 'isRead', true)
        },

        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    components: {
        emailPreview,
        emailFilter
    },
    props: ['emails'],
}

/* <long-preview v-if="selectedEmail === idx"><long-preview></long-preview> */