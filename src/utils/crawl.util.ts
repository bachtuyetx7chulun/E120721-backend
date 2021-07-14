import { Browser, Page } from 'puppeteer';

const getAsyncCovidData = async (url: string, page: Page, id: any) => {
    await page.goto(url, {
        timeout: 3000000,
    });
    await page.waitForTimeout(2000);
    let result = await page.evaluate(() => {
        let node = document.querySelector('.timeline-detail');
        const time = node.querySelector('.timeline-head > h3')?.innerHTML;
        const content = node.querySelector('.timeline-content')?.innerHTML;
        return { time, data: content };
    });

    return result;
};

const getAsyncCovidDetail = async (url: string, page: Page, id: any) => {
    await page.goto(url, {
        timeout: 3000000,
    });
    await page.waitForTimeout(4000);
    let result = await page.evaluate(() => {
        let nodes = document.querySelectorAll('span.font24');
        let datas: any = [];
        nodes.forEach((node) => {
            datas.push(node.innerHTML);
        });
        return datas;
    });

    return result;
};

const getPromiseCovidData = (
    url: string,
    browser: Browser,
    id: any
): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let page = await browser.newPage();
        await page.goto(url, { timeout: 3000000 });
        await page.waitForTimeout(2000);
        let results = await page.evaluate(() => {
            let nodes = document.querySelectorAll('.timeline-detail');
            const datas: any = [];
            nodes.forEach((node) => {
                const time = node.querySelector(
                    '.timeline-head > h3'
                )?.innerHTML;
                const content =
                    node.querySelector('.timeline-content')?.innerHTML;
                datas.push({ time, datas: content });
            });

            return datas;
        });

        resolve(results);
        await page.close();
    });
};

export { getAsyncCovidData, getPromiseCovidData, getAsyncCovidDetail };
