export default {
    template: `
    <section class="main-nav">
        <router-link to="/" exact class="nav-link">
        Home
        </router-link>
        <router-link to="/email" exact class="nav-link">
        Email
        </router-link>
        <router-link to="/note" class="nav-link">
        Notes
        </router-link>
        <router-link to="/book" class="nav-link">
        Books
         </router-link>
        <router-link to="/about" class="nav-link">
        About
        </router-link>
    </section>
    `
}