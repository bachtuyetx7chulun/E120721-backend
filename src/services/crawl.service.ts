import { CronJob } from 'cron';
import axios from 'axios';
import { HOST_NAME } from '../configs/index';

// TODO: Crawl website per 30 minutes and save to realtime-db
const dataCrawlJob = new CronJob('00 */15 * * * *', async () => {
    await axios.get(`https://e120721.herokuapp.com/api/v1/crawl`);
});

const overviewCrawlJob = new CronJob('00 */30 * * * *', async () => {
    await axios.get(`https://e120721.herokuapp.com/api/v1/overview`);
});

dataCrawlJob.start();
overviewCrawlJob.start();
