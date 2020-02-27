export default {
    template: `
    <section v-if="email"
    class="email-preview"
    :class="emailClass">
            <span class="email-from">{{email.from}}</span>
            <span class="email-subject">{{email.subject}}</span>
            <span class="email-body">{{email.body}}</span>
            <span class="email-sent">{{email.sentAt}}</span>
    </section>
    `,
    computed: {
        emailClass() {
            return (this.email.isRead) ? 'email-read' : 'email-unread'
        }
    },
    props: ['email']
}
