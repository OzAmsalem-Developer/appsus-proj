import { emailService } from '../../../services/email.service.js'
import { utilService } from '../../../services/util.service.js'


export default {
    template: `
    <section class="email-compose">
        <form @submit.prevent="sendEmail" class="compose-form">
        
            <div class="compose-header">
            <span>New Message</span>
            <button @click.prevent="$emit('emailCreated')" class="close-btn"><i class="fas fa-times"></i></button>
            </div>

            <input class="form-txt" required type="text" v-model.trim="email.to" placeholder="To:" />
            <input class="form-txt" type="text" placeholder="Cc:" />
            <input class="form-txt" type="text" placeholder="Bcc:" />
            <input class="form-txt" required type="text" v-model.trim="email.subject" placeholder="Subject:" />          
            <textarea ref="emailBody" class="form-txt" v-model="email.body" rows="10"></textarea>

            <div class="form-btns">
                <button class="send-btn"><i class="far fa-paper-plane"></i></button>
                <button class="delete-btn" @click.prevent="removeDraft"><i class="fas fa-trash"></i></button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            email: {
                from: 'me',
                to: null,
                subject: null,
                body: '',
                boxes: {
                    inbox: false,
                    sentBox: false,
                    draft: false,
                    star: false,
                    note: false
                }
            },
            removed: false
        }
    },
    methods: {
        sendEmail() {
            if (!this.email.to || !this.email.subject) return
            const to = this.email.to.toLowerCase()

            if (to === 'me' || to === 'myself') this.email.boxes.inbox = true
            else if (to === 'notes' || to === 'note') {
                this.email.boxes.note = true
            }
            
            this.email.boxes.sentBox = true //Anyway
            
            
            emailService.createNewEmail(this.email)
            .then((email) => { 
                this.$emit('emailCreated')
                if (email.boxes.note) emailService.sendToNotes(email.id)
            })
        },
        removeDraft() {
            this.removed = true
            this.$emit('emailCreated')
        }
    },
    destroyed() {
        const boxes = this.email.boxes
        if (!boxes.inbox && !boxes.sentBox && !this.removed) {
            this.email.boxes.draft = true
            if (!this.email.to) this.email.to = 'Drafts'
            if (!this.email.subject) this.email.subject = 'Draft email'
            emailService.createNewEmail(this.email)
        }  if (this.isReply) {this.$router.push('/email')}
    },
    created() {
        const emailId = this.$route.params.emailId
        if (this.isReply) {
            emailService.getEmailById(emailId)
                .then((emailToReply) => {
                    this.email.boxes.inbox = true
                    this.email.to = emailToReply.from
                    this.email.subject = 'Re: ' + emailToReply.subject
                    this.email.body = '<---------------------Reply To---------------------->' +
                    '  From: ' + emailToReply.from + ',  Sent At: ' 
                    + utilService.getFormattedDate(emailToReply.sentAt) + ',  '
                     + emailToReply.subject + '     ' + emailToReply.body + 
                     '<--------------------------------------------------->' 
                })
        }
    },
    mounted() {
        this.$refs.emailBody.focus()
    },
    props: ['isReply']
}