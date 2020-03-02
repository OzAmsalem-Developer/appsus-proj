import { eventBus, EVENT_MESSAGE } from '../../../services/eventBus.service.js'
import { bookService } from '../../../services/book.service.js'
import { utilService } from '../../../services/util.service.js'

export default {
    template: `
    <section class="review-add">
        <form @submit.prevent="addReview">
                 <div class="stars-date">
                 <div class="rate">
                          <span @click="setRate(1)" :class="review.starClasses[0]"></span>
                          <span @click="setRate(2)" :class="review.starClasses[1]"></span>
                          <span @click="setRate(3)" :class="review.starClasses[2]"></span>
                          <span @click="setRate(4)" :class="review.starClasses[3]"></span>
                          <span @click="setRate(5)" :class="review.starClasses[4]"></span>
                          </div>
                    <input type="date" ref="date" class="date-input" v-model="review.date">
                    </div>
            <input type="text" v-model="review.name" ref="userName" placeholder="Type your name" class="user-name">
            <textarea v-model="review.txt" placeholder="Type your review. Everything you can think of"
             class="free-txt" cols="30" rows="5"></textarea>
             <button type="submit" class="btn">Submit</button>
        </form>
    </section>
    `
    ,
    data() {
        return {
            review: {
                name: 'Book Reader',
                rate: 0,
                date: utilService.getFormattedNowDate(),
                txt: null,
                starClasses: new Array(5).fill('far fa-star')
            },
        }
    },
    methods: {
        setRate(rate) {
            this.review.rate = rate;
            this.review.starClasses = this.review.starClasses.map((clas, idx) => {
                return (idx + 1 <= rate) ? 'fa fa-star' : 'far fa-star'
            })
        },
        addReview() {
            bookService.addReview(this.bookId, this.review)
                .then(() => {
                    eventBus.$emit(EVENT_MESSAGE, {
                        txt: 'Book review added successfully !'
                    })
                })
                .catch(() => {
                    eventBus.$emit(EVENT_MESSAGE, {
                        txt: 'Failed. Review didnt added'
                    })
                })
            this.$emit('submitted')
        }
    },
    mounted() {
        this.$refs.userName.focus()
    },
    props: ['bookId']
}