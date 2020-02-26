export default {
    template: `
    <section class="email-compose">
        <h1>Create email</h1>
        <div v-if="isCompose">
        </div>
    </section>
    `,
    props: ['isCompose']
}