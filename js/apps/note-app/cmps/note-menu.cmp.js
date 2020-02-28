import {eventBus} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section>
    <button @click="togglePinned">PIN</button>
    <button @click="removeNote">DEL</button>
    </section>
    `,
    methods: {
        removeNote() {
            console.log('Sending eventBus note to delete:', this.noteId)
            eventBus.$emit('removeNote', this.noteId)
        },
        togglePinned() {
            // console.log('Sending eventBus note to toggle pinned:', this.noteId)
            eventBus.$emit('togglePinnedNote', this.noteId)
        }
    },
    props: ['noteId'],

}