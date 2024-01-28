package dev.gordeev.backend.service;

import dev.gordeev.backend.model.MachineInfo;
import org.springframework.stereotype.Component;

@Component
public interface SystemInfoService {
    public MachineInfo getMachineInfo();
}
