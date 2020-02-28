import notePreview from '../cmps/note-preview.cmp.js'


export default {
    template: `
    <section class="note-list">
        <note-preview v-for="note in notes"
        :note="note"
        :key="note.id">
        </note-preview>
    </section>
    `,
    components: {
        notePreview
    },
    props: ['notes']
}