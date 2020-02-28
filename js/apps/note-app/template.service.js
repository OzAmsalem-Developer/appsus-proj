
export const noteText = {
    template: `
        <section class="note-text">
            <h1>{{info.txt}}</h1>
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
            <h1>{{info.txt}}</h1>
            <ul>
            <li v-for="(todo, idx ) in info.todos">
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
        <iframe width="560" height="315" 
        :src="info.video" 
        frameborder="0" allow="accelerometer; autoplay; 
        encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>
            <img :src="info.img" />
        </section>
    `,
    props: ['info'],
}