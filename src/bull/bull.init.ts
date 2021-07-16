import Queue from 'bull';
import { crawlPerDay, crawlDetail } from './Jobs/crawl.job';
import { watchAction } from '../utils/log.util';

const crawlQueue = new Queue('crawlCovidDatas');

crawlQueue.process(async (job) => {
    const { data } = job;
    const { jobName } = data;

    switch (jobName) {
        case 'crawlPerDay':
            const valuePerDay = await crawlPerDay();
            valuePerDay
                ? watchAction(
                      'Update database - Branch days',
                      valuePerDay,
                      'days'
                  )
                : watchAction('Something went wrong', valuePerDay, 'days');
            break;
        case 'crawlDetail':
            const valueOverview = await crawlDetail();
            valueOverview
                ? watchAction(
                      'Update database - Branch overviews',
                      valueOverview,
                      'overviews'
                  )
                : watchAction(
                      'Something went wrong',
                      valueOverview,
                      'overviews'
                  );
            break;
    }
});

crawlQueue.on('failed', (job, err) => {
    console.log(job);
    console.log(err);
});

export { crawlQueue };
