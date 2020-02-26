import {utilService} from '../services/util.service.js'
import {storageService} from '../services/storage.service.js'

export const emailService = {
    getEmails,
}

const EMAIL_KEY = 'emails'
const emailsDB = storageService.load(EMAIL_KEY) || _createEmails()


function getEmails() {
    return Promise.resolve(emailsDB)
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
