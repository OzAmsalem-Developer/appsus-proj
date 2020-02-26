import searchBar from '../../../cmps/search-bar.cmp.js'
import {eventBus, EMAILS_FILTERED_EV} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section class="email-filter">
        <search-bar @filtered="emitFilter" 
        :searchData="searchData">
        </search-bar>
    </section>
    `
    ,
    data() {
        return {
            searchData: {
                placeholder: 'Search mail',
                selectOptions: ['All', 'Read', 'Unread']
            }
        }
    },
    methods: {
        emitFilter(filterBy) {
            // Set the correct names from the reusable search cmp
            const filter = {
                txt: filterBy.txt,
                readUnread: filterBy.selectedOption
            }
            eventBus.$emit(EMAILS_FILTERED_EV, filter)
        }
    },
    components: {
        searchBar
    }
}