package com.example.ecommerceapi;

import com.example.ecommerceapi.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AddressControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Test
    void patchAddressUpdatesOnlyProvidedFields() throws Exception {
        String token = jwtService.generateToken("customer@commerce.com");

        String listResponse = mockMvc.perform(get("/user/address")
                        .header("Authorization", token))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        long addressId = Long.parseLong(listResponse.replaceAll(".*\"id\":(\\d+).*", "$1"));

        String patchPayload = """
                {
                  "id": %d,
                  "city": "ankara"
                }
                """.formatted(addressId);

        mockMvc.perform(patch("/user/address")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(patchPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(addressId))
                .andExpect(jsonPath("$.city").value("ankara"))
                .andExpect(jsonPath("$.title").value("Ev"));
    }
}
