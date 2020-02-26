import emailPreview from '../cmps/email-preview.cmp.js'
import emailExtended from '../cmps/email-extended.cmp.js'

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
        emailExtended
    },
    props: ['emails', 'filterBy'],
}

