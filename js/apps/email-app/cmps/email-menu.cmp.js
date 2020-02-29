import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="email-menu">
        <button class="reply" @click="emitEditEmail('reply')">
        <i class="fas fa-reply"></i>Reply</button>

        <button class="unread" 
        @click="emitUpdateEmail('updated', 'isRead', false)">
        <i class="fas fa-envelope-open-text"></i>Switch to unread</button>

        <button class="to-notes" @click="emitEditEmail('sentToNotes')">
        <i class="far fa-lightbulb"></i>Send to notes</button>

        <button class="remove" @click="emitEditEmail('removed')">
         <i class="fas fa-trash"></i>Remove</button>
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
