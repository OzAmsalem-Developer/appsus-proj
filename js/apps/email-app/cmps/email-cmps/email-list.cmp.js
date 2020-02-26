import emailPreview from '../email-cmps/email-preview.cmp.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'

export default {
    template: `
    <section class="email-list">
        <email-filter></email-filter>
        <h1>Emails List:</h1>

        <email-preview v-for="(email, idx) in emails" 
        :email="email" :idx="idx" 
        :key="email.id">
        </email-preview>
        
    </section>
    `
    ,
    props:['emails'],
    components: {
        emailPreview,
        emailFilter
    },
    data() {
        return {
            
        }
    },
    created() {

    }
}