// import { templateService } from '../template.service.js'
import { noteText, noteImg } from '../template.service.js'

export default {
    template: `
    <section class="note-preview">
        <component :is="note.type"
                    :info="note.info">
        </component>
    </section>
    `,
    data() {
        return {
       

        }
    },
    components: {
        noteText, 
        noteImg
    },
    props: ['note']
}