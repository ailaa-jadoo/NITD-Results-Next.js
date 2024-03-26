// import fetch from 'node-fetch';
// const { Agent } = require('https');

// const agent = new Agent({
//   keepAlive: true,
//   maxSockets: 10
// });

// const handler = async (req, res) => {
//   const { studentID, semNum } = req.query;

//   if (!studentID || !semNum) {
//     return res.status(400).json({ error: 'Missing required query parameters' });
//   }

//   try {
//     const requests = Array.from({ length: semNum }, (_, i) => {
//       const requestOptions = {
//         method: "POST",
//         headers: {
//             'Accept': '*/*',
//             'Accept-Language': 'en-US,en;q=0.9',
//             'Connection': 'keep-alive',
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//             'Cookie': 'JSESSIONID=-q5TugmDOh-do992E5EfjUcw.undefined',
//             'Origin': 'https://erp.nitdelhi.ac.in',
//             'Referer': 'https://erp.nitdelhi.ac.in/CampusLynxNITD/student/result.jsp',
//             'Sec-Fetch-Dest': 'empty',
//             'Sec-Fetch-Mode': 'cors',
//             'Sec-Fetch-Site': 'same-origin',
//             'Sec-GPC': '1',
//             'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
//             'X-Requested-With': 'XMLHttpRequest'
//         },
//         body: `jdata={"sid":"2003","mname":"studentGrade","studentID":"${studentID}","instituteID":"NITDINSD1506A0000001","stynumber":${i + 1}}`,
//         agent
//       };
//       return fetch("https://erp.nitdelhi.ac.in/CampusLynxNITD/CounsellingRequest?sid=2003&refor=StudentSeatingMasterService", requestOptions, { cache: 'force-cache' })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`Failed to fetch data for stynumber ${i + 1}`);
//           }
//           return response.json();
//         })
//         .catch(error => ({ error: `Failed to fetch data for stynumber ${i + 1}` }));
//     });

//     const results = await Promise.all(requests);
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export default handler;

import fetch from 'node-fetch';
const { Agent } = require('https');
const agent = new Agent({
  keepAlive: true,
  maxSockets: 10
});
const handler = async (req, res) => {
  const { studentID } = req.query;
  if (!studentID) {
    return res.status(400).json({ error: 'Missing required query parameter: studentID' });
  }
  try {
    const requests = [];
    const promises = [];
    for (let i = 1; i <= 8; i++) {
      const requestOptions = {
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
        body: `jdata={"sid":"2003","mname":"studentGrade","studentID":"${studentID}","instituteID":"NITDINSD1506A0000001","stynumber":${i}}`,
        agent
      };
      const promise = fetch("https://erp.nitdelhi.ac.in/CampusLynxNITD/CounsellingRequest?sid=2003&refor=StudentSeatingMasterService", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data for stynumber ${i}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error(`Error fetching data for stynumber ${i}:`, error.message);
          return null; // Return null for failed requests
        });
      promises.push(promise);
      // Use Promise.race() to efficiently check for null responses
      const result = await Promise.race([promise, new Promise(resolve => setTimeout(resolve, 10000))]);
      if (result === null || result.length === 0) {
        break; // Break the loop if a null response is received
      }
      requests.push(result);
    }
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default handler;