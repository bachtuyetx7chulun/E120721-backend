import nodeSchedule from 'node-schedule';
import axios from 'axios';

// TODO: Crawl website per 30 minutes and save to realtime-db
const jobs = nodeSchedule.scheduleJob('00 */10 * * * *', () => {
    axios.get('https://e120721.herokuapp.com/api/v1/crawl');
});
