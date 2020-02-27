export default {
    template: `
    <section class="search-bar">

        <input type="text" class="search-txt"
        v-model="filterBy.txt"
        :placeholder="searchData.placeholder"
        @input="emitFilter" />

        <select class="search-select" 
        v-model="filterBy.selectedOption"
        @change="emitFilter">

            <option class="select-option"
             v-for="option in searchData.selectOptions">
            {{option}}
            </option>

        </select>
    </section>
    `
    ,
    data() {
        return {
            filterBy: {
                txt: '',
                selectedOption: 'All'
            }
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filtered', this.filterBy)
        }
    },
    watch: {
        'filterBy.selectedOption': {
            handler(newVal, oldVal) {
                this.$router.push('/email+' + newVal.toLowerCase())
                console.log(this.$route.params.filter);
                
            }
        } 
    },
    props: ['searchData']
}