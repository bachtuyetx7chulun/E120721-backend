import { NextFunction, Request, Response } from 'express';
import database from '../configs/db';
import { crawlDetail, crawlPerDay } from '../bull/Jobs/crawl.job';
import { parseArray, parseCurrentTime } from '../utils/parse.util';
import { getAsyncCovidData, getAsyncCovidDetail } from '../utils/crawl.util';

export const getAllDatas = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await (await database.ref('covids/days').once('value')).val();
    return res.json(data);
};

export const crawlPerDays = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
            if (parseCurrentTime() == currentCovidData.time.date) {
                await database
                    .ref('covids/days/' + currentCovidData.time.date)
                    .set({
                        details: [{ ...currentCovidData }],
                        total: parseInt(currentCovidData.data.total),
                        latestUpdate: currentCovidData.time.text,
                    });
            }
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

        return res.json({
            time: new Date(),
            status: 'called',
        });
    } catch (error) {
        next(error);
    }
};

export const crawlDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // TODO: find covid record in the database with the same day
        const url = 'https://ncov.moh.gov.vn/web/guest/trang-chu';
        const dimension = await getAsyncCovidDetail(url);

        // TODO: Overide all records in the firebase database realtime
        await database
            .ref('covids/overviews/' + parseCurrentTime())
            .set(dimension);

        return res.json({
            time: new Date(),
            status: 'called',
        });
    } catch (error) {
        next(error);
    }
};
