package dev.gordeev.backend.service;

import dev.gordeev.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HWDiskStore;
import oshi.hardware.HardwareAbstractionLayer;

import java.time.Duration;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

        long total = systemInfo.getHardware().getDiskStores().stream().mapToLong(HWDiskStore::getSize).sum();

        String usageDescription = "";

        Optional<HWDiskStore> store = systemInfo.getHardware().getDiskStores().stream().findFirst();
        if(store.isPresent()) {
            HWDiskStore diskStore = store.get();
            usageDescription = diskStore.getModel();
            Matcher matcher = Pattern.compile(STORAGE_REGEX).matcher(diskStore.getModel());
            if (matcher.find()) {
                usageDescription = usageDescription.substring(0, matcher.start() - 1);
            }
            usageDescription = usageDescription.trim();
        }

        return StorageInfo.builder()
                .totalSpace(total)
                .freeSpace(0L)
                .usage(usageDescription)
                .build();
    }

    private int getDriveUsagePercent(long total, long free) {
        return (int) Math.round(((double) (total - free) / total) * 100);
    }


}
