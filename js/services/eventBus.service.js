export const EMAILS_FILTERED_EV = 'emailsFiltered'
export const eventBus = new Vue()

// Event names

// Email App events
export const EVENT_ADD_BOOK = 'addBook'
export const EVENT_MESSAGE = 'message'
export const EVENT_CLOSE_MESSAGE = 'closeMessage'
export const EVENT_EMAIL_REMOVED = 'emailRemoved'
export const EVENT_EMAIL_UPDATED = 'emailUpdated'
export const EVENT_EMAIL_TO_NOTES = 'emailSentToNotes'
export const EVENT_EMAIL_REPLY = 'replyToEmail'
export const EVENT_EMAIL_STARRED = 'toggleEmailStar'

// Note App events
export const EVENT_ADD_TODO = 'addTodo'
export const EVENT_REMOVE_TODO = 'removeTodo'
export const EVENT_TOGGLE_TODO = 'toggleTodoComplete'
export const EVENT_UPDATE_NOTE = 'updateNote'
export const EVENT_REMOVE_NOTE = 'removeNote'
export const EVENT_NOTE_PINNED = 'toggleNotePinned'
export const EVENT_NOTE_COLOR = 'changeNoteBGcolor'

