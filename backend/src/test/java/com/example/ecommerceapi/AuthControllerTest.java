package com.example.ecommerceapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void signupReturnsConflictWhenEmailAlreadyExists() throws Exception {
        String payload = """
                {
                  "name": "Existing User",
                  "email": "customer@commerce.com",
                  "password": "123456",
                  "role_id": 1
                }
                """;

        mockMvc.perform(post("/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void loginReturnsUnauthorizedWhenPasswordIsWrong() throws Exception {
        String payload = """
                {
                  "email": "customer@commerce.com",
                  "password": "wrong-password"
                }
                """;

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void verifyReturnsUnauthorizedForInvalidToken() throws Exception {
        mockMvc.perform(get("/verify")
                        .header("Authorization", "invalid-token"))
                .andExpect(status().isUnauthorized());
    }
}
