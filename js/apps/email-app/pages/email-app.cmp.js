import {emailService} from '../../../services/email.service.js'
import emailList from '../cmps/email-cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-cmps/email-filter.cmp.js'

export default {
    template: `
    <section class="email-app">
        <h1>email</h1>
    </section>
    `
    ,
    components: {
        emailFilter,
        emailList
    }
}