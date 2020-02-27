import notePreview from '../cmps/note-preview.cmp.js'

export default {
    template: `
    <section class="note-list">
        <h2>NoteList</h2>
        <note-preview>
        </note-preview>
    </section>
    `,
    components: {
        notePreview
    }
}