import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="note-menu">
    <button class="note-menu-btn" @click="togglePinned"><i class="fas fa-thumbtack"></i></button>
    <button class="note-menu-btn" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
    </section>
    `,
    methods: {
        removeNote() {
            console.log('Sending eventBus note to delete:', this.noteId)
            eventBus.$emit('removeNote', this.noteId)
        },
        togglePinned() {
            // console.log('Sending eventBus note to toggle pinned:', this.noteId)
            eventBus.$emit('togglePinnedNote', this.noteId)
        }
    },
    props: ['noteId'],

}