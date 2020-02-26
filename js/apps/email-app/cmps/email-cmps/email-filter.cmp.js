import searchBar from '../../../../cmps/search-bar.cmp.js'

export default {
    template: `
    <section class="email-filter">
        <search-bar @filtered="setFilter" 
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
            },
            filterBy: {}
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = {
                txt: filterBy.txt,
                isRead: filterBy.selectedOption
            }
        }
    },
    components: {
        searchBar
    }
}