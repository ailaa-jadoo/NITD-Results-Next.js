import fetch from 'node-fetch';

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
            'Referer': 'https://115.248.191.12/CampusLynxNITD/student/result.jsp',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `jdata={"sid":"2002","mname":"ExamSgpaCgpaDetailOfStudent","studentID":"${studentID}","instituteID":"NITDINSD1506A0000001","registrationID":"NITDRETD2208A0000001"}`
    };

    const fetchUrl1 = "https://115.248.191.12/CampusLynxNITD/CounsellingRequest?sid=2002&refor=StudentSeatingMasterService";
    const fetchUrl2 = "https://115.248.191.12/CampusLynxNITD/CounsellingRequest?sid=2005&refor=StudentSeatingMasterService";

    try {
        const [response1, response2] = await Promise.all([
            fetch(fetchUrl1, options, { cache: 'force-cache' }),
            fetch(fetchUrl2, options, { cache: 'force-cache' })
        ]);

        if (!response1.ok || !response2.ok) {
            throw new Error('Failed to fetch data');
        }

        const studentData = await response1.json();
        const sgcgData = await response2.json();

        res.end(JSON.stringify({ studentData, sgcgData }));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default handler;