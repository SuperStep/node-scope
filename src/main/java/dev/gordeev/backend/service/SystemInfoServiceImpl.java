package dev.gordeev.backend.service;

import dev.gordeev.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.software.os.OSFileStore;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class SystemInfoServiceImpl implements SystemInfoService {

    private final SystemInfo systemInfo;
    private static final String STORAGE_REGEX = "\\(.{1,15} .{1,15} .{1,15}\\)";

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

        var stores = systemInfo.getOperatingSystem().getFileSystem().getFileStores();

        long total = stores.stream().mapToLong(OSFileStore::getTotalSpace).sum();
        long free = stores.stream().mapToLong(OSFileStore::getFreeSpace).sum();

        return StorageInfo.builder()
                .totalSpace(total)
                .freeSpace(free)
                .usage(getDriveUsagePercent(total, free))
                .build();
    }

    private int getDriveUsagePercent(long total, long free) {
        return (int) Math.round(((double) (total - free) / total) * 100);
    }

}
