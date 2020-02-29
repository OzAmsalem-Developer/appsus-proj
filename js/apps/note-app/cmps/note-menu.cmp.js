import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="note-menu">
    <button class="note-menu-btn" @click="togglePinned"><i class="fas fa-thumbtack"></i></button>
    <button class="note-menu-btn" @click=""><i class="fas fa-palette"></i></i></button>
    <button class="note-menu-btn" @click=""><i class="fas fa-edit"></i></button>
    <button class="note-menu-btn" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
    </section>
    `,
    methods: {
        removeNote() {
            eventBus.$emit('removeNote', this.noteId)
        },
        togglePinned() {
            eventBus.$emit('togglePinnedNote', this.noteId)
        }
    },
    props: ['noteId'],

}