# Postman Request Listesi

Base URL:

```txt
{{baseUrl}} = https://ecommerce-api-ap0d.onrender.com
```

Local kullanmak istersen:

```txt
{{baseUrl}} = http://localhost:8080
```

Login sonrasi gelen token icin:

```txt
Authorization: Bearer {{token}}
```

`Bearer` kullanmadan direkt `{{token}}` da calisir, ama Postman icin `Bearer {{token}}` daha temiz.

## Sunum Icin En Onemli Requestler

### Kategoriler

```http
GET {{baseUrl}}/categories
```

Kategori ratingleri backend'de o kategoriye ait urunlerin ortalama rating degerinden hesaplanir.

### Urunler

```http
GET {{baseUrl}}/products?limit=1000&offset=0
```

Bestseller siralamasi icin `sell_count`, fiyatlar icin `price`, gorseller icin `images.url` alanlari kullanilir.

### Kategoriye Gore Urunler

```http
GET {{baseUrl}}/products?category=9&limit=25&offset=0
```

### Tek Urun Detayi

```http
GET {{baseUrl}}/products/25
```

## Public Requestler

### Roles

```http
GET {{baseUrl}}/roles
```

Beklenen roller:

```txt
1 = Admin
2 = Store
3 = Customer
```

### Signup - Customer

```http
POST {{baseUrl}}/signup
Content-Type: application/json
```

```json
{
  "name": "Postman Test",
  "email": "postman.test@example.com",
  "password": "123456",
  "role_id": 3
}
```

Alternatif path:

```http
POST {{baseUrl}}/auth/signup
```

### Signup - Store

```http
POST {{baseUrl}}/signup
Content-Type: application/json
```

```json
{
  "name": "Store Owner",
  "email": "store.owner@example.com",
  "password": "123456",
  "role_id": 2,
  "store": {
    "name": "Demo Store",
    "phone": "5551112233",
    "tax_no": "1234567890",
    "bank_account": "TR000000000000000000000000"
  }
}
```

### Login

```http
POST {{baseUrl}}/login
Content-Type: application/json
```

```json
{
  "email": "postman.test@example.com",
  "password": "123456"
}
```

Alternatif path:

```http
POST {{baseUrl}}/auth/login
```

Login response icindeki `token` degerini Postman variable olarak `token` adiyla kaydet.

### Verify Token

```http
GET {{baseUrl}}/verify
Authorization: Bearer {{token}}
```

Alternatif path:

```http
GET {{baseUrl}}/auth/verify
```

### Tum Kategoriler

```http
GET {{baseUrl}}/categories
```

### Tek Kategori

```http
GET {{baseUrl}}/categories/9
```

### Tum Urunler

```http
GET {{baseUrl}}/products?limit=1000&offset=0
```

### Sayfali Urunler

```http
GET {{baseUrl}}/products?limit=25&offset=0
```

```http
GET {{baseUrl}}/products?limit=25&offset=25
```

### Kategori Filtresi

```http
GET {{baseUrl}}/products?category=9&limit=25&offset=0
```

### Arama Filtresi

```http
GET {{baseUrl}}/products?filter=sneaker&limit=25&offset=0
```

### Fiyat Siralama

```http
GET {{baseUrl}}/products?sort=price:asc&limit=25&offset=0
```

```http
GET {{baseUrl}}/products?sort=price:desc&limit=25&offset=0
```

### Rating Siralama

```http
GET {{baseUrl}}/products?sort=rating:desc&limit=25&offset=0
```

### Tek Urun

```http
GET {{baseUrl}}/products/25
```

## Token Gerektiren Requestler

Bu requestlerde Header ekle:

```txt
Authorization: Bearer {{token}}
```

### Current User

```http
GET {{baseUrl}}/user
```

### Adresleri Getir

```http
GET {{baseUrl}}/user/address
```

### Adres Ekle

```http
POST {{baseUrl}}/user/address
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "title": "Ev",
  "name": "Gizem",
  "surname": "Gunduz",
  "phone": "5551112233",
  "city": "Istanbul",
  "district": "Kadikoy",
  "neighborhood": "Moda",
  "address": "Caferağa Mah. Demo Sok. No: 1"
}
```

### Adres Guncelle

```http
PUT {{baseUrl}}/user/address
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "id": 1,
  "title": "Ev Guncel",
  "name": "Gizem",
  "surname": "Gunduz",
  "phone": "5551112233",
  "city": "Istanbul",
  "district": "Kadikoy",
  "neighborhood": "Moda",
  "address": "Guncel adres"
}
```

### Adres Sil

```http
DELETE {{baseUrl}}/user/address/1
Authorization: Bearer {{token}}
```

### Kartlari Getir

```http
GET {{baseUrl}}/user/card
Authorization: Bearer {{token}}
```

### Kart Ekle

```http
POST {{baseUrl}}/user/card
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "name_on_card": "Gizem Gunduz",
  "card_no": "4111111111111111",
  "expire_month": 12,
  "expire_year": 2028
}
```

### Kart Guncelle

```http
PUT {{baseUrl}}/user/card
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "id": 1,
  "name_on_card": "Gizem Gunduz",
  "card_no": "4111111111111111",
  "expire_month": 11,
  "expire_year": 2029
}
```

### Kart Sil

```http
DELETE {{baseUrl}}/user/card/1
Authorization: Bearer {{token}}
```

### Siparisleri Getir

```http
GET {{baseUrl}}/order
Authorization: Bearer {{token}}
```

### Siparis Olustur

```http
POST {{baseUrl}}/order
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "address_id": 1,
  "order_date": "2026-05-12T12:00:00",
  "card_no": "4111111111111111",
  "card_name": "Gizem Gunduz",
  "card_expire_month": 12,
  "card_expire_year": 2028,
  "card_ccv": 123,
  "price": 75.0,
  "products": [
    {
      "product_id": 25,
      "count": 1,
      "detail": "Turuncu sneaker"
    }
  ]
}
```

## Notlar

- Product create/update/delete endpointi controller'da acik degil; sadece `GET /products` ve `GET /products/{id}` var.
- Category create/update/delete endpointi controller'da acik degil; sadece `GET /categories` ve `GET /categories/{id}` var.
- `sort` icin sadece `price` ve `rating` alanlari destekleniyor.
- Bestseller frontend tarafinda `sell_count` degerine gore siralaniyor.
