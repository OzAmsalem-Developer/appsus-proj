export default {
    template: `
    <section v-if="email"
    class="email-preview"
    :class="emailClass">
            <div class="email-from">{{email.from}}</div>
            <div class="email-subject">{{email.subject}}</div>
            <div class="email-body">{{email.body}}</div>
            <div class="email-sent">{{email.sentAt}}</div>
    </section>
    `,
    props: ['email', 'idx'],
    data() {
        return {
            unread: true,
        }
    },
    computed: {
        emailClass() {
            return (this.email.isRead) ? 'email-read': 'email-unread'
        }
    }
}