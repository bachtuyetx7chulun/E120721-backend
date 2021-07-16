import { NextFunction, Request, Response } from 'express';
import database from '../configs/db';
import { crawlDetail, crawlPerDay } from '../bull/Jobs/crawl.job';

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
        await crawlPerDay();
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
        await crawlDetail();
        return res.json({
            time: new Date(),
            status: 'called',
        });
    } catch (error) {
        next(error);
    }
};
