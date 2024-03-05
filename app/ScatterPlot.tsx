import { useEffect } from 'react';
import * as echarts from 'echarts';
import { cardata_lixiang, cardata_xiaopeng, cardata_weilai, cardata_all } from './data/carData';


const ScatterPlot = () => {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('scatter-chart'));

    // 指定图表的配置项和数据
    const option = {
      title: {
        text: '汽车价格散点图'
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
        data: cardata_all.map(item => item[1]),
        type: 'scatter'
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 当组件卸载时销毁echarts实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div id="scatter-chart" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default ScatterPlot;
