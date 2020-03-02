import {eventBus, EVENT_REMOVE_NOTE, EVENT_NOTE_PINNED, EVENT_NOTE_COLOR} 
from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="note-menu">
    <button class="note-menu-btn" @click="togglePinned"><i class="fas fa-thumbtack"></i></button>
    <div class="note-color-btn-container">
        <button class="note-color-btn note-menu-btn" ><i class="fas fa-palette"></i></i></button>
        <div class="note-colors-palette-container">
            <div class="note-colors-palette palette-white" @click="changeNoteColor('fdfdfd')"></div>
            <div class="note-colors-palette palette-red" @click="changeNoteColor('ff8888')"></div>
            <div class="note-colors-palette palette-orange" @click="changeNoteColor('ffcc88')"></div>
            <div class="note-colors-palette palette-yellow" @click="changeNoteColor('ffff88')"></div>
            <div class="note-colors-palette palette-green" @click="changeNoteColor('ccff99')"></div>
            <div class="note-colors-palette palette-blue" @click="changeNoteColor('aaffee')"></div>
            <div class="note-colors-palette palette-purple" @click="changeNoteColor('ddbbff')"></div>
        </div>
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

}