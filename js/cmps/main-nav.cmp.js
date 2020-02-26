export default {
    template: `
    <section class="main-nav">
        <router-link to="/" exact>
            Home
        </router-link>
        |
        <router-link to="/email" exact>
            Email
        </router-link>
        |
        <router-link to="/note">
            Notes
        </router-link>
        <router-link to="/book">
        |     Books
         </router-link>
        |
        <router-link to="/about">
        |   About
        </router-link>
    </section>
    `
}