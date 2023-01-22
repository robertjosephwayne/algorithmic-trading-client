import axios from 'axios';
import { config } from '../constants';
const api = axios.create({
    baseURL: `${config.SERVER_URL}/api`,
});

const getTickers = () => {
    const url = 'tickers/crypto';
    return api.get(url);
};

const getSnapshotAllTickers = (): Promise<any> => {
    const url = 'snapshot/markets/crypto/tickers';
    return api.get(url);
};

export { getTickers, getSnapshotAllTickers };
