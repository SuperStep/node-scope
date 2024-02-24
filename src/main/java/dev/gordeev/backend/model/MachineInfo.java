package dev.gordeev.backend.model;

import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.util.Set;

@Value
@Builder
@ToString
@Jacksonized
public class MachineInfo {

    String operatingSystem;
    SystemUptime uptime;
    RAMInfo ramInfo;
    ProcessorInfo processorInfo;
    StorageInfo storageInfo;
}
