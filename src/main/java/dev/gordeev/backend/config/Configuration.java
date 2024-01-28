package dev.gordeev.backend.config;

import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.context.annotation.Bean;
import oshi.SystemInfo;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean
    SystemInfo getInfoService() {
        return new SystemInfo();
    }

    @Bean
    JsonMapper getMapper() {
        return JsonMapper.builder().build();
    }

}
