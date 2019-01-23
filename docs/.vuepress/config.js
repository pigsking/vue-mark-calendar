module.exports = {
    title: 'Calendar',
    base: '/calendar',
    description: 'A calendar component for vuejs',
    dest: './dist',
    sidebar: false,
    displayAllHeaders: true,
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        serviceWorker: {
            updatePopup: true
        },
        nav: [
            // { text: 'API', link: '/api/' },
            {
                text: 'github',
                link: 'https://github.com/allenou/calendar'
            }
        ]
    }
}
