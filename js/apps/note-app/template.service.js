import { eventBus, EVENT_ADD_TODO, EVENT_REMOVE_TODO, EVENT_TOGGLE_TODO } from '../../services/eventBus.service.js'

export const noteText = {
    template: `
        <section class="note-template note-text">
            <p class="info-txt blabla">{{note.info.txt}}</p>
        </section>
    `,
    props: ['note'],
}

export const noteImg = {
    template: `
        <section class="note-template note-img">
            <h2 v-if="note.info.title" class="info-txt">{{note.info.title}}</h2>
            <img :src="note.info.img" />
        </section>
    `,
    props: ['note'],
}

export const noteTodos = {
    template: `
        <section class="note-template note-todos" v-if="note">
            <h2 class="info-txt">{{note.info.title}}</h2>
            <ul v-if="note.info.todos" class="todos-ul">
                <li v-for="(todo, idx) in note.info.todos" 
                @click="toggleTodoComplete(idx)" 
                :class=" {'todo-complete' : todo.isComplete, 'todo-uncomplete' : !todo.isComplete}"
                class="todo-li">
                {{todo.txt}}
                <button @click.stop="removeTodo(idx)"
                class="todo-remove-btn">
                    <i class="fas fa-times"></i>
                </button>
                 </li>
            </ul>
            <input @keyup.enter="addTodo" 
            v-model="nextTodo" 
            class="next-todo-input"
            placeholder="I need to do..." ></input>
        </section>
    `,
    data() {
        return {
            nextTodo: '',
        }
    },
    methods: {
        addTodo() {
            const todo = {
                txt: this.nextTodo,
                isComplete: false,
            }
            if (!this.note.info.todos) this.note.info.todos = []
            this.note.info.todos.push(todo)
            const newNote = this.createNoteCopy()
            eventBus.$emit(EVENT_ADD_TODO, newNote)
            this.nextTodo = ''
        },
        removeTodo(idx) {
            const newNote = this.createNoteCopy()
            eventBus.$emit(EVENT_REMOVE_TODO, newNote, idx)
        },
        toggleTodoComplete(TodoIdx) {
            this.note.info.todos[TodoIdx].isComplete = !this.note.info.todos[TodoIdx].isComplete
            const newNote = this.createNoteCopy()
            eventBus.$emit(EVENT_TOGGLE_TODO, newNote)

        },
        createNoteCopy() {
            return JSON.parse(JSON.stringify(this.note))
        }
    },
    props: ['note'],
}

export const noteVideo = {
    template: `
        <section class="note-template note-video">
            <h2 v-if="note.info.title" class="info-txt">{{note.info.title}}</h2>

            <iframe width="100%"
            :src="note.info.video" 
            frameborder="0" allow="accelerometer; autoplay; 
            encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </section>
    `,
    props: ['note'],
}