import {eventBus, EVENT_REMOVE_NOTE, EVENT_NOTE_PINNED, EVENT_NOTE_COLOR} 
from '../../../services/eventBus.service.js'
import colorSelect from '../cmps/note-color-select.cmp.js'

export default {
    template: `
    <section class="note-menu">
    <button class="note-menu-btn" @click="togglePinned"><i class="fas fa-thumbtack"></i></button>
    <div class="note-color-btn-container">
        <button class="note-color-btn note-menu-btn" ><i class="fas fa-palette"></i></i></button>
        <color-select class="color-select" @colorChanged="changeNoteColor"></color-select>
    </div>
    <button class="note-menu-btn" @click="editNote"><i class="fas fa-edit"></i></button>
    <button class="note-menu-btn" @click="removeNote"><i class="fas fa-trash-alt"></i></button>
    </section>
    `,
    methods: {
        removeNote() {
            eventBus.$emit(EVENT_REMOVE_NOTE, this.noteId)
        },
        togglePinned() {
            eventBus.$emit(EVENT_NOTE_PINNED, this.noteId)
        },
        editNote() {
            this.$emit('openEdit')
        },
        changeNoteColor(color) {
            let newColor = '#' + color
            console.log('I will change the color:', newColor)
            eventBus.$emit(EVENT_NOTE_COLOR, this.noteId, newColor)
        }
    },
    props: ['noteId'],
    components: {
        colorSelect
    }
}