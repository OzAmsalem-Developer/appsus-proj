// import { templateService } from '../template.service.js'
import { noteText, noteImg, noteTodos, noteVideo } from '../template.service.js'
import noteMenu from '../cmps/note-menu.cmp.js'

export default {
    template: `
    <section class="note-preview">
        <div class="note-type-container">
        <component :is="note.type"
                    :class="note.type"
                    :note="note">
        </component>
        <note-menu :noteId="note.id">
        </note-menu>
        </div>
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