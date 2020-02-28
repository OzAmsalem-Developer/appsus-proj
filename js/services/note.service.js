import { utilService } from '../services/util.service.js'
import { storageService } from '../services/storage.service.js'

const NOTE_KEY = 'notes'
const notesDB = storageService.load(NOTE_KEY) || _createSamplesNotes()

export const noteService = {
    getNotes,
    getNoteById,
    createNote,
}

function getNotes() {
    return Promise.resolve(notesDB)
}

function getNoteById(noteId) {
    const note = notesDB.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function createNote(noteInfo) {
    const note = {
        id: utilService.makeId(),
        type: noteInfo.type,
        isPinned: noteInfo.isPinned,
        info: {
            txt: noteInfo.info.txt,
            img: noteInfo.info.img,
            video: noteInfo.info.video,
            todos: noteInfo.info.todos,
        }
    }
    // if (email.boxes.draft) email.isRead = true
    notesDB.unshift(note)
    storageService.store(NOTE_KEY, notesDB)
    console.log(notesDB)
}


// function updateEmail(emailId, prop, val) {
//     const email = emailsDB.find(email => email.id === emailId)
//     email[prop] = val
//     storageService.store(EMAIL_KEY, emailsDB)
// }



//Private

// Samples data! to move to new service

function _createSamplesNotes() {
    const notes = [
        {
            id: utilService.makeId(),
            type: 'noteText',
            isPinned: false,
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteTodos',
            isPinned: false,
            info: {
                txt: 'Things to do:',
                todos: [
                    { txt: 'Do that', doneAt: null },
                    { txt: 'Do this', doneAt: 187111111 }
                ]
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteImg',
            isPinned: false,
            info: {
                img: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Avatar_flower.png',
                // title: 'Me playing Mi'
            },
            // style: {
            //     backgroundColor: '#00d'
            // }
        },
        // {
        //     id: utilService.makeId(),
        //     type: 'noteVideo',
        //     isPinned: false,
        //     info: {
        //         video: 'https://www.youtube.com/embed/c2ScKSMGvtc',
        //     },

        // },
    ]

    storageService.store(NOTE_KEY, notes)
    return notes
}

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
