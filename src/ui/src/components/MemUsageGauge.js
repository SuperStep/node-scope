import React from "react";
import ReactECharts from "echarts-for-react";

export default function MemUsageGauge(ramInfo) {
    return (
        <ReactECharts
            option={prepareOptions(ramInfo)}
            notMerge={true}
            lazyUpdate={true}
            opts={{renderer: 'svg'}}
        />
    )
}

function prepareOptions(ramInfo) {

    console.log(ramInfo)
    return  {
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 10,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 5,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '40%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 40,
                    fontWeight: 'bolder',
                    formatter: '{value} %',
                    color: 'inherit'
                },
                data: [
                    {
                        value: Number((ramInfo.data.available / ramInfo.data.total * 100).toFixed(0))
                    }
                ]
            }
        ]
    };
}