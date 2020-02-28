import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="email-menu">
        <button class="reply" @click="emitEditEmail('reply')">
        Reply<i class="fas fa-reply"></i></button>

        <button class="unread" 
        @click="emitUpdateEmail('updated', 'isRead', false)">
        Switch to unread
        <i class="fas fa-envelope-open-text"></i></button>

        <button class="to-notes" @click="emitEditEmail('sentToNotes')">
        Send to notes<i class="far fa-lightbulb"></i></button>

        <button class="remove" @click="emitEditEmail('removed')">
        Remove <i class="fas fa-trash"></i></button>
    </section>
    `,
    methods: {
        emitEditEmail(eventName) {
            eventBus.$emit(eventName, this.emailId)
            this.$emit('clicked')
        },
        emitUpdateEmail(eventName, prop, val) {
            eventBus.$emit(eventName, prop, val, this.emailId)
            this.$emit('clicked')
        }
    },
    props: ['emailId']
}
