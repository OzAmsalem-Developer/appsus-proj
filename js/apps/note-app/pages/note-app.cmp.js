import { noteService } from '../../../services/note.service.js'
import { eventBus, EVENT_REMOVE_NOTE, EVENT_NOTE_PINNED, EVENT_ADD_TODO ,
     EVENT_TOGGLE_TODO,  EVENT_UPDATE_NOTE, EVENT_REMOVE_TODO }
from '../../../services/eventBus.service.js'
import noteCreate from '../cmps/note-create.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    template: `
    <section class="note-app">
        <note-create class="container"></note-create>
        <note-list class="container" :notes="notes"></note-list>
    </section>
    `,
    data() {
        return {
            notes: null,

        }
    },
    components: {
        noteList,
        noteCreate,
    },
    methods: {
        removeNote(noteId) {
            noteService.removeNote(noteId)
        },
        togglePinnedNote(noteId) {
            noteService.togglePinnedNote(noteId)
        },
        updateNote(note) {
            noteService.updateNote(note)
        },
        removeTodo(note, idx) {
            noteService.removeTodo(note, idx)
        },
        changeTodoColor(noteId, newColor) {
            noteService.changeColorNote(noteId, newColor)
            // console.log('Note ID:', noteId, 'Note New Color:', newColor)
        }
    },
    created() {
        noteService.getNotes()
            .then(notes => {
                this.notes = notes
            })

        eventBus.$on(EVENT_REMOVE_NOTE, this.removeNote)
        eventBus.$on(EVENT_NOTE_PINNED , this.togglePinnedNote)
        eventBus.$on(EVENT_ADD_TODO, this.updateNote)
        eventBus.$on(EVENT_TOGGLE_TODO, this.updateNote)
        eventBus.$on( EVENT_UPDATE_NOTE, this.updateNote)
        eventBus.$on(EVENT_NOTE_COLOR, this.changeTodoColor)
        eventBus.$on(EVENT_REMOVE_TODO, this.removeTodo)
    },
    destroyed() {
        eventBus.$off(EVENT_NOTE_PINNED, this.togglePinnedNote)
    }
}