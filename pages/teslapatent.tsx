import React, { useEffect, useState } from 'react';
import { NavigationPage } from '@/app/NavigationPage'
import 'tailwindcss/tailwind.css';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '@/app/ui/responsive.dataTables.css';
import '@/app/ui/responsive.dataTables.min.css';
import 'datatables.net-responsive/js/dataTables.responsive';

export default function Patents() {
  const [patentData, setPatentData] = useState(null);

  useEffect(() => {
    // 获取 JSON 数据
    fetch('/tesla_patents_data_ai.json')
      .then(response => response.json())
      .then(data => {
        setPatentData(data);
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
  );
};

