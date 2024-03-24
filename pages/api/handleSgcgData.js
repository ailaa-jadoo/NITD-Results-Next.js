process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const handler = async (req, res) => {
    const { studentID } = req.query;

    if (!studentID) {
        return res.end(JSON.stringify({ error: 'Missing studentID query parameter' }));
    }

    const options = {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'JSESSIONID=-q5TugmDOh-do992E5EfjUcw.undefined',
            'Origin': 'https://erp.nitdelhi.ac.in',
            'Referer': 'https://erp.nitdelhi.ac.in/CampusLynxNITD/student/result.jsp',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `jdata={"sid":"2002","mname":"ExamSgpaCgpaDetailOfStudent","studentID":"${studentID}","instituteID":"NITDINSD1506A0000001","registrationID":"NITDRETD2208A0000001"}`
    }

    const fetchUrl = "https://erp.nitdelhi.ac.in/CampusLynxNITD/CounsellingRequest?sid=2005&refor=StudentSeatingMasterService";

    try {
        const response = await fetch(fetchUrl, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        res.end(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default handler;
