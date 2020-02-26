import {utilService} from '../services/util.service.js'
import {storageService} from '../services/storage.service.js'

export const emailService = {
    getEmails,
    updateEmail,
}

const EMAIL_KEY = 'emails'
const emailsDB = storageService.load(EMAIL_KEY) || _createEmails()


function getEmails() {
    return Promise.resolve(emailsDB)
}

// Updated the emailsDB and saves it to localstorage. 
// We currently don't return anything so we need to keep this in mind
function updateEmail(emailId, prop, val) {
    const email = emailsDB.find(email => email.id === emailId)
    email[prop] = val
    storageService.store(EMAIL_KEY, emailsDB)
}

//Private

function _createEmails() {
    const fromNames = ['Rami', 'Oz', 'Guy', 'Ran', 'Daniel', 'Yaron', 'Nadav', 'Omer']
    const emails = fromNames.map(_createEmail)
    storageService.store(EMAIL_KEY, emails)
    return emails
}

function _createEmail(from = utilService.createWord(6)) {
    return {
        id: utilService.makeId(),
        from: from,
        subject: utilService.makeLorem(50),
        body: utilService.makeLorem(utilService.getRandom(10, 150)),
        isRead: false,
        sentAt: Date.now()
    }
}
