import { eventBus, EVENT_REMOVE_NOTE, EVENT_NOTE_PINNED, EVENT_NOTE_COLOR, EVENT_NOTE_TO_MAIL }
    from '../../../services/eventBus.service.js'
import colorSelect from '../cmps/note-color-select.cmp.js'

export default {
    template: `
    <section class="note-menu">
        <button class="note-menu-btn" :class="pinnedClass" @click="togglePinned"><i class="fas fa-thumbtack"></i></button>
        <div class="note-color-btn-container">
            <button class="note-color-btn note-menu-btn" ><i class="fas fa-palette"></i></i></button>
            <color-select class="color-select" @colorChanged="changeNoteColor"></color-select>
        </div>
        <button class="note-menu-btn" @click="sendNoteToMail"><i class="fas fa-envelope"></i></button>
        <button class="note-menu-btn" @click="editNote"><i class="fas fa-edit"></i></button>
        <button class="note-menu-btn" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
    </section>
    `,
    methods: {
        removeNote() {
            eventBus.$emit(EVENT_REMOVE_NOTE, this.note.id)
        },
        togglePinned() {
            eventBus.$emit(EVENT_NOTE_PINNED, this.note.id)
        },
        editNote() {
            this.$emit('openEdit')
        },
        changeNoteColor(color) {
            let newColor = '#' + color
            eventBus.$emit(EVENT_NOTE_COLOR, this.note.id, newColor)
        },
        sendNoteToMail() {
            eventBus.$emit(EVENT_NOTE_TO_MAIL, this.note)
        }
    },
    computed: {
        pinnedClass() {
            return (this.note.isPinned) ? 'pinned-note' : ''
        }
    },
    props: ['note'],
    components: {
        colorSelect
    }
}