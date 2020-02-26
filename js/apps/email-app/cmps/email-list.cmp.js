import emailPreview from '../cmps/email-preview.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailExtended from '../cmps/email-extended.cmp.js'

export default {
    template: `
    <section class="email-list">
        <email-filter></email-filter>
        <h1>Emails List:</h1>

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
        }
    },
    methods: {
        selectEmail(emailId) {
            this.selectedEmailId = emailId
            this.$emit('updateEmail', emailId, 'isRead', true)
        }
    },
    watch: {
        filterBy: function () {
            this.selectedEmailId = null
        }
    },
    components: {
        emailPreview,
        emailFilter,
        emailExtended,
    },
    props: ['emails', 'filterBy'],
}

