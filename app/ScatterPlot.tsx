import { useEffect } from 'react';
import * as echarts from 'echarts';
import { cardata_lixiang, cardata_xiaopeng, cardata_weilai, cardata_all } from './data/carData';

// 散点图
const ScatterPlot = () => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('scatter-chart'));

    const option = {
      title: {
        text: '汽车价格散点图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const [name, value] = params[0].data;
          return `${name}: ￥${value}`;
        }
      },
      xAxis: {
        type: 'category',
        data: cardata_all.map(item => item[0]),
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '价格（元）'
      },
      series: [{
        data: cardata_all,
        type: 'scatter',
        symbolSize: value => Math.log10(value[1]) * 5, // 根据价格设置点的大小
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
