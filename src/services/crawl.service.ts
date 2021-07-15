import nodeSchedule from 'node-schedule';
import axios from 'axios';

// TODO: Crawl website per 30 minutes and save to realtime-db
const jobs = nodeSchedule.scheduleJob('00 */15 * * * *', () => {
    axios.get('http://localhost:5000/api/v1/crawl');
});
