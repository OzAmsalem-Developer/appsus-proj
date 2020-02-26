export default {
    template: `
    <section class="email-side-filter">
        <ul class="side-filter">
            <li @click="emitFilter('inbox')" class="filter-item">Inbox <span class="unread">{{unreadCount}}</span></li>
            <li @click="emitFilter('star')" class="filter-item">Starred</li>
            <li @click="emitFilter('sentBox')" class="filter-item">Sent Mail</li>
            <li @click="emitFilter('draft')" class="filter-item">Drafts</li>
        </ul>
    </section>
    `
    ,
    methods: {
        emitFilter(by) {
            this.$emit('filtered', by)
        }
    },
    props: ['unreadCount']
}