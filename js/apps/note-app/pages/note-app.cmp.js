import { noteService } from '../../../services/note.service.js'
import noteCreate from '../cmps/note-create.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    template: `
    <section class="note-app">
        <h1>Notes App</h1>
        <note-create></note-create>
        <note-list :notes="notes"></note-list>
    </section>
    `,
    data() {
        return {
            notes: null,
            no: null,

        }
    },
    components: {
        noteList,
        noteCreate,
    },
    methods: {
        createNote() {
        },
        changeNoteType(type) {
            this
        }
    },
    created() {
        noteService.getNotes()
            .then(notes => {
                this.notes = notes
            })
    }
}