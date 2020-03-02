import {eventBus, EVENT_MESSAGE} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="email-menu">
        <button class="reply" @click="emitEditEmail('replyToEmail')">
        <i class="menu-icon fas fa-reply"></i><span class="menu-item-txt">Reply</span></button>

        <button class="unread" 
        @click="emitUpdateEmail('emailUpdated', 'isRead', false)">
        <i class="menu-icon fas fa-envelope"></i>Mark as unread</button>
        <button class="to-notes" @click="emitEditEmail('emailSentToNotes')">
        <i class="menu-icon far fa-lightbulb"></i>Send to notes</button>

        <button class="remove" @click="emitEditEmail('emailRemoved')">
         <i class="menu-icon fas fa-trash"></i>Remove</button>
    </section>
    `,
    methods: {
        emitEditEmail(eventName) {
            eventBus.$emit(eventName, this.emailId)
            if (eventName === 'emailSentToNotes') eventBus.$emit(EVENT_MESSAGE, {txt: 'Email sent to notes'})
            this.$emit('clicked')
        },
        emitUpdateEmail(eventName, prop, val) {
            eventBus.$emit(eventName, prop, val, this.emailId)
            eventBus.$emit(EVENT_MESSAGE, {txt: 'Email marked as unread'})
            this.$emit('clicked')
            this.$emit('emailUnread')
        }
    },
    props: ['emailId']
}
