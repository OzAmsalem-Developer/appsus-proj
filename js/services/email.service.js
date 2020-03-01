import { utilService } from '../services/util.service.js'
import { storageService } from '../services/storage.service.js'
import { noteService } from '../services/note.service.js'

const EMAIL_KEY = 'emails'
const emailsDB = storageService.load(EMAIL_KEY) || _createSamplesEmails()

export const emailService = {
    getEmails,
    updateEmail,
    createNewEmail,
    getEmailById,
    sendToNotes,
    removeEmail
}

function getEmails() {
    return Promise.resolve(emailsDB)
}

function getEmailById(emailId) {
    const email = emailsDB.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function removeEmail(emailId) {
    const idx = emailsDB.findIndex(email => email.id === emailId)
    const fromName = emailsDB[idx].from
    emailsDB.splice(idx, 1)
    storageService.store(EMAIL_KEY, emailsDB)
    return Promise.resolve(fromName)
}

// Reuse func - for all updates. When need to return - promise
function updateEmail(prop, val, emailId) {
    const foundEmail = emailsDB.find(email => email.id === emailId)
    const emailIdx = emailsDB.findIndex(email => email.id === emailId)

    // Make a deep copy and splice for vue reactivation
    const emailCopy = JSON.parse(JSON.stringify(foundEmail))
    emailCopy[prop] = val
    emailsDB.splice(emailIdx, 1, emailCopy)
    storageService.store(EMAIL_KEY, emailsDB)
    return Promise.resolve(emailsDB)
}

function sendToNotes(emailId) {
    const foundEmail = emailsDB.find(email => email.id === emailId)
    const boxes = foundEmail.boxes
    for (const prop in boxes) {
        boxes[prop] = false
    }
    let noteTxt = 'Email from: ' + foundEmail.from + '  -  '
    noteTxt += (foundEmail.body.length > 0)? foundEmail.body  : foundEmail.subject
    
    const note = {
            type: 'noteText',
            noteType: 'txt',
            isPinned: boxes.star,
            info: {
                txt: noteTxt,
                img: '',
                video: '',
                title: '',
                todos: null
            }
    }
    noteService.createNote(note)
    boxes.note = true
    storageService.store(EMAIL_KEY, emailsDB)
    return Promise.resolve()
}

function createNewEmail(emailInfo) {
    const email = {
        id: utilService.makeId(),
        from: emailInfo.from,
        subject: emailInfo.subject,
        body: emailInfo.body,
        isRead: false,
        sentAt: Date.now(),
        boxes: emailInfo.boxes
    }
    emailsDB.unshift(email)
    storageService.store(EMAIL_KEY, emailsDB)
    
    return Promise.resolve(email)
}

//Private functions

// Samples data! to move to new service
function _createSamplesEmails() {
    const fromNames = ['Rami', 'Oz', 'Guy', 'Ran', 'Daniel', 'Yaron', 'Nadav',
        'Omer', 'Rami', 'Oz', 'Guy', 'Ran', 'Daniel', 'Yaron', 'Nadav', 'Omer', 'Rami',
        'Oz', 'Guy', 'Ran', 'Daniel', 'Yaron', 'Nadav', 'Omer']
    const emails = fromNames.map(_createEmail)
    storageService.store(EMAIL_KEY, emails)
    return emails
}

function _createEmail(from = utilService.createWord(6)) {
    return {
        id: utilService.makeId(),
        from: from,
        subject: utilService.makeLorem(25),
        body: utilService.makeLorem(utilService.getRandom(100, 650)),
        isRead: false,
        sentAt: Date.now(),
        boxes: {
            inbox: true,
            sentBox: false,
            draft: false,
            star: false,
            note: false
        }
    }
}
