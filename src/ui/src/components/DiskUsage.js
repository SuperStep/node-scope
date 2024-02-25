import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');

export default function DiskUsage(diskUsage) {
    console.log(diskUsage)
    return (
        <ReactECharts
            option={prepareOptions(diskUsage)}
            notMerge={true}
            lazyUpdate={true}
            opts={{renderer: 'svg'}}
        />
    )
}

function prepareOptions(diskUsage) {
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: diskUsage.data.totalSpace - diskUsage.data.freeSpace, name: 'Stored' },
                    { value: diskUsage.data.freeSpace, name: 'Free' }
                ]
            }
        ]
    }
}