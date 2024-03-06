'use client';  //zongliang

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { useEffect, useState} from 'react';

import { cardata_lixiang, cardata_xiaopeng, cardata_weilai } from './data/carData';
import ScatterPlot from './ScatterPlot';
import { renderData } from './ScatterPlot';



export default function Page() {

  const [carL7Price, setCarL7Price] = useState(null);
  const [carL8Price, setCarL8Price] = useState(null);
  //console.log("Data start.................");
  useEffect(() => {
    const fetchCarPrices = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'X-Chj-Devicetype': '1',
            //'Access-Control-Allow-Origin': 'https://www.lixiang.com',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        };
        console.log("Fetching L7 price...");
        //const responseL7 = await fetch('https://api-web.lixiang.com/vehicle-api/v1-0/products?productId=1664417698271', requestOptions);
        const responseL7 = await fetch('https://fakerapi.it/api/v1/images?_width=380');
        //console.log("Response L7:", responseL7);
        const dataL7 = await responseL7.json();
        console.log("Data L7:", dataL7.code);
        setCarL7Price(dataL7.code);

        //const responseL8 = await fetch('https://api-web.lixiang.com/vehicle-api/v1-0/products?productId=1664417698271', requestOptions);
        const responseL8 = await fetch('https://fakerapi.it/api/v1/images?_width=380');
        const dataL8 = await responseL8.json();
        setCarL8Price(dataL8.code);
      } catch (error) {
        console.error('Error fetching car prices:', error);
      }
    };

    fetchCarPrices();
  }, []);


  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center justify-center rounded-lg bg-blue-500 p-4 md:h-32">
        <h2 className="text-white text-3xl front-bold">Car Price Overview(CPO)</h2>
        {/* <AcmeLogo /> */}
      </div>
      <div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5 md:px-20">
        <h2 className='hidden'>理想系列</h2>
        <strong><a href="https://www.lixiang.com/#li" className="text-blue-500">理想系列</a></strong>
        {/*carL7Price && <p>L7 Price: {carL7Price}</p>*/}
        {/*carL8Price && <p>L8 Price: {carL8Price}</p>*/}
        {renderData(cardata_lixiang)}
      </div>
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5">  
      <h2 className='hidden'>小鹏系列</h2>
      <strong><a href="https://www.xiaopeng.com/" className="text-blue-500">小鹏系列</a></strong>
      {/* 其他内容 */}
      {renderData(cardata_xiaopeng)} 
      </div>  
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5">  
      <h2 className='hidden'>蔚来系列</h2>
      <strong><a href="https://www.nio.cn/" className="text-blue-500">蔚来系列</a></strong>
      {/* 其他内容 */} 
      {renderData(cardata_weilai)} 
      </div>
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5">  
      <h2 className='hidden'>蔚来系列</h2>
      <strong><a href="https://www.nio.cn/" className="text-blue-500">蔚来系列</a></strong>
      {/* 其他内容 */} 
      {renderData(cardata_weilai)} 
      </div>
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5">  
      <h2 className='hidden'>蔚来系列</h2>
      <strong><a href="https://www.nio.cn/" className="text-blue-500">蔚来系列</a></strong>
      {/* 其他内容 */} 
      {renderData(cardata_weilai)} 
      </div>  
      </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/4 md:px-20">
        {/*<div className={styles.triangleshape}/>*/}
          <p className={`text-xl text-gray-800 md:text-1xl md:leading-normal`}>
            <strong>.</strong> Build on{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js
            </a>
            .
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Compare</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <a href="https://github.com/ZongL/pricerank" className="text-blue-500">
              Git Source Code
            </a>
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-3/4">  
          <ScatterPlot />
        </div>
      </div>
    </main>
  );
}
