export default {
    template: `
    <section class="home-page">
        <section class="hero">
            <div class="hero-img">
                <h1 class="hero-title">APPSUS</h1>
                <a href="#appsus-features" class="hero-cta-btn">Get started</a>

            </div>
        </section>
        <div id="appsus-features" class="gallery-header">Appsus features</div>
        <section class="gallery-apps">
            <router-link to="/email" class="app-gallery-link">
                <div class="gallery-card gallery-card-email"></div>
                <button class="app-cta-btn">Email</button>
            </router-link>
            <router-link to="/note" class="app-gallery-link">
                <div class="gallery-card gallery-card-note"></div>
                <button class="app-cta-btn">Keep</button>
            </router-link>
            <router-link to="/book" class="app-gallery-link">
                <div class="gallery-card gallery-card-book"></div>
                <button class="app-cta-btn">Books</button>
            </router-link>
        </section>
    </section>
    `
}



