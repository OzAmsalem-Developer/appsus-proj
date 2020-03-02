export default {
    template: `
<section class="book-preview">
<router-link class="a-router" :to="'/book/'+book.id">
    <img :src="book.thumbnail" alt="book-image"/>
    </router-link>
    <router-link class="a-router" :to="'/book/'+book.id">
    <h4 class="book-title">{{book.title}}</h4>
    </router-link>
    <div class="price">{{priceForDisplay}}</div>
</section>
    `,
    computed: {
        priceForDisplay() {
            const code = this.book.listPrice.currencyCode
            const currency = (code === 'USD')? '$' : (code === 'ILS')? '₪' : '€'
            return currency + this.book.listPrice.amount
        }
    },
    props:['book']
}