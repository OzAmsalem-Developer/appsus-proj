
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
            <h2 class="info-txt">{{info.txt}}</h2>
            <ul v-if="info.todos">
                <li v-for="(todo, idx) in info.todos" class="todo-txt">
                {{todo.txt}}
                 </li>
            </ul>
        </section>
    `,
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