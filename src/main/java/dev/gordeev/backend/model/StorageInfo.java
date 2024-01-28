package dev.gordeev.backend.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class StorageInfo {
    long totalSpace;
    long freeSpace;
    String usage;
}
