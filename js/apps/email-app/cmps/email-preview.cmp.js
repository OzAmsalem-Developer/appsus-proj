import {utilService} from '../../../services/util.service.js'
import longText from '../../../cmps/long-text.cmp.js'

export default {
    template: `
    <section v-if="email" class="email-preview"
    :class="emailClass">
        <span class="email-from">{{email.from}}</span>
        <long-text class="email-subject"
        :txt="email.subject" length="25"></long-text>

        <long-text class="email-body" 
        :txt="email.body" length="50">
        </long-text>

        <span class="email-sent">{{hourToShow}}</span>
    </section>
    `,
    computed: {
        emailClass() {
            return (this.email.isRead) ? 'email-read' : 'email-unread'
        },
        hourToShow() {
            return utilService.getFormattedHour(this.email.sentAt)
        }
    },
    components: {
        longText
    },
    props: ['email']
}
