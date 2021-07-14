import puppeteer from 'puppeteer';
import { getAsyncCovidData, getAsyncCovidDetail } from '../../utils/crawl.util';
import { parseArray, parseCurrentTime } from '../../utils/parse.util';
import database from '../../configs/db';

export const crawlPerDay = async () => {
    try {
        // TODO: Setup time start for service
        // TODO: find covid record in the database with the same day

        const dimension = await getAsyncCovidData(
            'https://ncov.moh.gov.vn/web/guest/dong-thoi-gian'
        );
        const currentCovidData = parseArray(dimension);
        const latestRecordCovid = await (
            await database
                .ref('covids/days/' + parseCurrentTime())
                .once('value')
        ).val();

        // TODO: Check record => if it's not exist => Create new a record
        // * If you wanna clean code => push url to config file

        // ? If the latest record is not exist => create a new record with the same day
        if (!latestRecordCovid) {
            await database
                .ref('covids/days/' + currentCovidData.time.date)
                .set({
                    details: [{ ...currentCovidData }],
                    total: parseInt(currentCovidData.data.total),
                    latestUpdate: currentCovidData.time.text,
                });
        } else {
            // ? Update count
            if (currentCovidData.time.text !== latestRecordCovid.latestUpdate) {
                let updateData = {
                    total:
                        latestRecordCovid.total + currentCovidData.data.total,
                    latestUpdate: currentCovidData.time.text,
                    details: [...latestRecordCovid.details, currentCovidData],
                };

                database
                    .ref('covids/days/' + currentCovidData.time.date)
                    .set(updateData, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
            }
        }

        console.log(`Database is updated`);
        return true;
    } catch (error) {
        console.log(`Something went wrong 😂`);
        return false;
    }
};

export const crawlDetail = async () => {
    try {
        // TODO: find covid record in the database with the same day
        const url = 'https://ncov.moh.gov.vn/web/guest/trang-chu';
        const dimension = await getAsyncCovidDetail(url);

        // TODO: Overide all records in the firebase database realtime
        await database
            .ref('covids/overview/' + parseCurrentTime())
            .set(dimension);

        console.log(`Database is updated`);
        return true;
    } catch (error) {
        console.log(`Something went wrong 😂`);
        return false;
    }
};
