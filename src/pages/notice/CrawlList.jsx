// const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');

// const CrowlList = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('http://www.kaswcs.or.kr/bj_board/bjbrd_list.htm?board_id=0307');

//     const html = await page.content();
//     const $ = cheerio.load(html);

//     let crawledDataList = [];

//     $('td.subject a').each((index, element) => {
//         const title = $(element).text().trim();
//         const href = $(element).attr('href');

//         if (title.includes('공모')) {
//             crawledDataList.push({
//                 title,
//                 href: `http://www.kaswcs.or.kr${href}`
//             });
//         }
//     });

//     await browser.close();

//     return crawledDataList;
// };

// export default CrowlList;
