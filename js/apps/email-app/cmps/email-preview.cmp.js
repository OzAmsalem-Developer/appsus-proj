import {utilService} from '../../../services/util.service.js'
import longText from '../../../cmps/long-text.cmp.js'
import {eventBus, EVENT_EMAIL_STARRED} from '../../../services/eventBus.service.js'

export default {
    template: `
    <section v-if="email" class="email-preview"
    :class="emailClass">
        <button @click.stop="emitToggle" class="star-btn">
        <i :class="starClass"></i></button>
        <span class="email-preview-from" :style="nameColor">
        {{fromName}}</span>
        
      
        <div class="email-preview-content">
        <span class="email-preview-subject">
        {{email.subject}}
        </span> 
         -  
        <long-text class="email-preview-body" 
        :txt="email.body" length="50">
        </long-text>
    </div>
        
    <span class="email-sent-at">{{hourToShow}}</span>


       
    </section>
    `,
    methods: {
        emitToggle() {
            eventBus.$emit(EVENT_EMAIL_STARRED, this.email.id)
        }
    },
    computed: {
        emailClass() {
            return (this.email.isRead) ? 'email-read' : 'email-unread'
        },
        hourToShow() {
            const emailDate = new Date(this.email.sentAt)
            const today = new Date()
            if(today.setHours(0,0,0,0) == emailDate.setHours(0,0,0,0)) 
            return moment(this.email.sentAt).format('LT')
            else return moment.unix(this.email.sentAt).format("MM/DD/YYYY");
        },
        fromName() {
            const letter = this.email.from.slice(0, 1).toUpperCase()
            return (window.innerWidth <= 750)? letter : this.email.from
        },
        nameColor() {
            let color = utilService.getRandomColor()
            return (window.innerWidth <= 750)?   { background: color }   : ''
        },
        starClass() {
            return (this.email.boxes.star)? 'fas fa-star starred' : 'far fa-star'
        }

    },
    components: {
        longText
    },
    props: ['email']
}
