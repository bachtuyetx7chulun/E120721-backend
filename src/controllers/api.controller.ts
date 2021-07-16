import { NextFunction, Request, Response } from 'express';
import { crawlDetail, crawlPerDay } from '../bull/Jobs/crawl.job';
import database from '../configs/db';

export const getAllDatas = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const limit = req.query.limit || 30;
    const data = await (await database.ref('covid').once('value')).val();
    const dataLength = data.length;
    const jsonData = data.slice(
        dataLength - parseInt(limit.toString()),
        dataLength
    );

    return res.json(jsonData);
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
