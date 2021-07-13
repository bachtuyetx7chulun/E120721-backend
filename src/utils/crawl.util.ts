import { Page } from 'puppeteer';

const getCovidData = async (url: string, page: Page, id: any) => {
    await page.goto(url, {
        timeout: 3000000,
    });
    await page.waitForTimeout(2000);
    let results = await page.evaluate(() => {
        let nodes = document.querySelectorAll('.timeline-detail');
        const datas: any = [];
        nodes.forEach((node) => {
            const time = node.querySelector('.timeline-head > h3')?.innerHTML;
            const content = node.querySelector('.timeline-content')?.innerHTML;
            datas.push({ time, datas: content });
        });

        return datas;
    });

    return results;
};

export { getCovidData };
