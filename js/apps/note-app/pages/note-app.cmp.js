import noteList from '../cmps/note-list.cmp.js'

export default {
    template: `
    <section class="note-app">
        <h1>Notes App</h1>
        <note-list></note-list>
    </section>
    `,
    data() {
        return {
            notes: null,
        }
    },
    components: {
        noteList
    }
}