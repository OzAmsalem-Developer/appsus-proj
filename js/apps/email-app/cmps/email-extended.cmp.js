export default {
    template: `
    <section class="email-extended">
        <div class="preview-row">
            <div class="preview-subject">
                {{email.subject}}
            </div>
            <div>
                <button class="remove-email-btn">X</button>
                <button class="expand-email-btn">O</button>
            </div>
        </div>
        <div class="preview-from">
            <h5>{{email.from}}</h5>
        </div>
        <div class="preview-body">
        <h5>{{email.body}}</h5>
        </div>
    </section>
    `,
    props: ['email']
}