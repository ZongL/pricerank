'use client';  //zongliang

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';

import {NavigationPage} from '@/app/NavigationPage'

import { useEffect, useState} from 'react';

import * as cardatashow from './data/carData';
import ScatterPlot from './ScatterPlot';
import { renderData } from './ScatterPlot';
import { useCarData } from './data/carData';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricerank.vercel.app';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '特斯拉专利追踪 Tesla Patents Tracker',
      alternateName: 'Tesla Patents Tracker',
      description:
        '每日更新的特斯拉公开专利数据与 AI 解读，覆盖电动车、自动驾驶、电池、能源等领域。',
      inLanguage: ['zh-CN', 'en'],
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'ZongL',
      url: 'https://zongl.github.io/',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: '特斯拉专利追踪 Tesla Patents Tracker 首页',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: {
        '@type': 'Organization',
        name: 'Tesla, Inc.',
        url: 'https://www.tesla.com',
      },
      inLanguage: 'zh-CN',
    },
  ],
};

export default function Page() {
  const carData = useCarData();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="sr-only">
        特斯拉专利追踪 Tesla Patents Tracker - 每日更新的特斯拉公开专利与 AI 解读
      </h1>
      <div>
        <NavigationPage/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/6 md:px-20">
        {/*<div className={styles.triangleshape}/>*/}
          <Link
            href="/teslapatent"
            className="flex items-center gap-1 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base disabled"
          >
            <span style={{ fontSize:'12px'}}>Go Patent</span> <ArrowRightIcon className="w-3 md:w-6 h-3 md:h-4" />
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-5/6">  
          <ScatterPlot />
        </div>
      </div>

      <div>
        {carData.reduce((rows: JSX.Element[][], brandData, brandIndex) => {
          if (brandIndex % 5 === 0) rows.push([]);
          rows[rows.length - 1].push(
            <div key={brandIndex} className="flex flex-col series-container gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5 md:px-10">
              <strong><a href={brandData.linkurl} className="text-blue-500">{brandData.brand}</a></strong>
              {/* 其他内容 */}
              {renderData(brandData.detaildata)}
            </div>
          );
          return rows;
        }, []).map((row, rowIndex) => (
          <div key={rowIndex} className="mt-4 flex grow flex-col gap-4 md:flex-row">
            {row}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center flex-col p-4 bg-gray-20">
        <footer className="footer">
        <p>© 2024{' '}
            <a href="https://zongl.github.io/" className="text-blue-500">
              Git Source Code
          </a>
          {' '}Design By ZongL{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">Next.js</a>
        </p>
        </footer>
      </div>
    </main>
  );
}
