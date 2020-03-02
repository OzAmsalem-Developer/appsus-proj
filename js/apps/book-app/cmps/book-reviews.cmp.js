import { eventBus, EVENT_MESSAGE } from '../../../services/eventBus.service.js'
import {bookService} from '../../../services/book.service.js'

export default {
    template: `
 <section v-if="reviews" class="book-reviews">
    <div class="review" v-for="(review,idx) in reviews">
        <p class="name">{{review.name}}</p> <small class="date">{{review.date}}</small>
        <div class="rate">
        <span :class="getClass(review, 0)"></span>
        <span :class="getClass(review, 1)"></span>
        <span :class="getClass(review, 2)"></span>
        <span :class="getClass(review, 3)"></span>
        <span :class="getClass(review, 4)"></span>
        </div>
        <div class="review-txt">
            <p>{{review.txt}}</p>
        </div>
        <button class="exit-btn" @click="removeReview(idx,bookId)"><i class="far fa-times-circle"></i></button>
    </div>
 </section>
            `
    ,
    methods: {
        getClass(review, starIdx) {
            return review.starClasses[starIdx]
        },
        removeReview(reviewIdx, bookId) {
            bookService.removeReview(reviewIdx, bookId)
            .then(() => {
                eventBus.$emit(EVENT_MESSAGE, {
                    txt: 'Book review removed successfully !'
                })
            })
        }
    },
    props:['reviews','bookId']
}