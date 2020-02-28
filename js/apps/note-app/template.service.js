
export const noteText = {
    template: `
        <section>
            <h1>{{info.txt}}</h1>
        </section>
    `,
    props: ['info'],
}

export const noteImg = {
    template: `
        <section>
            <img :src="info.img" />
        </section>
    `,
    props: ['info'],
}