import nodeSchedule from 'node-schedule';
import axios from 'axios';

// TODO: Crawl website per 30 minutes and save to realtime-db
const jobs = nodeSchedule.scheduleJob('*/30 * * * *', () => {
    console.log(1);
});
