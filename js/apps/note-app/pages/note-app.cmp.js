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
            console.log('NOTE APP - I want to remove note:', noteId)
        },
        togglePinnedNote(noteId) {
            noteService.togglePinnedNote(noteId)
            console.log('Changing pinned state:', noteId)
        }

    },
    created() {
        noteService.getNotes()
            .then(notes => {
                this.notes = notes
            })


        eventBus.$on('removeNote', this.removeNote)
        eventBus.$on('togglePinnedNote', this.togglePinnedNote)
    },
    destroyed() {
        eventBus.$off('togglePinnedNote', this.togglePinnedNote)
    }
}

// container