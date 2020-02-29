import { noteService } from '../../../services/note.service.js'

export default {
    template: `
    <section class="note-create">
        <div class="cote-create-container">
        <input class="txt-input"
        v-model="connectedVal"
        :placeholder="placeholderTxt"
        @keyup.enter="createNote">
        
        <div class="note-type-btns"
            <button class="note-create-btn note-text-btn" @click="changeType('noteText')">
                <i class="far fa-comment"></i>
            </button>
            <button class="note-create-btn note-img-btn" @click="changeType('noteImg')">
                <i class="far fa-image"></i>
            </button>
            <button class="note-create-btn note-video-btn" @click="changeType('noteVideo')">
                <i class="fab fa-youtube"></i>
            </button>
            <button class="note-create-btn note-todo-btn" @click="changeType('noteTodos')">
                <i class="fas fa-list-ul"></i>
            </button>
        </div>
        </div>
    </section>
    `,
    data() {
        return {
            note: {
                type: 'noteText',
                noteType: 'txt',
                isPinned: false,
                info: null
            },
            connectedVal: null
        }
    },
    methods: {
        createNote() {
            const newNote = JSON.parse(JSON.stringify(this.note))
            const info = {
                txt: '',
                img: '',
                video: '',
                title: '',
                todos: null
            }
            if (this.note.noteType === 'todos') info.title = this.connectedVal
            else info[this.note.noteType] = this.connectedVal
            newNote.info = info
            noteService.createNote(newNote)
                .then(() => {
                    this.connectedVal = ''
                })
        },
        changeType(newType) {
            this.note.type = newType
            this.note.noteType = this.infoType
        }
    },
    computed: {
        infoType() {
            switch (this.note.type) {
                case 'noteText':
                    return 'txt'
                case 'noteImg':
                    return 'img'
                case 'noteVideo':
                    return 'video'
                case 'noteTodos':
                    return 'todos'
                default:
                    return 'txt'
            }
        },
        placeholderTxt() {
            if (this.note.type === 'noteText') {
                return 'What\'s on your mind...'
            } else if (this.note.type === 'noteImg') {
                return 'Enter image url...'
            } else if (this.note.type === 'noteVideo') {
                return 'Enter Youtube url...'
            } else if (this.note.type === 'noteTodos') {
                return 'Enter list title...'
            }
        }
    }
}


