package dev.gordeev.backend.controller;

import dev.gordeev.backend.model.MachineInfo;
import dev.gordeev.backend.service.SystemInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MachineInfoController {

    private final SystemInfoService infoService;

    @GetMapping(path = "api/v1/info", produces = "application/json")
    MachineInfo getInfo() {
        return infoService.getMachineInfo();
    }
}
