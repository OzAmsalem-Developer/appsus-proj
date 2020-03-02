import searchSuggest from './search-suggest.cmp.js'
import {bookService} from '../../../services/book.service.js'
export default {
template: `
    <section class="book-filter">

            <div class="search-book">
                <input  class="name-input" type="text" 
                @input="emitFilter(); getBooksForSuggest(filterBy.byName);" 
                v-model="filterBy.byName" 
                placeholder="Enter name to filter by"/>

                <search-suggest v-if="googleBooks" 
                :query="filterBy.byName"
                @added="googleBooks = null"
                :suggestionBooks="googleBooks">
                </search-suggest>
            </div>
            
            
            <input class="price-input" type="text" 
            @input="emitFilter" 
            v-model.number="filterBy.fromPrice" 
            placeholder="From price"/>

            <input class="price-input" type="text" 
            @input="emitFilter" v-model.number="filterBy.toPrice" 
            placeholder="To price"/>
      
    </section>
`,
data() {
    return {
            filterBy: {
                byName: '',
                fromPrice: null,
                toPrice: null
            },
            googleBooks: null
        }
    },
methods: {
        emitFilter() {
            this.$emit('filtered', this.filterBy)
        },
        getBooksForSuggest() {
            if(this.filterBy.byName.length >= 2) {
                bookService.getBooksForSuggest(this.filterBy.byName)
                .then((bookNames) => {
                    this.googleBooks = bookNames
                })
            } else {
                this.googleBooks = null
            }
        }
    },
    components: {
        searchSuggest
    }
}