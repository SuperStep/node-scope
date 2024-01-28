package dev.gordeev.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class SystemInfoServiceImplTest {

    @Autowired
    SystemInfoService systemInfoService;
    @Autowired
    JsonMapper mapper;

    @Test
    void getMachineInfo() throws JsonProcessingException {
        log.info(mapper
                .writerWithDefaultPrettyPrinter()
                .writeValueAsString(systemInfoService.getMachineInfo()));
    }
}