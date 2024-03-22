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

import type { NextApiRequest, NextApiResponse } from 'next';

// 定义请求的URL和头部信息
const url = 'https://ppubs.uspto.gov/dirsearch-public/searches/generic';
const headers: RequestInit['headers'] = {
  'authority': 'ppubs.uspto.gov',
  'accept': 'application/json',
  'accept-language': 'en-US,en;q=0.9,zh;q=0.8,und;q=0.7,zh-CN;q=0.6',
  'content-type': 'application/json',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'x-access-token': 'eyJzdWIiOiI0YTU4NmRiMC1hNmRhLTQ2OWUtOTlmMS05NTM2M2IwOTcyZWEiLCJ2ZXIiOiI5ZTBjNzY4Ni0zMTc5LTQ2ZjMtOWM0Ni0zZjJhOWMxZGQ2YTciLCJleHAiOjB9'
};

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
  if (req.method === 'post') {
    res.status(405).json({ message: 'Method Not Allowed' });
    } else {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(datas),
      } as RequestInit);

      const data = await response.json();
      //fetchPatentData();  //zong print return data in log window
      if (response.status === 200) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ message: 'Failed to fetch patent data' });
      }
    } catch (error) {
      //fetchPatentData();  //zong print return data in log window
      res.status(500).json({ message: 'An error occurred while fetching patent data' });
    }
  } 
}








// 异步处理函数 //no used
async function fetchPatentData(): Promise<void> {
  try {
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(datas)
    } as RequestInit);

    if (response.status === 200) {
      const data = await response.json();  
      console.log(JSON.stringify(data, null, 4));
    } else {
      console.log("Failed to fetch patent data");
    }
  } catch (error) {
    console.error("An error occurred while fetching patent data:", error);
  }
}

