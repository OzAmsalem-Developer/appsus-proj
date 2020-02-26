export default {
    template: `
    <section class="email-extended-preview">

        <div class="email-extended-subject-row">
            <div class="email-extended-subject">
                {{email.subject}}
            </div>
            <div>
                <button class="remove-email-btn">X</button>
                <button class="expand-email-btn">O</button>
            </div>
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