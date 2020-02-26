import emailPreview from '../email-cmps/email-preview.cmp.js'

export default {
    template: `
    <section class="email-list">
        <h1>Emails List:</h1>

        <email-preview v-for="(email, idx) in emails" 
        :email="email" :idx="idx" 
        :key="email.id"
        @click.native="selectEmail(idx)">
        </email-preview>

    </section>
    `
    ,
    props:['emails'],
    components: {
        emailPreview
    },
    data() {
        return {
            selectedEmail: null,
        }
    },
    methods: {
        selectEmail(idx) {
            this.selectedEmail = idx
            console.log(this.selectedEmail)
        }
    },
}