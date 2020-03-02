import { bookService } from '../services/book.service.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import bookReviews from '../cmps/book-cmps/book-reviews.cmp.js'
import longText from '../cmps/long-text.cmp.js'

export default {
    template: `
    <section v-if="book" class="book-details">
        <div class="categories">Categories: {{categories}}</div>
        <div class="details">

            <section class="main-info">
                <img class="book-img" :src="book.thumbnail" alt="book-image"/>
                <div class="book-info">
                    <h2 class="book-title">{{book.subtitle}}</h2>
                    <p><span class="title">By (author)</span> | <span>{{authors}}</span> <br/>
                    <span class="title">Language</span> | {{language}} <br/> 
                    <span class="title">Reading length</span> | {{pageCount}} <br/>
                    <span class="title">Published at</span> | {{publishedDate}} </p>
                    <long-text class="desc" :txt="book.description"></long-text>
                </div>
            </section>
           
            <div class="payment-container">
                <div class="price-container">
                    <span class="price" :class="priceClasses">{{priceForDisplay}}</span>
                </div>
                <div class="ensure-signs">
                    <div class="shipping">
                        <img src="img/icons/free-shipping.png" alt="free-shipping"/>
                        <h3>Free shipping worldwide!</h3>
                    </div>
                    <div class="secure">
                        <img src="img/icons/secure-payment.png" alt="secure-payment"/>
                        <h3>Secure and safe payment</h3>
                    </div>
                </div>
            </div>
        </div>

        <button class="btn" v-if="!isShowAddReview" @click="isShowAddReview = !isShowAddReview">Add Review</button>
        <transition name="fade">
        <review-add @submitted="isShowAddReview = false" :bookId="book.id" v-if="isShowAddReview"></review-add>
        </transition>
            <book-reviews v-if="book.reviews" :bookId="book.id" :reviews="book.reviews"></book-reviews>
        <button class="btn" @click="goBack">Back</button>
    </section>`
    ,
    data() {
        return {
            book: null,
            isShowAddReview: false
        }
    },
    computed: {
        pageCount() {
            const pageCount = this.book.pageCount
            const length = (pageCount > 500) ? 'Long Reading'
                : (pageCount > 200) ? 'Decent Reading'
                    : (pageCount < 100) ? 'Light Reading' : ''
            return pageCount + ' Pages. ' + length
        },
        publishedDate() {
            const publishedYear = this.book.publishedDate
            const yearsDiff = new Date().getFullYear() - publishedYear
            const publishedStatus = (yearsDiff > 10) ? 'Veteran Book' : (yearsDiff <= 1) ? 'New!' : ''
            return publishedYear + '. ' + publishedStatus
        },
        priceClasses() {
            let classes;
            const price = this.book.listPrice.amount
            classes = (price < 20) ? 'low-price' : (price > 150) ? 'hight-price' : ''
            if (this.book.listPrice.isOnSale) classes += ' on-sale'
            return classes
        },
        priceForDisplay() {
            const code = this.book.listPrice.currencyCode
            const currency = (code === 'USD') ? '$' : (code === 'ILS') ? '₪' : '€'
            return currency + this.book.listPrice.amount
        },
        authors() {
            return this.book.authors.join(', ')
        },
        categories() {
            return this.book.categories.join(', ')
        },
        language() {
            return (this.book.language === 'he') ? 'Hebrew' : (this.book.language === 'en') ? 'English'
                : 'Spanish'
        }
    },
    methods: {
        getBook() {
            const bookId = this.$route.params.bookId
            bookService.getBookById(bookId)
                .then(book => {
                    this.book = book
                })
        },
        goBack() {
            this.$router.go(-1)
        }
    },
    watch: {
        '$route'() {
            this.book = null
            this.getBook()
        }
    },
    components: {
         longText,
         reviewAdd,
         bookReviews
    },
    created() {
        this.getBook()
    }
}