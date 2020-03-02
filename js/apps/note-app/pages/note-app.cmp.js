import { noteService } from '../../../services/note.service.js'
import { eventBus } from '../../../services/eventBus.service.js'
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

        eventBus.$on('removeNote', this.removeNote)
        eventBus.$on('togglePinnedNote', this.togglePinnedNote)
        eventBus.$on('addTodo', this.updateNote)
        eventBus.$on('isTodoComplete', this.updateNote)
        eventBus.$on('updateNote', this.updateNote)
        eventBus.$on('changeColorNote', this.changeTodoColor)
        eventBus.$on('removeTodo', this.removeTodo)
    },
    destroyed() {
        eventBus.$off('togglePinnedNote', this.togglePinnedNote)
    }
}