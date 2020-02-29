import {eventBus} from '../../services/eventBus.service.js'

export const noteText = {
    template: `
        <section class="note-text">
            <h2 class="info-txt">{{note.info.txt}}</h2>
        </section>
    `,
    props: ['note'],
}

export const noteImg = {
    template: `
        <section class="note-img">
            <h2 v-if="note.info.title">{{note.info.title}}</h2>
            <img :src="note.info.img" />
        </section>
    `,
    props: ['note'],
}

export const noteTodos = {
    template: `
        <section class="note-todos">
            <h2>{{note.info.title}}</h2>
            <ul v-if="note.info.todos">
                <li v-for="(todo, idx) in note.info.todos">
                {{todo.txt}}
                 </li>
            </ul>
            <input @keyup.enter="addTodo" v-model="nextTodo" placeholder:></input>
        </section>
    `,
    data() {
        return {
            nextTodo: ''
        }
    },
    methods: {
        addTodo() {
            const todo = {
                txt: this.nextTodo,
            }
            if (!this.note.info.todos) this.note.info.todos = []
            this.note.info.todos.push(todo)
            const newNote = JSON.parse(JSON.stringify(this.note))
            eventBus.$emit('addTodo', newNote)
            this.nextTodo = ''

            // Add todo to the todos array
            // Deep Copy and update to the new note
            //emit change to note-app
            // not app
            // nexttodo = null

        }
    },
    props: ['note'],
}

export const noteVideo = {
    template: `
        <section class="note-video">
        <iframe width="280" height="158" 
        :src="note.info.video" 
        frameborder="0" allow="accelerometer; autoplay; 
        encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>
        </section>
    `,
    props: ['note'],
}