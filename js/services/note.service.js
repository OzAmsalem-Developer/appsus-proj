import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
import {emailService} from './email.service.js'

const NOTE_KEY = 'notes'
const notesDB = storageService.load(NOTE_KEY) || _createSamplesNotes()

export const noteService = {
    getNotes,
    createNote,
    removeNote,
    togglePinnedNote,
    changeColorNote,
    updateNote,
    removeTodo,
    sendToMail
}

function getNotes() {
    return Promise.resolve(notesDB)
}

function createNote(noteInfo) {
    const note = {
        id: utilService.makeId(),
        type: noteInfo.type,
        noteType: noteInfo.noteType,
        isPinned: noteInfo.isPinned,
        info: {
            title: noteInfo.info.title,
            txt: noteInfo.info.txt,
            img: noteInfo.info.img,
            video: noteInfo.info.video,
            todos: noteInfo.info.todos,
        },
        style: {
            backgroundColor: '#fdfdfd'
        }
    }
    notesDB.unshift(note)
    storageService.store(NOTE_KEY, notesDB)
    return Promise.resolve()
}

function removeNote(noteId) {
    const idx = _getNoteByIndex(noteId)
    notesDB.splice(idx, 1)
    storageService.store(NOTE_KEY, notesDB)
}

function togglePinnedNote(noteId) {
    const note = _getNoteById(noteId)
    setTimeout(() => {
        note.isPinned = !note.isPinned
        storageService.store(NOTE_KEY, notesDB)
    }, 500)
}

function changeColorNote(noteId, newColor) {
    const note = _getNoteById(noteId)
    const idx = _getNoteByIndex(noteId)
    const noteCopy = JSON.parse(JSON.stringify(note))
    noteCopy.style.backgroundColor = newColor
    notesDB.splice(idx, 1, noteCopy)
    storageService.store(NOTE_KEY, notesDB)
}

// Updated the note with a deep copy 
function updateNote(note) {
    const idx = _getNoteByIndex(note.id)
    notesDB.splice(idx, 1, note)
    storageService.store(NOTE_KEY, notesDB)
    return Promise.resolve()
}

function removeTodo(note, todoIdx) {
    note.info.todos.splice(todoIdx, 1)

    const idx = _getNoteByIndex(note.id)
    notesDB.splice(idx, 1, note)

    storageService.store(NOTE_KEY, notesDB)
    return Promise.resolve()
}

function sendToMail(note) {
    let emailBody = note.info[note.noteType] 
    if (note.noteType === 'todos') {
        emailBody = note.info.title + '  '
        let todosText = note.info.todos.map((todo, idx) => {
            return idx+1 + '. ' + todo.txt + '. '
        }).join('')
        emailBody += todosText
    }
    const email = {
        from: 'My Notes',
        subject: 'From my notes keeper',
        body: emailBody,
        isRead: false,
        sentAt: Date.now(),
        boxes: {
            inbox: true,
            sentBox: false,
            draft: false,
            star: note.isPinned,
            note: true
        }
    }
    return emailService.createNewEmail(email)
}

//Private

function _getNoteByIndex(noteId) {
    const idx = notesDB.findIndex(note => note.id === noteId)
    return idx
}

function _getNoteById(noteId) {
    const note = notesDB.find(note => note.id === noteId)
    return note
}

function _createSamplesNotes() {
    const notes = [
        {
            id: utilService.makeId(),
            type: 'noteText',
            noteType: 'txt',
            isPinned: false,
            info: {
                txt: 'call Esteban Jimenez'
            },
            style: {
                backgroundColor: '#ffff88'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteImg',
            noteType: 'img',
            isPinned: false,
            info: {
                img: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Avatar_flower.png',
                title: 'cool artwork'
            },
            style: {
                backgroundColor: '#fdfdfd'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteTodos',
            noteType: 'todos',
            isPinned: false,
            info: {
                title: 'groceries:',
                todos: [
                    { txt: 'milk', isComplete: true, doneAt: null },
                    { txt: 'toothpaste', isComplete: false, doneAt: 187111111 },
                    { txt: 'bamba', isComplete: false, doneAt: 187111 }
                ]
            },
            style: {
                backgroundColor: '#aaffee'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteVideo',
            noteType: 'video',
            isPinned: false,
            info: {
                video: 'c2ScKSMGvtc',
            },
            style: {
                backgroundColor: '#fdfdfd'
            }

        },
        {
            id: utilService.makeId(),
            type: 'noteText',
            noteType: 'txt',
            isPinned: false,
            info: {
                txt: 'password: aligator_3'
            },
            style: {
                backgroundColor: '#ccff99'
            }
        },

        {
            id: utilService.makeId(),
            type: 'noteImg',
            noteType: 'img',
            isPinned: false,
            info: {
                img: 'https://media.giphy.com/media/kz6cm1kKle2MYkHtJF/giphy.gif',
            },
            style: {
                backgroundColor: '#ffcc88'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteImg',
            noteType: 'img',
            isPinned: false,
            info: {
                img: 'https://main-designyoutrust.netdna-ssl.com/wp-content/uploads/2018/09/Bugaboos.jpg',
                title: 'spain'
            },
            style: {
                backgroundColor: '#ddbbff'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteTodos',
            noteType: 'todos',
            isPinned: false,
            info: {
                title: 'Sprint:',
                todos: [
                    { txt: 'Todos CRUD', isComplete: true, doneAt: null },
                    { txt: 'Change Note color', isComplete: true, doneAt: 187111111 },
                    { txt: 'Add Sound template', isComplete: false, doneAt: 187111 }
                ]
            },
            style: {
                backgroundColor: '#ffcc88'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteImg',
            noteType: 'img',
            isPinned: false,
            info: {
                img: 'https://media.giphy.com/media/1wqZ9MmXDPWLPuwwYI/giphy.gif',
            },
            style: {
                backgroundColor: '#ff8888'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteText',
            noteType: 'txt',
            isPinned: true,
            info: {
                txt: 'Noa wedding 08.03'
            },
            style: {
                backgroundColor: '#ddbbff'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteVideo',
            noteType: 'video',
            isPinned: false,
            info: {
                video: 'pbMwTqkKSps',
            },
            style: {
                backgroundColor: '#ffff88'
            }
        },
    ]

    storageService.store(NOTE_KEY, notes)
    return notes
}
