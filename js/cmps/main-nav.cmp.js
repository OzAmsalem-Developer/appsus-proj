export default {
    template: `
    <section class="main-nav">
        <router-link to="/email" @click.native="$emit('clicked')" exact class="nav-link">
        <img src="img/icons/mail-app.png">
        Email
        </router-link>
        <router-link to="/note" @click.native="$emit('clicked')" class="nav-link">
        <img src="img/icons/note-app.png">
        Keep
        </router-link>
        <router-link to="/book" @click.native="$emit('clicked')" class="nav-link">
        <img src="img/icons/book-app.png">
        Books
         </router-link>
         <router-link to="/" @click.native="$emit('clicked')" exact class="nav-link">
         <i class="home-icon fas fa-home"></i>
         Home
         </router-link>
        <router-link to="/about" @click.native="$emit('clicked')" class="nav-link">
        <img src="img/icons/about-us.png">
        About
        </router-link>
    </section>
    `
}