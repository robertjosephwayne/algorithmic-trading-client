const axios = require('axios');

export default async function handler(req, res) {
    try {
        const { symbol } = req.query;
        const url = `https://alphavantage.co/query`;
        const response = await axios.get(
            url,
            {
                params: {
                    function: "INCOME_STATEMENT",
                    symbol,
                    apikey: process.env.ALPHA_VANTAGE_API_KEY
                }
            },
        );
        return res.send(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}
