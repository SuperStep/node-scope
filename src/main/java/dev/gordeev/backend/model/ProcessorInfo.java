package dev.gordeev.backend.model;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Value
@Builder
@Jacksonized
public class ProcessorInfo {
    String description;
    long cores;
    long maxFreq;
    double[] coresLoad;
}
