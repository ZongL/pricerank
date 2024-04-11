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



export default function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <NavigationPage/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/6 md:px-20">
        {/*<div className={styles.triangleshape}/>*/}
          <Link
            href="/teslapatent"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base disabled"
          >
            <span style={{ fontSize:'11px'}}>Go Patent</span> <ArrowRightIcon className="w-4 md:w-6" />
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-5/6">  
          <ScatterPlot />
        </div>
      </div>

      <div>
        {cardatashow.cardata_all_new.reduce((rows: JSX.Element[][], brandData, brandIndex) => {
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
            <a href="https://github.com/ZongL/pricerank" className="text-blue-500">
              Git Source Code
          </a>
          {' '}By{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">Next.js</a>
        </p>
        </footer>
      </div>
    </main>
  );
}
