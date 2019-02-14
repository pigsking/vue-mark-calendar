module.exports = {
    title: 'Calendar',
    base: '/calendar',
    description: 'A calendar marker component for vuejs',
    dest: './dist/calendar',
    sidebar: false,
    displayAllHeaders: true,
    head: [
        ['link', { rel: 'icon', href: './favicon.ico' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        serviceWorker: {
            updatePopup: true
        },
        nav: [
            {
                text: 'github',
                link: 'https://github.com/allenou/calendar'
            }
        ]
    }
}
