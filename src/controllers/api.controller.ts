import { NextFunction, Request, Response } from 'express';
import { crawlQueue } from '../bull/bull.init';
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

export const crawlPerDay = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        crawlQueue.add({ jobName: 'crawlPerDay' });
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
        crawlQueue.add({ jobName: 'crawlDetail' });

        return res.json({
            time: new Date(),
            status: 'called',
        });
    } catch (error) {
        next(error);
    }
};
