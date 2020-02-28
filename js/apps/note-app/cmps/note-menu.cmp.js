export default {
    template: `
    <section>
    
    <button @click="removeNote(noteId)">DEL</button>
    </section>
    `,
    methods: {
        removeNote(noteId) {
            console.log('Deleting note with ID:', noteId)
        }
    },
    props: ['noteId'],

}