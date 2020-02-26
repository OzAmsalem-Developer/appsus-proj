import searchBar from '../../../../cmps/search-bar.cmp.js'

export default {
    template: `
    <section class="email-filter">
        <search-bar @filtered="setFilter(filterBy)" :searchData=""></search-bar>
    </section>
    `
    ,
    data() {
        return {
            searchData: {
                placeholder: 'Search mail',
                selectOptions: ['All', 'Read', 'Unread']
            },
            filterBy: null
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