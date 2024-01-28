package dev.gordeev.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@SpringBootTest(webEnvironment=RANDOM_PORT)
class MachineInfoControllerTest {

    @Autowired
    private WebTestClient client;

    @Test
    void getInfo() {
        client.get()
                .uri("api/v1/info")
                .accept(APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(APPLICATION_JSON)
                .expectBody()
                .jsonPath("$.operatingSystem").isNotEmpty()
                .jsonPath("$.ramInfo").isNotEmpty()
                .jsonPath("$.storageInfo").isNotEmpty();
    }
}