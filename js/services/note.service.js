import { utilService } from '../services/util.service.js'
import { storageService } from '../services/storage.service.js'

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
    note.isPinned = !note.isPinned
    storageService.store(NOTE_KEY, notesDB)
    // console.log('notesDB:', notesDB)
}

function changeColorNote(noteId, newColor) {
    const note = _getNoteById(noteId)
    note.style.backgroundColor = newColor
    storageService.store(NOTE_KEY, notesDB)
    // console.log('Note new Color', note.style.backgroundColor)
    // console.log('notesDB:', notesDB)
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
                txt: 'testing..'
            },
            style: {
                backgroundColor: '#fdfdfd'
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
                backgroundColor: '#fdfdfd'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteVideo',
            noteType: 'video',
            isPinned: false,
            info: {
                video: 'https://www.youtube.com/embed/c2ScKSMGvtc',
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
                backgroundColor: '#fdfdfd'
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
                backgroundColor: '#fdfdfd'
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
                backgroundColor: '#fdfdfd'
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
                    { txt: 'edit notes', isComplete: false, doneAt: null },
                    { txt: 'Todos edit', isComplete: true, doneAt: 187111111 },
                    { txt: 'change note bg color', isComplete: false, doneAt: 187111 }
                ]
            },
            style: {
                backgroundColor: '#fdfdfd'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteImg',
            noteType: 'img',
            isPinned: false,
            info: {
                img: 'https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif',
            },
            style: {
                backgroundColor: '#fdfdfd'
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
                backgroundColor: '#fdfdfd'
            }
        },
        {
            id: utilService.makeId(),
            type: 'noteVideo',
            noteType: 'video',
            isPinned: false,
            info: {
                video: 'https://www.youtube.com/embed/pbMwTqkKSps',
            },
            style: {
                backgroundColor: '#fdfdfd'
            }

        },
    ]

    storageService.store(NOTE_KEY, notes)
    return notes
}
