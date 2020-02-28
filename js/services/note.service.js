import { utilService } from '../services/util.service.js'
import { storageService } from '../services/storage.service.js'

const NOTE_KEY = 'notes'
const notesDB = storageService.load(NOTE_KEY) || _createSamplesNotes()

export const noteService = {
    getNotes,
    createNote,
    removeNote,
}

function getNotes() {
    return Promise.resolve(notesDB)
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

function removeNote(noteId) {
    const noteIdx = _getNoteByIndex(noteId)
    notesDB.splice(noteIdx, 1)
    storageService.store(NOTE_KEY, notesDB)
}


// function updateEmail(emailId, prop, val) {
//     const email = emailsDB.find(email => email.id === emailId)
//     email[prop] = val
//     storageService.store(EMAIL_KEY, emailsDB)
// }



//Private

function _getNoteByIndex(noteId) {
    const noteIdx = notesDB.findIndex(note => note.id === noteId)
    return noteIdx
}

function _getNoteById(noteId) {
    const note = notesDB.find(note => note.id === noteId)
    return note
}

// function _getNoteById(noteId) {
//     const note = notesDB.find(note => note.id === noteId)
//     return Promise.resolve(note)
// }

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
