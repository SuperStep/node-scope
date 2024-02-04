import React, {useLayoutEffect, useState} from "react";

export function Home () {

    const getMetrics = async() => {
        const res = await fetch("/api/v1/info");
        const metrics = await res.json();
        setMetrics(metrics);
    }

    const [metrics, setMetrics] = useState();

    useLayoutEffect(() => {
       getMetrics().catch(e => console.log(e));
    });

    if(metrics) {

        return (
            <>
                <label>Operating System</label>
                <input type="text" value={metrics.operatingSystem} readOnly />
                <br />
                <label>Uptime</label>
                <input type="text" value={`${metrics.uptime.days} days, ${metrics.uptime.hours} hours, ${metrics.uptime.minutes} minutes, ${metrics.uptime.seconds} seconds`} readOnly />
                <br />
                <label>RAM Info</label>
                <input type="text" value={metrics.ramInfo} readOnly />
                <br />
                <label>Processor Info</label>
                <input type="text" value={`Cores: ${metrics.processorInfo.cores}, Name: ${metrics.processorInfo.name}, Max Frequency: ${metrics.processorInfo.maxFreq} Hz, Usage: ${metrics.processorInfo.usage}%`} readOnly />
                <br />
                <label>Storage Info</label>
                <input type="text" value={`Total Space: ${metrics.storageInfo.totalSpace} bytes, Free Space: ${metrics.storageInfo.freeSpace} bytes, Usage: ${metrics.storageInfo.usage}`} readOnly />
            </>
        )
    }
    else {
        return (<p>Loading</p>)
    }
}