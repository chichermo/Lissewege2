const API_BASE = 'https://api-football-v1.p.rapidapi.com/v3';

module.exports = async (req, res) => {
    const apiKey = process.env.API_FOOTBALL_KEY;
    const apiHost = process.env.API_FOOTBALL_HOST || 'api-football-v1.p.rapidapi.com';

    if (!apiKey) {
        res.status(500).json({ error: 'Missing API_FOOTBALL_KEY' });
        return;
    }

    const path = req.query?.path;
    if (!path || typeof path !== 'string' || !path.startsWith('/')) {
        res.status(400).json({ error: 'Invalid path' });
        return;
    }

    try {
        const url = `${API_BASE}${path}`;
        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        });

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(response.ok ? 200 : response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy request failed' });
    }
};
