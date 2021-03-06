import { noteText, noteImg, noteTodos, noteVideo } from '../template.service.js'
import noteMenu from '../cmps/note-menu.cmp.js'
import noteEdit from '../cmps/note-edit.cmp.js'

export default {
    template: `
    <section class="note-preview">
        <div class="note-type-container" :style="{ backgroundColor: noteBgColor }">
            <component :is="note.type"
            :class="note.type"
            :note="note">
            </component>
            <note-menu :note="note" @openEdit="toggleEdit">
            </note-menu>
            <note-edit :note="note" v-if="isEdit" @closeEdit="closeEdit">
            </note-edit>
        </div>
    </section>
    `,
    data() {
        return {
            isEdit: false
        }
    },
    methods: {
        openEdit() {
            this.isEdit = true
        },
        closeEdit() {
            this.isEdit = false
        },
        toggleEdit() {
            this.isEdit = !this.isEdit
        }
    },
    computed: {
        noteBgColor() {
            return this.note.style.backgroundColor
        }
    },
    components: {
        noteMenu,
        noteEdit,
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
    },
    props: ['note']
}