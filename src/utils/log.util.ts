import database from '../configs/db';
import { parseCurrentTime } from './parse.util';

export const watchAction = async (
    action: string,
    status: boolean,
    branch: string
) => {
    try {
        const latestRecordLog = await (
            await database
                .ref('covids/logs/' + parseCurrentTime())
                .once('value')
        ).val();

        // TODO: Check record => if it's not exist => Create new a record
        // * If you wanna clean code => push url to config file

        // ? If the latest record is not exist => create a new record with the same day
        if (!latestRecordLog) {
            await database.ref('covids/logs/' + parseCurrentTime()).set([
                {
                    time: new Date().toISOString(),
                    action,
                    branch,
                    status,
                },
            ]);
        } else {
            // ? Update count
            let updateData = [
                ...latestRecordLog,
                {
                    time: new Date().toISOString(),
                    action,
                    status,
                    branch,
                },
            ];
            database
                .ref('covids/logs/' + parseCurrentTime())
                .set(updateData, (error) => {
                    if (error) {
                        throw error;
                    }
                });
        }

        return true;
    } catch (error) {
        return false;
    }
};
