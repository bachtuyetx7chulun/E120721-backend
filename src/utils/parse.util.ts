const parseTime = (time: any) => {
    return {
        text: time,
        date:
            time.split(' ')[1].split('/')[2] +
            time.split(' ')[1].split('/')[0] +
            time.split(' ')[1].split('/')[1],
        timeInSeconds:
            parseInt(time.split(' ')[0].split(':')[0]) * 3600 +
            parseInt(time.split(' ')[0].split(':')[1]) * 60,
    };
};

const parseData = (content: string) => {
    const total: any = content.match(/\d+/); // prettier-ignore
    return {
        total: total[0],
        content,
    };
};

export const parseArray = (datas: any) => {
    return datas.map((data: any) => {
        return {
            ...data,
            datas: parseData(data.datas),
            time: parseTime(data.time),
        };
    });
};
