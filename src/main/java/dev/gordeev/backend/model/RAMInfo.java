package dev.gordeev.backend.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class RAMInfo {
    long total;
    long available;
}
