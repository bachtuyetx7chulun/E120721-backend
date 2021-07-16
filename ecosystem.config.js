module.exports = {
    apps: [
        {
            name: '@app/api',
            script: './app/index.js',
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: '@app/cron',
            script: './app/services/crawl.service.js',
        },
    ],
};
