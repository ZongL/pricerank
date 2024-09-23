

import type { NextApiRequest, NextApiResponse } from 'next';



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
    "pageCount",
    "type"
  ],
  op: "AND",
  pageSize: 50,
  q: "(TESLA).as. NOT (Biohealing).as.",
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
