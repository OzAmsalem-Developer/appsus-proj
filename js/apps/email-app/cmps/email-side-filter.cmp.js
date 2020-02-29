export default {
    template: `
    <section class="email-side-filter">
        <ul class="side-filter">
            <li @click="emitFilter('inbox')" class="filter-item">
            <i class="filter-icon fas fa-inbox"></i>
            Inbox <span class="unread">
            {{countForDisplay.inbox}}
            </span></li>

            <li @click="emitFilter('star')" class="filter-item">
            <i class="filter-icon fas fa-star"></i>
            Starred <span class="unread">
            {{countForDisplay.star}}
            </span></li>

            <li @click="emitFilter('sentBox')" class="filter-item">
            <i class="filter-icon fas fa-share-square"></i>
            Sent Mail <span class="unread">
            {{countForDisplay.sentBox}}
            </span></li>

            <li @click="emitFilter('draft')" class="filter-item">
            <i class="filter-icon fab fa-firstdraft"></i>
            Drafts <span class="unread">
            {{countForDisplay.draft}}
            </span></li>

            <li @click="emitFilter('note')" class="filter-item">
            <i class="filter-icon far fa-lightbulb"></i>
            Notes <span class="unread">
            {{countForDisplay.note}}
            </span></li>
        </ul>
    </section>
    `
    ,
    methods: {
        emitFilter(by) {
            this.$emit('filtered', by)
        }
    },
    computed: {
        countForDisplay() {
            const countMap = this.unreadCount
            for (const prop in countMap) {
                if (countMap[prop] === 0) countMap[prop] = ''
            }
            return countMap
        }
    },
    props: ['unreadCount']
}