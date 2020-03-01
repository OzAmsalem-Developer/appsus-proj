import {utilService} from '../../../services/util.service.js'
import longText from '../../../cmps/long-text.cmp.js'

export default {
    template: `
    <section v-if="email" class="email-preview"
    :class="emailClass">
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
    computed: {
        emailClass() {
            return (this.email.isRead) ? 'email-read' : 'email-unread'
        },
        hourToShow() {
            return utilService.getFormattedHour(this.email.sentAt)
        },
        fromName() {
            const letter = this.email.from.slice(0, 1).toUpperCase()
            return (window.innerWidth <= 750)? letter : this.email.from
        },
        nameColor() {
            let color = utilService.getRandomColor()
            return (window.innerWidth <= 750)?   { background: color }   : ''
        }
    },
    components: {
        longText
    },
    props: ['email']
}
