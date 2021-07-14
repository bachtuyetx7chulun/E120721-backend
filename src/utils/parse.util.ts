const parseTime = (time: any) => {
    return {
        text: time,
        date:
            time.split(' ')[1].split('/')[2] +
            time.split(' ')[1].split('/')[1] +
            time.split(' ')[1].split('/')[0],
        timeInSeconds:
            parseInt(time.split(' ')[0].split(':')[0]) * 3600 +
            parseInt(time.split(' ')[0].split(':')[1]) * 60,
    };
};

export const parseCurrentTime = () => {
    const currentTime = new Date();
    const currentDateToString = currentTime.toLocaleString().split(',')[0];
    const result =
        currentDateToString.split('/')[2] +
        ('0' + currentDateToString.split('/')[0]).slice(-2) +
        currentDateToString.split('/')[1];
    return result;
};

const parseData = (content: string) => {
    const total: any = content.match(/\d+\.\d+|\d+/); // prettier-ignore
    const count =
        parseInt(total[0]) == parseFloat(total[0])
            ? parseInt(total[0])
            : parseFloat(total[0]) * 1000;

    return {
        total: count,
        content,
    };
};

export const parseArray = (data: any) => {
    return {
        ...data,
        time: parseTime(data.time),
        data: parseData(data.data),
    };
};
