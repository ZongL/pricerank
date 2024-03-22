

import type { NextApiRequest, NextApiResponse } from 'next';
import { AllpatentData } from '../../app/data/PatentData';
import { Session } from 'inspector';

// 定义请求的URL和头部信息
const searchUrl = 'https://ppubs.uspto.gov/dirsearch-public/searches/generic';
const sessionUrl = 'https://ppubs.uspto.gov/dirsearch-public/users/me/session';

// 定义请求的数据
const datas = {
  cursorMarker: "*",
  databaseFilters: [
    { databaseName: "USPAT" },
    { databaseName: "US-PGPUB" },
    { databaseName: "USOCR" }
  ],
  fields: [
    "documentId",
    "patentNumber",
    "title",
    "datePublished",
    "inventors",
    "pageCount"
  ],
  op: "AND",
  pageSize: 50,
  q: "(tesla).aanm.",
  searchType: 0,
  sort: "date_publ desc"
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 首先获取x-access-token
    const token = await get_x_token();
    if (!token) {
      return res.status(401).json({ message: 'Failed to obtain x-access-token' });
    }

    // 使用获取到的token发起专利搜索请求
    const headers = {
      'authority': 'ppubs.uspto.gov',
      'accept': 'application/json',
      'accept-language': 'en-US,en;q=0.9,zh;q=0.8,und;q=0.7,zh-CN;q=0.6',
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'x-access-token': token // 使用获取到的token
    };

    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(datas),
    });

    const data = await response.json();
    if (response.status === 200) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch patent data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching patent data' });
  }
}

async function get_x_token() {
  try {
    const response = await fetch(sessionUrl, {
      method: "POST",
      headers: {
        "authority": "ppubs.uspto.gov",
        "accept": "*/*",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.0000.0 Safari/537.36",
        // 注意：这里不需要设置x-access-token，因为我们期望从响应中获取它
      }
    });

    if (response.ok) {
      const xAccessToken = response.headers.get('x-access-token');
      if (xAccessToken) {
        return xAccessToken;
      } else {
        throw new Error('x-access-token not found in response headers');
      }
    } else {
      throw new Error('Failed to retrieve session data');
    }
  } catch (error) {
    console.error('An error occurred while obtaining x-access-token:', error);
    return null;
  }
}






//abandon code --------------------------------------------------------------------------------------------

// import type { NextApiRequest, NextApiResponse } from 'next'
 
// type ResponseData = {
//   message: string
// }
 
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }

//abandon code --------------------------------------------------------------------------------------------
// // 定义请求的URL和头部信息
// const url = 'https://ppubs.uspto.gov/dirsearch-public/searches/generic';
// const headers: RequestInit['headers'] = {
//   'authority': 'ppubs.uspto.gov',
//   'accept': 'application/json',
//   'accept-language': 'en-US,en;q=0.9,zh;q=0.8,und;q=0.7,zh-CN;q=0.6',
//   'content-type': 'application/json',
//   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
//   'x-access-token': 'eyJzdWIiOiI0YTU4NmRiMC1hNmRhLTQ2OWUtOTlmMS05NTM2M2IwOTcyZWEiLCJ2ZXIiOiI5ZTBjNzY4Ni0zMTc5LTQ2ZjMtOWM0Ni0zZjJhOWMxZGQ2YTciLCJleHAiOjB9'
// };

// // 定义请求的数据
// const datas = {
//   cursorMarker: "*",
//   databaseFilters: [
//     { databaseName: "USPAT" },
//     { databaseName: "US-PGPUB" },
//     { databaseName: "USOCR" }
//   ],
//   fields: [
//     "documentId",
//     "patentNumber",
//     "title",
//     "datePublished",
//     "inventors",
//     "pageCount"
//   ],
//   op: "AND",
//   pageSize: 50,
//   q: "(tesla).aanm.",
//   searchType: 0,
//   sort: "date_publ desc"
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'post') {
//     res.status(405).json({ message: 'Method Not Allowed' });
//     } else {
//     try {
//             // 调用函数  
//       get_x_token();
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(datas),
//       } as RequestInit);

//       const data = await response.json();
//       //fetchPatentData();  //zong print return data in log window
//       if (response.status === 200) {
//         //AllpatentData = data;
//         res.status(200).json(data);
//       } else {
//         res.status(response.status).json({ message: 'Failed to fetch patent data' });
//       }
//     } catch (error) {

//       res.status(500).json({ message: 'An error occurred while fetching patent data' });
//     }
//   } 
// }




// async function get_x_token(): Promise<void> {  
//     try {  
//         const url = "https://ppubs.uspto.gov/dirsearch-public/users/me/session";  
//         const headers = {  
//             "authority": "ppubs.uspto.gov",  
//             "accept": "*/*",  
//             "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.0000.0 Safari/537.36", // 注意：这里的user-agent可能需要更新以匹配你的浏览器版本  
//             "x-access-token": "null" // 注意：这里的x-access-token应该替换为实际的值，如果需要的话  
//         };  
          
//         // 注意：这里假设你发送的是JSON数据，如果是其他类型的数据，请相应地修改data和headers['content-type']  
//         const data = 25334820;                      

  
//         const response = await fetch(url, {  
//           method: "POST",  
//           headers: headers,  
//           body: JSON.stringify(data),  
//         });  
          
//         // 输出响应结果，这里你可以根据实际需要处理响应数据  
//         //console.log(response.json());  
//         console.log(response.headers); // 输出响应头信息  
          
//     } catch (error) {  
//         console.error('An error occurred:', error);  
//     }  
// }  
  