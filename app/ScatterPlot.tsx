import { useEffect } from 'react';
import * as echarts from 'echarts';
import { cardata_all_new } from './data/carData';

const ScatterPlot = () => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('scatter-chart'));
    const xAxisData = cardata_all_new.flatMap(brandData => brandData.detaildata.map(car => car[0]));
    const yAxisData = cardata_all_new.flatMap(brandData => brandData.detaildata.map(car => car[1]));
    const option = {
      title: {
        text: ' 汽车价格分布图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const name = params[0].name;
          const value = params[0].value[1];
          return `${name}: ￥${value}`;
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '价格（元）'
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 60
        },
        {
          show: false,
          type: 'slider',
          top: '0%',
          start: 0,
          end: 100
        }
      ],
      series: [{
        data: cardata_all_new.flatMap(brandData => brandData.detaildata),
        type: 'scatter',
        symbolSize: (value: number[]) => Math.log10(value[1]) * 5, // 根据价格设置点的大小
        label: {
          show: true,
          formatter: '{b}',
          position: 'top'
        },
        itemStyle: {
          color: '#0066cc' // 设置点的颜色
        }
      }],
      animation: true
    };
    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div id="scatter-chart" style={{ width: '100%', height: '400px' }}></div>
  );
};
export default ScatterPlot;

// export const renderData = (data:any[]) => {
//   return (
//     <div>
//       {data.map((row, index) => (
//         <div key={index} className="table-row">
//           {row.map((cell:any, cellIndex:any) => (
//             <div key={cellIndex} className="table-cell">
//               {/* 根据数据类型渲染 */}
//               {typeof cell === 'number' ? (
//                 <span>{cell.toLocaleString()}</span> // 对于数字，转换成字符串并格式化
//               ) : (
//                 <span>{cell}</span> // 对于其他类型，直接显示
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };


// 表格组件
import React from 'react';

type BorderCollapse = 'collapse' | 'separate';

export const renderData = (data: any[][]) => {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as BorderCollapse,
  };

  const cellStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',   // 数字通常右对齐
  };

  const numberCellStyle: React.CSSProperties = {
    ...cellStyle,
    textAlign: 'right', // 数字通常右对齐
  };

  return (
    <table style={tableStyle}>
      {data.map((row, index) => (
        <tr key={index}>
          {row.map((cell: any, cellIndex: number) => (
            <td
              key={cellIndex}
              style={typeof cell === 'number' ? numberCellStyle : cellStyle}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

// export const renderData = (data: any[][]) => {
//   const tableStyle: React.CSSProperties = {
//     width: '100%',
//     borderCollapse: 'collapse' as BorderCollapse,
//   };

//   const cellStyle: React.CSSProperties = {
//     border: '1px solid #ddd',
//     padding: '8px',
//     textAlign: 'left',
//   };

//   const numberCellStyle: React.CSSProperties = {
//     ...cellStyle,
//     textAlign: 'right', // 数字通常右对齐
//   };

//   return (
//     <table style={tableStyle}>
//       {data.map((row, index) => (
//         <tr key={index}>
//           {row.map((cell: any, cellIndex: number) => (
//             <td
//               key={cellIndex}
//               style={typeof cell === 'number' ? numberCellStyle : cellStyle}
//             >
//               {cell}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </table>
//   );
// };
