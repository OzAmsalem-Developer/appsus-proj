export default {
    template: `
    <section class="email-extended-preview">
        <div class="email-extended-subject-row">
            <h2>{{email.subject}}</h2>
        </div>
        <div class="email-extended-from">
            <h5>{{email.from}}</h5>
        </div>
            <div class="email-extended-body">
        <h5>{{email.body}}</h5>
        </div>
    </section>
    `,
    props: ['email']
}