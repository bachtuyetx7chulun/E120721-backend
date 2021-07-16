module.exports = {
    apps: [
        {
            name: 'app',
            script: './app/index.js',
            instances: 'max',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'cron',
            script: './app/services/crawl.service.js',
            instances: 'max',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
