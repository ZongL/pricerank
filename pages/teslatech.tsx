import React from 'react';
import { useEffect } from 'react';  
import { teslatechData } from "@/app/data/TechData_tesla";

import 'tailwindcss/tailwind.css'; 

import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '@/app/ui/responsive.dataTables.css';  // 引入CSS文件
import '@/app/ui/responsive.dataTables.min.css';  // 引入CSS文件
import 'datatables.net-responsive/js/dataTables.responsive';



import {NavigationPage} from '@/app/NavigationPage'


export default function Patents(){
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
  return (
     <main className="flex min-h-screen flex-col p-6">
      <div>
        <NavigationPage/>
      </div>
    {/* <div className="mt-4 flex grow flex-col gap-4 md:flex-row"> */}
        {/* <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-9/10 md:px-20"> */}
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
        {/* </div> */}
        {/* <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/5 md:px-20"></div>     */}
    {/* </div> */}


    </main>
  );
};

