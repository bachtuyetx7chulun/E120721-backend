import nodeSchedule from 'node-schedule';
import axios from 'axios';

// TODO: Crawl website per 30 minutes and save to realtime-db
const jobs1 = nodeSchedule.scheduleJob('00 */10 * * * *', () => {
    axios.get('https://e120721.herokuapp.com/api/v1/crawl');
});

const job2 = nodeSchedule.scheduleJob('00 */15 * * * *', () => {
    axios.get('https://e120721.herokuapp.com/api/v1/detail');
});
