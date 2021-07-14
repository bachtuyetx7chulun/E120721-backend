import nodeSchedule from 'node-schedule';
import { crawlQueue } from '../bull/bull.init';

// TODO: Crawl website per 30 minutes and save to realtime-db
const jobs = nodeSchedule.scheduleJob('00 30 * * *', () => {
    crawlQueue.add({ name: 'crawlPerDay' });
});
