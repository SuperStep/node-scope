import React, {useLayoutEffect, useState} from "react";
import {Card, CardContent, Typography} from "@mui/material";
import InfoCard from "./Card";
import CPUInfo from "./CPUInfo";
import MemUsageGauge from "./MemUsageGauge";

export default function Home() {

    const [data, setData] = useState();

    const getMetrics = async () => {
        const res = await fetch("/api/v1/info");
        setData(await res.json());
    }

    useLayoutEffect(() => {
        getMetrics().catch(e => console.log(e));
    });

    // <CPUInfo data={data.processorInfo.coresLoad}/>
    // <MemUsageGauge data={data.ramInfo}/>

    if (data) {

        return (
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.operatingSystem}</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            {data.processorInfo.description}
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <article className="flex max-w-xl flex-col items-start justify-center">
                            <div className="flex items-center gap-x-4 text-xs">
                                <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    CPU
                                </a>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <span className="absolute inset-0" />
                                    CPU Usage
                                </h3>
                                <CPUInfo data={data.processorInfo.coresLoad}/>
                            </div>
                        </article>
                        <article className="flex max-w-xl flex-col items-start justify-center">
                            <div className="flex items-center gap-x-4 text-xs">
                                <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    RAM
                                </a>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <span className="absolute inset-0" />
                                    RAM Usage
                                </h3>
                                <MemUsageGauge data={data.ramInfo}/>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<p>Loading...</p>)
    }
}