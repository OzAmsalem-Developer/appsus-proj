import { eventBus, EVENT_UPDATE_NOTE } from '../../../services/eventBus.service.js'
export default {
    template: `
    <section class="note-edit">
            <input v-model="editVal" 
            @keyup.enter="updateNote"
            @keyup.esc="cloeEdit"
            class="note-edit-input">
            </input>
            <div class="note-edit-btn-container">
                <button class="note-edit-btn"
                @click="updateNote">Update</button>
                <button class="note-edit-btn"
                @click="cloeEdit">Cancel</button>
            </div>
    </section>
    `,
    data() {
        return {
            editVal:(this.note.noteType === 'todos') ?
            this.note.info.title: this.note.info[this.note.noteType]
        }
    },
    methods: {
        cloeEdit() {
            this.$emit('closeEdit')
        },
        updateNote() {
            this.note.info[this.note.noteType] = this.editVal
            const newNote = JSON.parse(JSON.stringify(this.note))
            eventBus.$emit(EVENT_UPDATE_NOTE, newNote)
            this.cloeEdit()
        }
    },
    // DESTROYED: editVal
    props: ['note']
}