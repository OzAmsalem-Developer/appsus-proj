import {utilService} from '../services/util.service.js'
import {storageService} from '../services/storage.service.js'

const NOTE_KEY = 'notes'
// const notesDB = storageService.load(NOTE_KEY) || _createSamplesEmails() // CreateSampleNote!!!!!

export const noteService = {
    getNotes,
    getNoteById,
}

// To Do: createNewNote, updateNote
// To Do: _createSamplesNotess, _createNote

function getNotes() {
    return Promise.resolve(notesDB)
}

function getNoteById(noteId) {
    const note = notesDB.find(note => note.id === noteId)
    return Promise.resolve(note)
}

// function createNewEmail(emailInfo) {
//     const email = {
//         id: utilService.makeId(),
//         from: emailInfo.from,
//         subject: emailInfo.subject,
//         body: emailInfo.body,
//         isRead: false,
//         sentAt: Date.now(),
//         boxes: emailInfo.boxes
//     }
//     if (email.boxes.draft) email.isRead = true
//     emailsDB.unshift(email)
//     storageService.store(EMAIL_KEY, emailsDB)
// }


// function updateEmail(emailId, prop, val) {
//     const email = emailsDB.find(email => email.id === emailId)
//     email[prop] = val
//     storageService.store(EMAIL_KEY, emailsDB)
// }



//Private


// Samples data! to move to new service

// function _createSamplesEmails() {
//     const fromNames = ['Rami', 'Oz', 'Guy', 'Ran', 'Daniel', 'Yaron', 'Nadav', 'Omer']
//     const emails = fromNames.map(_createEmail)
//     storageService.store(EMAIL_KEY, emails)
//     return emails
// }

// function _createEmail(from = utilService.createWord(6)) {
//     return {
//         id: utilService.makeId(),
//         from: from,
//         subject: utilService.makeLorem(50),
//         body: utilService.makeLorem(utilService.getRandom(10, 150)),
//         isRead: false,
//         sentAt: Date.now(),
//         boxes: {
//             inbox: true,
//             sentBox: false,
//             draft: false,
//             star: false,
//             note: false
//         }
//     }
// }
