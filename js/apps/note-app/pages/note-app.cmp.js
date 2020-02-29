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

        // Currently not used | updateNote used instead
        // toggleTodoComplete(note) {
        //     // noteService.toggleTodoComplete(note)
        //     noteService.updateNote(note)
        // }

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
        // eventBus.$on('isTodoComplete', this.note.id, todoIdx)
    },
    destroyed() {
        eventBus.$off('togglePinnedNote', this.togglePinnedNote)
    }
}

// Object.toggleTodoComplete (note.service.js:64)
// at VueComponent.toggleTodoComplete (note-app.cmp.js:36)