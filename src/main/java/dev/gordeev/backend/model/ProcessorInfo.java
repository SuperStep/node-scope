package dev.gordeev.backend.model;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class ProcessorInfo {
    long cores;
    String name;
    long maxFreq;
    int usage;
}
