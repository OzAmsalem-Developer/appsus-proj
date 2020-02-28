export default {
    template: `
    <section class="email-side-filter">
        <ul class="side-filter">
            <li @click="emitFilter('inbox')" class="filter-item">
            Inbox <span class="unread">
            {{countForDisplay.inbox}}
            </span></li>

            <li @click="emitFilter('star')" class="filter-item">
            Starred <span class="unread">
            {{countForDisplay.star}}
            </span></li>

            <li @click="emitFilter('sentBox')" class="filter-item">
            Sent Mail <span class="unread">
            {{countForDisplay.sentBox}}
            </span></li>

            <li @click="emitFilter('draft')" class="filter-item">
            Drafts <span class="unread">
            {{countForDisplay.draft}}
            </span></li>

            <li @click="emitFilter('note')" class="filter-item">
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