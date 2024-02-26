import React, {useLayoutEffect, useState} from "react";
import CPUInfo from "./CPUInfo";
import MemUsageGauge from "./MemUsageGauge";
import DiskUsage from "./DiskUsage";

export default function Home() {

    const [data, setData] = useState();

    const getMetrics = async () => {
        const res = await fetch("/api/v1/info");
        setData(await res.json());
    }

    useLayoutEffect(() => {
        getMetrics().catch(e => console.log(e));
    });

    if (data) {

        return (
            <div className="container my-24 mx-auto md:px-6">
                <section className="mb-32 text-center">
                    <h2 className="mb-12 pb-4 text-center text-3xl font-bold">
                        {data.operatingSystem}
                    </h2>

                    <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12">
                        <div className="mb-6 lg:mb-0">
                            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                <h5 className="mb-3 text-lg font-bold pt-6">CPU Usage</h5>
                                <div className="p-10">
                                    <CPUInfo data={data.processorInfo.coresLoad}/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 lg:mb-0">
                            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                <h5 className="mb-3 text-lg font-bold pt-6">RAM Usage</h5>
                                <div className="p-10">
                                    <MemUsageGauge data={data.ramInfo}/>
                                </div>
                            </div>
                        </div>

                        <div className="mb-0">
                            <div
                                className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                                <h5 className="mb-3 text-lg font-bold pt-6">Disk Usage</h5>
                                <div className="p-10">
                                    <DiskUsage data={data.storageInfo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    } else {
        return (<p>Loading...</p>)
    }
}