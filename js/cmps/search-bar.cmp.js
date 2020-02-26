export default {
    template: `
    <section class="search-bar">
        <h1>Email filter</h1>
    </section>
    `
    ,
    data() {
        return {
            filterBy: {
                txt: null,
                selectedOption: null
            }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', this.filterBy)
        }
    },
    props: ['searchData']
}