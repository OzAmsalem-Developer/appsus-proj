import bookPreview from './book-preview.cmp.js'

export default {
    template: `
    <section v-if="books" class="book-list">
    <h2>Our great books:</h2>
    <div class="cards-container">
            <book-preview class="book-card" v-for="book in books"
             :book="book" :key="book.id">
            </book-preview>
        </div>
    </section>`
    ,
    components: {
        bookPreview
    },
    props:['books']
}