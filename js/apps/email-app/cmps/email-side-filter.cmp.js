export default {
    template: `
    <section class="email-side-filter">
        <ul class="side-filter">
            <li @click="emitFilter" class="filter-item">Inbox <span class="unread">1</span></li>
            <li @click="emitFilter" class="filter-item">Starred</li>
            <li @click="emitFilter" class="filter-item">Sent Mail</li>
            <li @click="emitFilter" class="filter-item">Drafts</li>
        </ul>
    </section>
    `
}