import Queue from 'bull';
import { crawlPerDay, crawlDetail } from './Jobs/crawl.job';

const crawlQueue = new Queue('crawlCovidDatas');

crawlQueue.process(async (job) => {
    const { data } = job;
    const { jobName } = data;

    switch (jobName) {
        case 'crawlPerDay':
            crawlPerDay();
            break;
        case 'crawlDetail':
            crawlDetail();
            break;
    }
});

crawlQueue.on('failed', (job, err) => {
    console.log(job);
    console.log(err);
});

export { crawlQueue };
