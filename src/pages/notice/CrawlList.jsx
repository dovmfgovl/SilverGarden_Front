// // const CrowlList = async () => {
// //     const browser = await puppeteer.launch();
// //     const page = await browser.newPage();

// //     await page.goto('http://www.kaswcs.or.kr/bj_board/bjbrd_list.htm?board_id=0307');

// //     const html = await page.content();
// //     const $ = cheerio.load(html);

// //     let crawledDataList = [];

// //     $('td.subject a').each((index, element) => {
// //         const title = $(element).text().trim();
// //         const href = $(element).attr('href');

// //         if (title.includes('공모')) {
// //             crawledDataList.push({
// //                 title,
// //                 href: `http://www.kaswcs.or.kr${href}`
// //             });
// //         }
// //     });
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CrawledDataList = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         axios.get('/crawled-data')
//             .then(response => {
//                 setData(response.data);
//                 console.log(data);
//             })
//             .catch(error => {
//                 console.error("There was an error fetching the crawled data: ", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>Crawled Data</h2>
//             <ul>
//                 {data.map((item, index) => (
//                     <li key={index}>{item.title}: {item.content}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CrawledDataList;
