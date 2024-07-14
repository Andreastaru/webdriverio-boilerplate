import logger from './logger';

class Helper {
    async generateRandomIntegerFrom0ToExcludingN(nr: number): Promise<number> {
        const randomInteger = Math.floor(Math.random() * nr);
        logger.info(`Generated random Integer is: ${randomInteger}`);
        return randomInteger;
    }
}

export default new Helper();
