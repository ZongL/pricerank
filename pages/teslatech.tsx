import React, { useState } from 'react';
import { useEffect } from 'react';  
import { teslatechData } from "@/app/data/TechData_tesla";

import 'tailwindcss/tailwind.css'; 

import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '@/app/ui/responsive.dataTables.css';  // 引入CSS文件
import '@/app/ui/responsive.dataTables.min.css';  // 引入CSS文件
import 'datatables.net-responsive/js/dataTables.responsive';

import {NavigationPage} from '@/app/NavigationPage'

// 导入Waline客户端
import { init } from '@waline/client';
import '@waline/client/style';

export default function Patents(){
  const [scale, setScale] = useState(1); // 初始缩放比例为1

  useEffect(() => {  
    // 确保组件已经挂载到 DOM 上  
    const table = document.getElementById('myTable');  
    if (table) {  
      //初始化 DataTables  
      new DataTable(table, {
        data: teslatechData.docs,
        columns: [
          { data: 'URL', orderable: false },
          { data: 'Detail', orderable: true },
          { data: 'AI_Opinion', orderable: false }
      ],
      //order: [[1, 'desc']], // 列索引1（即datePublished列）降序排序
      paging: true
      });  
    }  
  }, []);  

  useEffect(() => {
    // 初始化Waline
    init({
      el: '#waline',
      serverURL: 'https://mywalineforpricerank.vercel.app', // 你的Waline服务端地址
    });
  }, []);

  const handleZoomIn = () => {
    setScale(scale + 0.1); // 放大10%
  };

  const handleZoomOut = () => {
    if (scale > 0.5) setScale(scale - 0.1); // 缩小10%，但不低于0.5
  };

  return (
     <main className="flex min-h-screen flex-col p-6">
      <div>
        <NavigationPage/>
      </div>
      <div>  
        <h1>Tesla patent</h1>  
        <table id="myTable" className="display responsive" style={{ width:'100%'}}>  
          <thead>  
            <tr>  
            <th>URL</th>
            <th>Detail</th>
            <th>AI_Opinion: </th>
            </tr>  
          </thead>  
        </table>  
      </div>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handleZoomIn}>放大'-'</button> 
        <button onClick={handleZoomOut}>缩小</button>
      </div>
      <div className="pdf-container">
        {/* PDF显示区域 */}

        {/* <div style={{ overflow: 'scroll', width: '100%', height: '600px' }}>
          <iframe
            src="/1c2y3b4.png"
            width="100%"
            height="600px"
            frameBorder="0"
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease' }}
          >
          </iframe>
        </div> */}
        <div style={{ 
            width: '100%', 
            height: '600px', 
            position: 'relative', 
            overflow: 'auto'
          }}>
          <div style={{ 
              position: 'absolute', 
              left: '50%', 
              top: '50%', 
              transform: `translate(-50%, -50%) scale(${scale})`, 
              transition: 'transform 0.2s ease',
              width: '100%',
              height: '100%',
              //cursor: 'grab'
            }}>
          <img src="/1c2y3b4.png" alt="Tesla Patent" />
        </div>
      </div>
      </div>
      <div id="waline" className="mt-8" style={{ width: '50%', margin: '0 auto' }}></div>
    </main>
  );
};

