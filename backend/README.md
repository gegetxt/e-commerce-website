# E-commerce API

Bu klasor, repo icindeki React frontend'in bekledigi endpoint sozlesmesini koruyan Spring Boot backend'idir.

## Architecture

- Frontend uyumu icin legacy endpointler korunur.
- Ic mimari `Controller -> Request DTO -> Service -> Entity/Repository -> Mapper -> Response DTO` seklindedir.
- Entity siniflari dogrudan API response olarak donulmez.
- Mapper katmani entity/DTO donusumlerini merkezilestirir.
- `PUT` tam guncelleme, `PATCH` kismi guncelleme icin ayridir.

## Main Endpoints

Legacy frontend endpointleri:

- `POST /signup`
- `POST /login`
- `GET /verify`
- `GET /roles`
- `GET /categories`
- `GET /products`
- `GET /products/{id}`
- `GET/POST/PUT/PATCH/DELETE /user/address`
- `GET/POST/PUT/PATCH/DELETE /user/card`
- `GET/POST /order`

RESTful alias endpointleri:

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/verify`
- `GET/POST/PUT/PATCH/DELETE /users/me/addresses`
- `GET/POST/PUT/PATCH/DELETE /users/me/cards`

## Environment Variables

Hassas veriler `application.properties` icine sabit yazilmak yerine environment variable ile yonetilir.

Gerekli degiskenler:

- `DB_URL` varsayilan: `jdbc:postgresql://localhost:5432/ecommerce_api`
- `DB_USERNAME` varsayilan: `postgres`
- `DB_PASSWORD` varsayilan: `123456`
- `JWT_SECRET`
- `JWT_EXPIRATION_MINUTES`
- `DDL_AUTO` varsayilan: `update`

PowerShell ornegi:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/ecommerce_api"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="123456"
$env:JWT_SECRET="cok-daha-guclu-bir-secret"
$env:JWT_EXPIRATION_MINUTES="1440"
```

## Run

```bash
cd backend
mvn spring-boot:run
```

## Technical Improvements

- DTO bazli API kontrati
- Merkezi mapper katmani
- Legacy ve RESTful endpointlerin birlikte desteklenmesi
- Address ve credit card modullerinde PATCH destegi
- Stok kontrolu ve order sirasinda stock dusurme mantigi
- Ayrik custom exception yapisi
- Environment variable tabanli config
- Temel test kapsami
