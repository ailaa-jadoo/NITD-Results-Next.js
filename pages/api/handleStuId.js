process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import fetch from 'node-fetch';

const handler = async (req, res) => {
    const { rollNumber } = req.query;

    if (!rollNumber) {
        return res.status(400).json({ error: 'Missing rollNumber query parameter' });
    }

    const options = {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'JSESSIONID=-q5TugmDOh-do992E5EfjUcw.undefined',
            'Origin': 'https://115.248.191.12',
            'Referer': 'https://115.248.191.12/CampusLynxNITD/student/result.jsp',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `jdata={"sid":"validate","instituteID":"NITDINSD1506A0000001","studentrollno":"${rollNumber}"}`
    }

    const fetchUrl = "https://115.248.191.12/CampusLynxNITD/CounsellingRequest?sid=validate&refor=StudentOnlineDetailService";

    try {
        const response = await fetch(fetchUrl, options, { cache: 'force-cache' });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.text();
        if (data === '0') {
            throw new Error('Invalid Roll Number');
        }
        res.end(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default handler;