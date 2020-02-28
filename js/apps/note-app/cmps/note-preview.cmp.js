// import { templateService } from '../template.service.js'
import { noteText, noteImg, noteTodos, noteVideo } from '../template.service.js'
import noteMenu from '../cmps/note-menu.cmp.js'

export default {
    template: `
    <section class="note-preview">
        <component :is="note.type"
                    :class="note.type"
                    :info="note.info">
        </component>
        <note-menu :noteId="note.id">
        </note-menu>
    </section>
    `,
    data() {
        return {


        }
    },
    components: {
        noteMenu,
        noteText,
        noteImg,
        noteTodos,
        noteVideo,
    },
    props: ['note']
}