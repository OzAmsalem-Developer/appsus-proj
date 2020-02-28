import { noteService } from '../../../services/note.service.js'

export default {
    template: `
    <section class="note-create">
        <input class="txt-input"
        v-model="connectedVal"
        @keyup.enter="createNote">
        
        <div class="note-type-btns"
            <button class="note-text-btn" @click="changeType('noteText')">TXT</button>
            <button class="note-img-btn" @click="changeType('noteImg')">IMG</button>
            <button class="note-video-btn" @click="changeType('noteVideo')">VID</button>
            <button class="note-todo-btn" @click="changeType('noteTodos')">TODO</button>
        </div>
    </section>
    `,
    data() {
        return {
            note: {
                type: '',
                isPinned: false,
                info: null
            },
            connectedVal: null
        }
    },
    methods: {
        createNote() {
            const newNote = JSON.parse(JSON.stringify(this.note))
            console.log(this.note);
            const info = {
                txt: '',
                img: '',
                video: '',
                todos: ''
            }
            
            info[this.infoType] = this.connectedVal
            newNote.info = info
            noteService.createNote(newNote)
        },
        changeType(newType) {
            this.note.type = newType
        }
    },
    computed: {
        infoType() {
            switch (this.note.type) {
                case 'noteText':
                    return 'txt'
                case 'noteImg':
                    return 'img'
                case 'noteVdeo':
                    return 'video'
                case 'noteTodos':
                    return 'todos'
                default:
                    return 'txt'
            }
        }
    },
    created() {
        this.note.type = 'noteText'
    }
}


