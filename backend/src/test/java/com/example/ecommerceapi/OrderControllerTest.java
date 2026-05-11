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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Test
    void createOrderAndGetOrderDetailWorks() throws Exception {
        String customerToken = jwtService.generateToken("customer@commerce.com");
        String payload = """
                {
                  "address_id": 1,
                  "order_date": "2026-04-25T12:00:00",
                  "card_no": "5555444433332222",
                  "card_name": "Demo Customer",
                  "card_expire_month": 12,
                  "card_expire_year": 2030,
                  "card_ccv": 123,
                  "price": 12.96,
                  "products": [
                    {
                      "product_id": 1,
                      "count": 2,
                      "detail": "family pack"
                    }
                  ]
                }
                """;

        String created = mockMvc.perform(post("/order")
                        .header("Authorization", customerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.products[0].name").exists())
                .andExpect(jsonPath("$.products[0].price").exists())
                .andReturn()
                .getResponse()
                .getContentAsString();

        long orderId = Long.parseLong(created.replaceAll(".*\"id\":(\\d+).*", "$1"));

        mockMvc.perform(get("/order/" + orderId)
                        .header("Authorization", customerToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId))
                .andExpect(jsonPath("$.products[0].product_id").value(1));
    }

    @Test
    void storeCanPatchOrderStatus() throws Exception {
        String customerToken = jwtService.generateToken("customer@commerce.com");
        String storeToken = jwtService.generateToken("store@commerce.com");
        String createPayload = """
                {
                  "address_id": 1,
                  "order_date": "2026-04-25T12:30:00",
                  "card_no": "5555444433332222",
                  "card_name": "Demo Customer",
                  "card_expire_month": 12,
                  "card_expire_year": 2030,
                  "card_ccv": 123,
                  "price": 6.48,
                  "products": [
                    {
                      "product_id": 1,
                      "count": 1,
                      "detail": "single"
                    }
                  ]
                }
                """;

        String created = mockMvc.perform(post("/order")
                        .header("Authorization", customerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createPayload))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        long orderId = Long.parseLong(created.replaceAll(".*\"id\":(\\d+).*", "$1"));

        mockMvc.perform(patch("/order/" + orderId + "/status")
                        .header("Authorization", storeToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"SHIPPED\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SHIPPED"));
    }
}
