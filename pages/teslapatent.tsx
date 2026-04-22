import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NavigationPage } from '@/app/NavigationPage'
import 'tailwindcss/tailwind.css';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '@/app/ui/responsive.dataTables.css';
import '@/app/ui/responsive.dataTables.min.css';
import 'datatables.net-responsive/js/dataTables.responsive';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricerank.vercel.app';

export default function Patents() {
  const [patentData, setPatentData] = useState(null); // 用于存储专利数据
  const [updateDate, setUpdateDate] = useState(null); // 用于存储文件时间戳

  useEffect(() => {
    // 获取 JSON 数据
    fetch('/tesla_patents_data_ai.json')
      .then(response => response.json())
      .then(data => {
        setPatentData(data);
        if (data.Date) {
          setUpdateDate(data.Date);
        }else {
          setUpdateDate(null);}

        // 初始化 DataTable
        const table = document.getElementById('myTable');
        if (table && data) {
          new DataTable(table, {
            data: data.docs,
            columns: [
              { data: 'documentId', orderable: false },
              { data: 'datePublished', orderable: true },
              { data: 'title', orderable: false },
              { data: 'patentNumber', orderable: false },
              { data: 'inventors', orderable: false },
              { data: 'pageCount', orderable: false },
              { data: 'AI_Opinion', orderable: false }
            ],
            order: [[1, 'desc']],
            paging: true
          });
        }
      })
      .catch(error => console.error('Error loading patent data:', error));

  }, []);

  const pageTitle = '特斯拉专利列表 Tesla Patents List | 每日更新 + AI 解读';
  const pageDescription = `完整的特斯拉（Tesla）公开专利清单，包含文档编号、公开日、标题、专利号、发明人、页数以及 AI 自动生成的技术要点解读。数据每日更新${
    updateDate ? `，最新至 ${updateDate}` : ''
  }。`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="特斯拉专利列表,Tesla patents list,Tesla 专利号,特斯拉发明人,Tesla patent AI,特斯拉专利查询,Tesla 专利数据库"
        />
        <link rel="canonical" href={`${SITE_URL}/teslapatent`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:url" content={`${SITE_URL}/teslapatent`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={`${SITE_URL}/opengraph-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/opengraph-image.png`} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Dataset',
              name: 'Tesla Patents Dataset',
              description: pageDescription,
              url: `${SITE_URL}/teslapatent`,
              inLanguage: ['zh-CN', 'en'],
              keywords: 'Tesla, patents, 特斯拉专利, EV, autonomous driving',
              creator: {
                '@type': 'Person',
                name: 'ZongL',
                url: 'https://zongl.github.io/',
              },
              ...(updateDate ? { dateModified: updateDate } : {}),
            }),
          }}
        />
      </Head>
      <main className="flex min-h-screen flex-col p-6">
      <div>
        <NavigationPage/>
      </div>
      <div>
      <h1 className="text-center mb-4">
        Tesla Patents Updated to-{">"} {updateDate || 'NULL'}
      </h1>
        <table id="myTable" className="display responsive" style={{ width:'100%'}}>
          <thead>
            <tr>
              <th >Document ID</th>
              <th>Date Published</th>
              <th>Title</th>
              <th>Patent Number</th>
              <th>Inventors</th>
              <th>Page Count</th>
              <th>AI_Opinion: </th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
    </>
  );
};

