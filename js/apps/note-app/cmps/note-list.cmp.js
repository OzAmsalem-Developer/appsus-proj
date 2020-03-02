import notePreview from '../cmps/note-preview.cmp.js'


export default {
    template: `
    <section class="note-list">
        <note-preview v-for="note in notes"
        :note="note"
        :key="note.id"
        v-if="note.isPinned">
        </note-preview>
        
        <note-preview v-for="note in notes"
        :note="note"
        :key="note.id"
        v-if="!note.isPinned">
        </note-preview>
    </section>
    `,
    components: {
        notePreview
    },
    props: ['notes']
}