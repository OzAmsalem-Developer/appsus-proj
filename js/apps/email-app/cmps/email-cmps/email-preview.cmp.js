export default {
    template: `
    <section v-if="email" class="email-preview">
        <hr>
        <h3>{{email.from}}</h3>
        <h3>{{email.sentAt}}</h3>
        <h3>{{email.subject}}</h3>
        <h3>{{email.body}}</h3>
        <h3>{{idx}}</h3>
    </section>
    `,
    props: ['email', 'idx']
}