import emailPreview from '../cmps/email-preview.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailExtendedPreview from '../cmps/email-extended-preview.cmp.js'

export default {
    template: `
    <section class="email-list">
        <email-filter @filtered="setFilter"></email-filter>
        <h1>Emails List:</h1>

        <div v-for="(email, idx) in emails" class="email-previews">
            <email-preview
            :email="email" 
            :key="email.id"
            @click.native="selectEmail(email.id)">
            </email-preview>

            <email-extended-preview 
            v-if="selectedEmailId === email.id"
            :email="email">
            </email-extended-preview>
        </div>

    </section>
    `,
    data() {
        return {
            selectedEmailId: null,
            filterBy: null
        }
    },
    methods: {
        selectEmail(emailId) {
            this.selectedEmailId = emailId
            console.log(this.selectedEmailId)
            this.$emit('updateEmail', emailId, 'isRead', true)
        },
        setFilter(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy
        }
    },
    components: {
        emailPreview,
        emailFilter,
        emailExtendedPreview,
    },
    props: ['emails'],
}

/* <extended-preview v-if="selectedEmailId === email.id"><long-preview></long-preview> */
/* <long-preview v-if="selectedEmail === idx"><long-preview></long-preview> */