import { Request, Response, NextFunction } from 'express';
import database from '../configs/db';
import axiosInstance from '../configs/axios';
import axios from 'axios';
import puppeteer from 'puppeteer';
import { getCovidData } from '../utils/crawl.util';
import { parseArray } from '../utils/parse.util';

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

export const crawlDatas = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { data } = await axios.get(
        'https://api.covid19api.com/dayone/country/vietnam/'
    );
    database.ref('covid').set(data, (error) => {
        if (error) {
            throw error;
        }
    });

    return res.json({
        crawled: true,
        status: 'success',
    });
};

export const updateData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { data } = await axios.get(
        'https://api.covid19api.com/dayone/country/vietnam/'
    );
    const dataToday = data[data.length - 1];
    const latestTime = new Date(dataToday.Date).getDay();
    const currentTime = new Date().getDay();
    switch (currentTime) {
        case latestTime:
            console.log(data.length);
        // Check time and update data
        default:
            break;
    }

    return res.json({
        updated: true,
        status: 'success',
    });
};

export const crawlPupetteer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // database.ref('covid').set({}, (error) => {
    //     if (error) {
    //         throw error;
    //     }
    // });
    try {
        const arr = Array.from(Array(50).keys());
        const crawlUrl =
            'https://ncov.moh.gov.vn/web/guest/dong-thoi-gian?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_nf7Qy5mlPXqs&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_nf7Qy5mlPXqs_delta=10&p_r_p_resetCur=false&_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_nf7Qy5mlPXqs_cur=';
        let urls = arr.map((e) => {
            return crawlUrl + e;
        });

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const url = crawlUrl + 0;
        await page.goto(crawlUrl + 0);
        const dimensions = await getCovidData(url, page, 1);

        browser.close();
        return res.json({
            crawled: true,
            status: 'success',
            covids: parseArray(dimensions),
        });
    } catch (error) {
        next(error);
    }
};