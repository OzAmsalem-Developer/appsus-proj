import { eventBus } from '../../../services/eventBus.service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import {bookService} from '../../../services/book.service.js'

export default {
    template: `
    <section class="book-app">
        <book-filter @filtered="filterList"></book-filter>
        <book-list :books="booksToShow"></book-list>
    </section>
`,
    data() {
        return {
            filterBy: null,
            books: [],
            isShowBook: false
        }
    },
    methods: {
        filterList(filterBy) {
            this.filterBy = JSON.parse(JSON.stringify(filterBy)) 
        },
        addBook(googleBookId, query) {
            bookService.addGoogleBook(googleBookId, query)
            .then(() => {
                eventBus.$emit(EVENT_SHOW_MSG, {
                    txt: 'New book added !',
                    type: 'success',
                    idPath: googleBookId
                })
            })
            .catch(() => {
                eventBus.$emit(EVENT_SHOW_MSG, {
                    txt: 'Book already exist !',
                    type: 'error'
                })
            })
        }
    }, computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const fromPrice = (typeof this.filterBy.fromPrice !== 'number') ? 0 : this.filterBy.fromPrice
            const toPrice = (typeof this.filterBy.toPrice !== 'number') ? 9999 : this.filterBy.toPrice
            return this.books.filter(book => {
                return (book.title.includes(this.filterBy.byName) &&
                    (book.listPrice.amount >= fromPrice) &&
                    (book.listPrice.amount <= toPrice))
            })
        }
    },
    created() {
        bookService.query()
        .then((books) => {
            this.books = books
        })

        eventBus.$on(EVENT_ADD_BOOK, (googleBookId, query) => this.addBook(googleBookId, query))
    },
    components: {
        bookList,
        bookFilter
    }
}