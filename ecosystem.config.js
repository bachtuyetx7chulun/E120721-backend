module.exports = {
    apps: [
        {
            name: 'Covid-app',
            script: './app/index.js',
        },
        {
            name: 'Covid-cron',
            script: './app/services/crawl.service.js',
        },
    ],
};
