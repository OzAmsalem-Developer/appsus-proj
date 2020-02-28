import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section>
    <button @click="removeNote">DEL</button>
    </section>
    `,
    methods: {
        removeNote() {
            console.log('Sending eventBus note to delete:', this.noteId)
            eventBus.$emit('removeNote', this.noteId)
        }
    },
    props: ['noteId'],

}