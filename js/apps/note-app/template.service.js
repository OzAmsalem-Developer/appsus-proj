
export const noteText = {
    template: `
        <section class="note-text">
            <h2 class="info-txt">{{info.txt}}</h2>
        </section>
    `,
    props: ['info'],
}

export const noteImg = {
    template: `
        <section class="note-img">
            <img :src="info.img" />
        </section>
    `,
    props: ['info'],
}

export const noteTodos = {
    template: `
        <section class="note-todos">
            <h2>{{info.title}}</h2>
            <ul v-if="info.todos">
                <li v-for="(todo, idx) in info.todos">
                {{todo.txt}}
                 </li>
            </ul>
            <input @keyup.enter="addTodo" v-model="nextTodo"></input>
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
            // console.log('adding')
            if (!this.info.todos) this.info.todos = []
            this.info.todos.push(todo)
            const newNote = JSON.parse(JSON.stringify(this.info))
            console.log(newNote)


            // Add todo to the todos array
            // Deep Copy and update to the new note
            //emit change to note-app
            // not app
            // nexttodo = null

        }
    },
    props: ['info'],
}

export const noteVideo = {
    template: `
        <section class="note-video">
        <iframe width="280" height="158" 
        :src="info.video" 
        frameborder="0" allow="accelerometer; autoplay; 
        encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>
            <img :src="info.img" />
        </section>
    `,
    props: ['info'],
}