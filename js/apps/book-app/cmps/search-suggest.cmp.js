import { eventBus, EVENT_ADD_BOOK } from '../../../services/eventBus.service.js'

export default {
    template: `
    <transition name="fade">
        <section class="search-suggest">
            <div v-for="book in suggestionBooks" class="suggest-field">
                {{book.name}}
            <button @click="emitBookAdded(book.id)" class="add-book"><i class="fas fa-plus-circle"></i></button>
            </div>
        </section>
    </transition>
    `,
    methods: {
        emitBookAdded(bookId) {
            eventBus.$emit(EVENT_ADD_BOOK, bookId, this.query)
            this.$emit('added')
        }
    },
    props:['suggestionBooks', 'query']
}