import { eventBus } from '../../../services/eventBus.service.js'
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
            editVal: this.note.info[this.note.noteType]

        }
    },
    methods: {
        updateNote() {
            console.log('I will update the note!')
            this.note.info[this.note.noteType] = this.editVal
            const newNote = JSON.parse(JSON.stringify(this.note))
            console.log(newNote)
            eventBus.$emit('updateNote', newNote)
        },
        cloeEdit() {
            console.log('Update canceled')
            this.$emit('closeEdit')
        }
    },
    // DESTROYED: editVal
    props: ['note']
}


// noteInfo {
//     type: txt,
//     val: val,
//     id: noteId
// }

// {{note.info[noteType]}}