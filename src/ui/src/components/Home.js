import React, {useLayoutEffect, useState} from "react";
import {Card, CardContent, Typography} from "@mui/material";




export function Home() {

    const [data, setData] = useState();

    const getMetrics = async () => {
        const res = await fetch("/api/v1/info");
        const metrics = await res.json();
        setData(metrics);
    }

    useLayoutEffect(() => {
        getMetrics().catch(e => console.log(e));
    });

    if (data) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Card style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Operating System
                        </Typography>
                        <Typography variant="subtitle1">{data.operatingSystem}</Typography>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Uptime
                        </Typography>
                        <Typography variant="subtitle1">{`${data.uptime.days} days, ${data.uptime.hours} hours, ${data.uptime.minutes} minutes`}</Typography>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            RAM Info
                        </Typography>
                        <Typography variant="subtitle1">{data.ramInfo}</Typography>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Processor Info
                        </Typography>
                        <Typography variant="subtitle1">{`${data.processorInfo.name} (Cores: ${data.processorInfo.cores}, Max Frequency: ${data.processorInfo.maxFreq} Hz)`}</Typography>
                    </CardContent>
                </Card>

                <Card style={{ backgroundColor: '#2196f3', color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Storage Info
                        </Typography>
                        <Typography variant="subtitle1">{`Total Space - ${data.storageInfo.totalSpace} bytes, Free Space - ${data.storageInfo.freeSpace} bytes, Usage - ${data.storageInfo.usage}`}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    } else {
        return (<p>Loading</p>)
    }
}