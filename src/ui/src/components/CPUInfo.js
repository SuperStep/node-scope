import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');

export default function CPUInfo(coresLoad) {
    return (
        <ReactECharts
            option={prepareOptions(coresLoad)}
            notMerge={true}
            lazyUpdate={true}
            opts={{renderer: 'svg'}}
        />
    );
}

function prepareOptions(coresLoad) {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: [
            {
                // name: 'Cores',
                // nameLocation: 'center',
                // nameGap: 20,
                type: 'category',
                data: [...Array(coresLoad.data.length).keys()],
                animationDuration: 300,
                animationDurationUpdate: 300,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        xAxis: [
            {
                // name: 'Load',
                // nameLocation: 'center',
                // nameGap: 10,
                type: 'value',
                max: 100
            }
        ],
        series: [
            {
                name: 'Load',
                type: 'bar',
                barWidth: '60%',
                data: coresLoad.data.map(value => Number((value * 100).toFixed(0))),
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true
                }
            }
        ],
        animationDelay: 0,
        animationThreshold: 100,
        animationDuration: 0,
        animationDurationUpdate: 300,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    }
}