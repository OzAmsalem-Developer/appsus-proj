export default {
    template: `
    <section class="about-page">
        <div class="about-page-hero">
            <div class="about-page-main container">
                <h1 class="about-title">The Appsus Story</h1>
                <h2 class="about-subject">
                Challenged by a new framework & working together as a team  for the first time. </br>
                We will prevail.
                </h2>
                <h3 class="about-tech">
                <i class="fab fa-js-square"></i>
                <i class="fab fa-vuejs"></i>
                <i class="fab fa-css3-alt"></i>
                </h3>
                </div>
        </div>
        <div class="about-page-content container">
            <p class="about-page-par">
                We are proud to present our Coding Academy project for Sprint 3
                Februar 2020
            </p>
            <router-link to="/about/team">
            <button class="meet-team-btn" >Meet the team</button>
            </router-link>
        </div>
        <router-view></router-view>
    </section>
    `
}
