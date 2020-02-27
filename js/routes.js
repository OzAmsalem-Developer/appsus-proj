import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import bookApp from './apps/book-app/pages/book-app.cmp.js'
import emailApp from './apps/email-app/pages/email-app.cmp.js'
import noteApp from './apps/note-app/pages/note-app.cmp.js'
import emailDetails from './apps/email-app/pages/email-details.cmp.js'

const routes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    { path: '/book', component: bookApp },
    { path: '/email:filter?', component: emailApp },
    { path: '/email/:emailId', component: emailDetails },
    { path: '/note', component: noteApp },
];

export default routes