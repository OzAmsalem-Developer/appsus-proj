export default {
    template: `
    <section class="email-menu">
        <button class="reply" @click="$emit('reply')">
        Reply<i class="fas fa-reply"></i></button>

        <button class="unread" 
        @click="$emit('emailUpdated', 'isRead', false)">
        Switch to unread
        <i class="fas fa-envelope-open-text"></i></button>

        <button class="to-notes" @click="$emit('sentToNotes')">
        Send to notes<i class="far fa-lightbulb"></i></button>

        <button class="remove" @click="$emit('removed')">
        Remove <i class="fas fa-trash"></i></button>
    </section>
    `,
}
