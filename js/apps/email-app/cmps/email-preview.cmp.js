import {utilService} from '../../../services/util.service.js'

export default {
    template: `
    <section v-if="email"
    class="email-preview"
    :class="emailClass">
            <span class="email-from">{{email.from}}</span>
            <span class="email-subject">{{email.subject}}</span>
            <span class="email-body">{{email.body}}</span>
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
    props: ['email']
}
