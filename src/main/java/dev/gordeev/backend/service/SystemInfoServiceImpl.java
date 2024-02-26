package dev.gordeev.backend.service;

import dev.gordeev.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.HWDiskStore;
import oshi.software.os.OSFileStore;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class SystemInfoServiceImpl implements SystemInfoService {

    private final SystemInfo systemInfo;

    @Override
    public MachineInfo getMachineInfo() {

        return MachineInfo.builder()
                .uptime(getSystemUptime())
                .processorInfo(getProcessorInfo())
                .operatingSystem(systemInfo.getOperatingSystem().toString())
                .ramInfo(getRamInfo())
                .storageInfo(getStorageInfo())
                .build();
    }

    private SystemUptime getSystemUptime() {
        return new SystemUptime(Duration.ofSeconds(systemInfo.getOperatingSystem().getSystemUptime()));
    }

    private ProcessorInfo getProcessorInfo() {
        return ProcessorInfo.builder()
                .coresLoad(systemInfo.getHardware().getProcessor().getProcessorCpuLoad(1000))
                .description(systemInfo.getHardware().getProcessor().toString())
                .cores(systemInfo.getHardware().getProcessor().getPhysicalProcessors().size())
                .maxFreq(systemInfo.getHardware().getProcessor().getMaxFreq())
                .build();
    }

    private RAMInfo getRamInfo() {
        return RAMInfo.builder()
                .total(systemInfo.getHardware().getMemory().getTotal())
                .available(systemInfo.getHardware().getMemory().getAvailable())
                .build();


    }

    private StorageInfo getStorageInfo() {

        long actualBits = systemInfo.getHardware().getDiskStores().stream()
                .mapToLong(HWDiskStore::getSize)
                .sum();

        var stores = systemInfo.getOperatingSystem().getFileSystem().getFileStores();
        long total = stores.stream()
                .mapToLong(OSFileStore::getTotalSpace)
                .sum();
        long free = stores.stream()
                .mapToLong(OSFileStore::getFreeSpace)
                .sum();
        int percent = getDriveUsagePercent(total, free);

        return StorageInfo.builder()
                .totalSpace(actualBits)
                .freeSpace(actualBits - (actualBits * percent / 100))
                .totalActual(getConvertedCapacity(actualBits))
                .usage(percent)
                .build();
    }

    private int getDriveUsagePercent(long total, long free) {
        return (int) Math.round(((double) (total - free) / total) * 100);
    }

    private String getConvertedCapacity(final long bits)
    {
        if ((bits / 1.049E+6) > 999)
        {
            if ((bits / 1.074E+9) > 999)
            {
                return (Math.round((bits / 1.1E+12) * 10.0) / 10.0) + " TiB";
            }
            else
            {
                return Math.round(bits / 1.074E+9) + " GiB";
            }
        }
        else
        {
            return Math.round(bits / 1.049E+6) + " MiB";
        }
    }

}
