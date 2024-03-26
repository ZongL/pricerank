import React from 'react';
import { useEffect } from 'react';  
import { teslapatentData } from "@/app/data/PatentData";

import 'tailwindcss/tailwind.css'; 

import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
//import '@/app/ui/responsive.dataTables.css';  // 引入CSS文件
import 'datatables.net-responsive/js/dataTables.responsive';

export default function Patents(){
  useEffect(() => {  
    // 确保组件已经挂载到 DOM 上  
    const table = document.getElementById('myTable');  
    if (table) {  
      //初始化 DataTables  
      new DataTable(table, {
        data: teslapatentData.docs,
        columns: [
          { data: 'documentId', orderable: false },
          { data: 'datePublished', orderable: true },
          { data: 'title', orderable: false },
          { data: 'patentNumber', orderable: false },
          { data: 'inventors', orderable: false },
          { data: 'pageCount', orderable: false }
      ],
      // 设置默认排序
      responsive: true,
      columnDefs: [
        { responsivePriority: 10002, targets: -1 } //最后一行折叠隐藏
    ],
      order: [[1, 'desc']], // 列索引1（即datePublished列）降序排序
      paging: true
      });  
    }  
  }, []);  
  return (
     <main className="flex min-h-screen flex-col p-6">
      <div className="flex flex-col items-center justify-center h-52 bg-blue-500 p-4 rounded-lg md:flex-row md:h-32">
        <div className="flex items-center">
          <h2 className="text-white text-3xl font-bold">Car Price Overview</h2>
        </div>
        <div className="flex-grow"></div>
        <div className="text-white self-end">Design By ZongL</div>
      </div>
    {/* <div className="mt-4 flex grow flex-col gap-4 md:flex-row">*/}
        {/*<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-9/10 md:px-20"> */}
              <div>  
                <h1>Tesla patent</h1>  
                <table id="myTable" className="display nowrap" style={{ width:'100%'}}>  
                  <thead>  
                    <tr>  
                    <th>Document ID</th>
                    <th>Date Published</th>
                    <th>Title</th>
                    <th>Patent Number</th>
                    <th>Inventors</th>
                    <th>Page Count</th>
                      {/* <th>AI-opinion</th> */}
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

