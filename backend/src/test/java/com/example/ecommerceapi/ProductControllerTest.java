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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Test
    void getMissingProductReturns404() throws Exception {
        mockMvc.perform(get("/products/999999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getProductsReturnsFrontendContractFields() throws Exception {
        mockMvc.perform(get("/products?limit=2&offset=0"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.products").isArray())
                .andExpect(jsonPath("$.total").exists())
                .andExpect(jsonPath("$.limit").value(2))
                .andExpect(jsonPath("$.offset").value(0))
                .andExpect(jsonPath("$.products[0].images[0].index").exists());
    }

    @Test
    void customerCannotCreateProduct() throws Exception {
        String token = jwtService.generateToken("customer@commerce.com");
        String payload = """
                {
                  "name": "Test Product",
                  "description": "Desc",
                  "detail": "Detail",
                  "price": 19.99,
                  "stock": 10,
                  "store_id": 1,
                  "category_id": 1,
                  "rating": 4.2,
                  "sell_count": 0,
                  "images": [
                    {
                      "url": "https://example.com/a.jpg",
                      "index": 0
                    }
                  ]
                }
                """;

        mockMvc.perform(post("/products")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isForbidden());
    }

    @Test
    void storeCanCreateAndPatchProduct() throws Exception {
        String token = jwtService.generateToken("store@commerce.com");
        String createPayload = """
                {
                  "name": "Test Product",
                  "description": "Desc",
                  "detail": "Detail",
                  "price": 19.99,
                  "stock": 10,
                  "store_id": 1,
                  "category_id": 1,
                  "rating": 4.2,
                  "sell_count": 0,
                  "images": [
                    {
                      "url": "https://example.com/a.jpg",
                      "index": 0
                    }
                  ]
                }
                """;

        String created = mockMvc.perform(post("/products")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.store_id").value(1))
                .andReturn()
                .getResponse()
                .getContentAsString();

        long productId = Long.parseLong(created.replaceAll(".*\"id\":(\\d+).*", "$1"));

        String patchPayload = """
                {
                  "price": 29.99
                }
                """;

        mockMvc.perform(patch("/products/" + productId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(patchPayload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.price").value(29.99));
    }
}
