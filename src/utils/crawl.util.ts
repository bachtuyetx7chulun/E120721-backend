import puppeteer, { Page } from 'puppeteer';

const getAsyncCovidData = async (url: string) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
        timeout: 3000000,
    });
    await page.waitForTimeout(2000);
    let result = await page.evaluate(() => {
        const node: any = document.querySelector('.timeline-detail');
        const time = node.querySelector('.timeline-head > h3')?.innerHTML;
        const content = node.querySelector('.timeline-content')?.innerHTML;
        return { time, data: content };
    });

    return result;
};

const getAsyncCovidDetail = async (url: string) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
        timeout: 3000000,
    });
    await page.waitForTimeout(4000);
    let result = await page.evaluate(() => {
        let nodes = document.querySelectorAll('span.font24');
        let datas: any = [];
        nodes.forEach((node: any) => {
            datas.push(node.innerHTML);
        });
        return datas;
    });

    return result;
};

export { getAsyncCovidData, getAsyncCovidDetail };
