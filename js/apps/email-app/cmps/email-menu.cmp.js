import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="email-menu">
        <button class="reply" @click="emitEditEmail('reply')">
        <i class="menu-icon fas fa-reply"></i><span class="menu-item-txt">Reply</span></button>

        <button class="unread" 
        @click="emitUpdateEmail('updated', 'isRead', false)">
        <i class="menu-icon fas fa-envelope"></i>Mark as unread</button>
        <button class="to-notes" @click="emitEditEmail('sentToNotes')">
        <i class="menu-icon far fa-lightbulb"></i>Send to notes</button>

        <button class="remove" @click="emitEditEmail('removed')">
         <i class="menu-icon fas fa-trash"></i>Remove</button>
    </section>
    `,
    methods: {
        emitEditEmail(eventName) {
            eventBus.$emit(eventName, this.emailId)
            this.$emit('clicked')
        },
        emitUpdateEmail(eventName, prop, val) {
            eventBus.$emit(eventName, prop, val, this.emailId)
            eventBus.$emit('message', {txt: 'Email marked as unread'})
            this.$emit('clicked')
            this.$emit('emailUnread')
        }
    },
    props: ['emailId']
}
