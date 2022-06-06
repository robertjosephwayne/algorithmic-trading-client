const axios = require('axios');

export default async function handler(req, res) {
    try {
        const url = `https://${process.env.CMC_API_URL}/v1/cryptocurrency/categories`;
        const response = await axios.get(url, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
            },
        });
        return res.send(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}
