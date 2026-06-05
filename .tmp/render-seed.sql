--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS fk_users_store;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS fk_users_role;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS fk_products_store;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS fk_products_category;
ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS fk_product_images_product;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS fk_orders_user;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS fk_orders_address;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS fk_order_items_product;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS fk_order_items_order;
ALTER TABLE IF EXISTS ONLY public.credit_cards DROP CONSTRAINT IF EXISTS fk_credit_cards_user;
ALTER TABLE IF EXISTS ONLY public.addresses DROP CONSTRAINT IF EXISTS fk_addresses_user;
DROP INDEX IF EXISTS public.idx_users_store_id;
DROP INDEX IF EXISTS public.idx_users_role_id;
DROP INDEX IF EXISTS public.idx_products_store_id;
DROP INDEX IF EXISTS public.idx_products_name;
DROP INDEX IF EXISTS public.idx_products_category_id;
DROP INDEX IF EXISTS public.idx_product_images_product_id;
DROP INDEX IF EXISTS public.idx_orders_user_id;
DROP INDEX IF EXISTS public.idx_orders_status;
DROP INDEX IF EXISTS public.idx_orders_address_id;
DROP INDEX IF EXISTS public.idx_order_items_product_id;
DROP INDEX IF EXISTS public.idx_order_items_order_id;
DROP INDEX IF EXISTS public.idx_credit_cards_user_id;
DROP INDEX IF EXISTS public.idx_addresses_user_id;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.stores DROP CONSTRAINT IF EXISTS stores_tax_no_key;
ALTER TABLE IF EXISTS ONLY public.stores DROP CONSTRAINT IF EXISTS stores_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_code_key;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS product_images_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.credit_cards DROP CONSTRAINT IF EXISTS credit_cards_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_code_key;
ALTER TABLE IF EXISTS ONLY public.addresses DROP CONSTRAINT IF EXISTS addresses_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stores ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_images ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.credit_cards ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.addresses ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.stores_id_seq;
DROP TABLE IF EXISTS public.stores;
DROP SEQUENCE IF EXISTS public.roles_id_seq;
DROP TABLE IF EXISTS public.roles;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.product_images_id_seq;
DROP TABLE IF EXISTS public.product_images;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.order_items_id_seq;
DROP TABLE IF EXISTS public.order_items;
DROP SEQUENCE IF EXISTS public.credit_cards_id_seq;
DROP TABLE IF EXISTS public.credit_cards;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
DROP SEQUENCE IF EXISTS public.addresses_id_seq;
DROP TABLE IF EXISTS public.addresses;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.addresses (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(150) NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    city character varying(100) NOT NULL,
    district character varying(100) NOT NULL,
    neighborhood character varying(1000) NOT NULL,
    address character varying(2000)
);


--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    code character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    gender character varying(255) NOT NULL,
    img character varying(255),
    rating double precision DEFAULT 0
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: credit_cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.credit_cards (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    card_no character varying(20) NOT NULL,
    expire_month integer NOT NULL,
    expire_year integer NOT NULL,
    name_on_card character varying(100) NOT NULL,
    CONSTRAINT credit_cards_expire_month_check CHECK (((expire_month >= 1) AND (expire_month <= 12)))
);


--
-- Name: credit_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: credit_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_cards_id_seq OWNED BY public.credit_cards.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    count integer NOT NULL,
    detail character varying(1000),
    price numeric(10,2) NOT NULL,
    name character varying(255) NOT NULL,
    CONSTRAINT order_items_count_check CHECK ((count > 0)),
    CONSTRAINT order_items_price_check CHECK ((price >= (0)::numeric))
);


--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    address_id bigint NOT NULL,
    order_date timestamp without time zone NOT NULL,
    card_no character varying(255) NOT NULL,
    card_name character varying(255) NOT NULL,
    card_expire_month integer NOT NULL,
    card_expire_year integer NOT NULL,
    price numeric(10,2) NOT NULL,
    status character varying(255) DEFAULT 'CREATED'::character varying NOT NULL,
    CONSTRAINT orders_card_expire_month_check CHECK (((card_expire_month >= 1) AND (card_expire_month <= 12))),
    CONSTRAINT orders_price_check CHECK ((price > (0)::numeric))
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_images (
    id bigint NOT NULL,
    product_id bigint NOT NULL,
    url character varying(255) NOT NULL,
    image_index integer DEFAULT 0 NOT NULL
);


--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(2000) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    store_id bigint NOT NULL,
    category_id bigint NOT NULL,
    rating double precision DEFAULT 0,
    sell_count integer DEFAULT 0 NOT NULL,
    detail character varying(500),
    CONSTRAINT products_price_check CHECK ((price > (0)::numeric)),
    CONSTRAINT products_sell_count_check CHECK ((sell_count >= 0)),
    CONSTRAINT products_stock_check CHECK ((stock >= 0))
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: stores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stores (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    tax_no character varying(255) NOT NULL,
    bank_account character varying(255) NOT NULL,
    approved boolean NOT NULL
);


--
-- Name: stores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stores_id_seq OWNED BY public.stores.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role_id bigint NOT NULL,
    store_id bigint,
    active boolean NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: credit_cards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_cards ALTER COLUMN id SET DEFAULT nextval('public.credit_cards_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: stores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores ALTER COLUMN id SET DEFAULT nextval('public.stores_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.addresses (id, user_id, title, name, surname, phone, city, district, neighborhood, address) FROM stdin;
2	1	ev	merve	boluğur	05356784499	ankara	çankaya	karum işhanı yanı	
4	7	ev adresi	Alişan	Karababa	05376845834	istanbul	esenler	fatih mah	Sokak 5, No 12
5	8	ankara	gizem	gündüz	05193452356	ankara	çankaya	ikbal mahallesi	ankara
6	10	Is Yeri Adresi	Test	Kullanici	05551234567	ankara	kadikoy	fenerbahce mah	Test Sokak No 5
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, code, title, gender, img, rating) FROM stdin;
14	e:tisort	Tişört	e	/e-commerce-photos/category_erkek_tisort.png	4.3
2	k:ayakkabi	Ayakkabı	k	/e-commerce-photos/category_kadin_ayakkabi.png	4.9
3	k:ceket	Ceket	k	/e-commerce-photos/category_kadin_ceket.png	3.8
4	k:elbise	Elbise	k	/e-commerce-photos/category_kadin_elbise.png	4.1
5	k:etek	Etek	k	/e-commerce-photos/category_kadin_etek.png	3.9
6	k:gomlek	Gömlek	k	/e-commerce-photos/category_kadin_gomlek.png	3.1
7	k:kazak	Kazak	k	/e-commerce-photos/category_kadin_kazak.png	2.9
8	k:pantalon	Pantalon	k	/e-commerce-photos/category_kadin_pantalon.png	3.8
1	k:tisort	Tişört	k	/e-commerce-photos/category_kadin_tisort.png	4.2
9	e:ayakkabı	Ayakkabı	e	/e-commerce-photos/category_erkek_ayakkabi.png	4.6
10	e:ceket	Ceket	e	/e-commerce-photos/category_erkek_ceket.png	4.1
11	e:gomlek	Gömlek	e	/e-commerce-photos/category_erkek_gomlek.png	3.9
12	e:kazak	Kazak	e	/e-commerce-photos/category_erkek_kazak.png	3.2
13	e:pantalon	Pantalon	e	/e-commerce-photos/category_erkek_pantalon.png	3.5
\.


--
-- Data for Name: credit_cards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_cards (id, user_id, card_no, expire_month, expire_year, name_on_card) FROM stdin;
2	1	1111222233334444	9	2027	merve boluğur
3	7	1234123412341234	12	2025	Ali Baş
4	7	1234123412341234	12	2025	Ali Yeni İsim
5	8	1111222233334444	5	2027	gizem
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (id, order_id, product_id, count, detail, price, name) FROM stdin;
1	15	11	1	Yeşil Desenli Crop Tişört	84.00	Yeşil Desenli Crop Tişört
2	15	16	1	Turuncu Pop Art Graphic Tişört	89.00	Turuncu Pop Art Graphic Tişört
3	15	34	1	Siyah Tasarımlı Sandalet	88.00	Siyah Tasarımlı Sandalet
5	18	4	1	test detay	64.49	Turuncu Basic Crew Neck Tişört
6	19	23	1	Mavi Tasarımlı Sneaker	59.00	Mavi Tasarımlı Sneaker
7	20	19	1	Yeşil Şerit Yakalı Polo Tişört	79.90	Yeşil Şerit Yakalı Polo Tişört
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, user_id, address_id, order_date, card_no, card_name, card_expire_month, card_expire_year, price, status) FROM stdin;
15	1	2	2026-04-27 00:57:03	1111222233334444	merve boluğur	9	2027	290.99	CREATED
18	7	4	2026-05-02 10:30:00	1234123412341234	Ali Baş	12	2025	250.00	CREATED
19	8	5	2026-05-02 17:16:57	1111222233334444	gizem	5	2027	88.99	CREATED
20	8	5	2026-05-02 18:28:43	1111222233334444	gizem	5	2027	109.89	CREATED
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_images (id, product_id, url, image_index) FROM stdin;
26	2	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_blue_1.png	0
27	2	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_blue_2.png	1
28	3	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_green_1.png	0
29	3	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_green_2.png	1
30	4	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_orange_1.png	0
31	4	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_orange_2.png	1
32	5	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_black_1.png	0
33	5	/e-commerce-photos/kadin_tisort_01_basic-crew-neck_black_2.png	1
34	6	/e-commerce-photos/kadin_tisort_02_oversized_blue_1.png	0
35	6	/e-commerce-photos/kadin_tisort_02_oversized_blue_2.png	1
36	7	/e-commerce-photos/kadin_tisort_02_oversized_green_1.png	0
37	7	/e-commerce-photos/kadin_tisort_02_oversized_green_2.png	1
38	8	/e-commerce-photos/kadin_tisort_02_oversized_orange_1.png	0
39	8	/e-commerce-photos/kadin_tisort_02_oversized_orange_2.png	1
40	9	/e-commerce-photos/kadin_tisort_02_oversized_black_1.png	0
41	9	/e-commerce-photos/kadin_tisort_02_oversized_black_2.png	1
42	10	/e-commerce-photos/kadin_tisort_03_crop_blue_1.png	0
43	10	/e-commerce-photos/kadin_tisort_03_crop_blue_2.png	1
44	11	/e-commerce-photos/kadin_tisort_03_crop_green_1.png	0
45	11	/e-commerce-photos/kadin_tisort_03_crop_green_2.png	1
46	12	/e-commerce-photos/kadin_tisort_03_crop_orange_1.png	0
47	12	/e-commerce-photos/kadin_tisort_03_crop_orange_2.png	1
48	13	/e-commerce-photos/kadin_tisort_03_crop_black_1.png	0
49	13	/e-commerce-photos/kadin_tisort_03_crop_black_2.png	1
50	14	/e-commerce-photos/kadin_tisort_04_graphic_blue_1.png	0
51	14	/e-commerce-photos/kadin_tisort_04_graphic_blue_2.png	1
52	15	/e-commerce-photos/kadin_tisort_04_graphic_green_1.png	0
53	15	/e-commerce-photos/kadin_tisort_04_graphic_green_2.png	1
54	16	/e-commerce-photos/kadin_tisort_04_graphic_orange_1.png	0
55	16	/e-commerce-photos/kadin_tisort_04_graphic_orange_2.png	1
56	17	/e-commerce-photos/kadin_tisort_04_graphic_black_1.png	0
57	17	/e-commerce-photos/kadin_tisort_04_graphic_black_2.png	1
58	18	/e-commerce-photos/kadin_tisort_05_polo_blue_1.png	0
59	18	/e-commerce-photos/kadin_tisort_05_polo_blue_2.png	1
60	19	/e-commerce-photos/kadin_tisort_05_polo_green_1.png	0
61	19	/e-commerce-photos/kadin_tisort_05_polo_green_2.png	1
62	20	/e-commerce-photos/kadin_tisort_05_polo_orange_1.png	0
63	20	/e-commerce-photos/kadin_tisort_05_polo_orange_2.png	1
64	21	/e-commerce-photos/kadin_tisort_05_polo_black_1.png	0
65	21	/e-commerce-photos/kadin_tisort_05_polo_black_2.png	1
66	22	/e-commerce-photos/kadin_ayakkabi_01_sneaker_black_1.png	0
67	22	/e-commerce-photos/kadin_ayakkabi_01_sneaker_black_2.png	1
68	23	/e-commerce-photos/kadin_ayakkabi_01_sneaker_blue_1.png	0
69	23	/e-commerce-photos/kadin_ayakkabi_01_sneaker_blue_2.png	1
70	24	/e-commerce-photos/kadin_ayakkabi_01_sneaker_green_1.png	0
71	24	/e-commerce-photos/kadin_ayakkabi_01_sneaker_green_2.png	1
72	25	/e-commerce-photos/kadin_ayakkabi_01_sneaker_orange_1.png	0
73	25	/e-commerce-photos/kadin_ayakkabi_01_sneaker_orange_2.png	1
74	26	/e-commerce-photos/kadin_ayakkabi_02_running_black_1.png	0
75	26	/e-commerce-photos/kadin_ayakkabi_02_running_black_2.png	1
76	27	/e-commerce-photos/kadin_ayakkabi_02_running_blue_1.png	0
77	27	/e-commerce-photos/kadin_ayakkabi_02_running_blue_2.png	1
78	28	/e-commerce-photos/kadin_ayakkabi_02_running_green_1.png	0
79	28	/e-commerce-photos/kadin_ayakkabi_02_running_green_2.png	1
80	29	/e-commerce-photos/kadin_ayakkabi_02_running_orange_1.png	0
81	29	/e-commerce-photos/kadin_ayakkabi_02_running_orange_2.png	1
82	30	/e-commerce-photos/kadin_ayakkabi_03_loafer_black_1.png	0
83	30	/e-commerce-photos/kadin_ayakkabi_03_loafer_black_2.png	1
84	31	/e-commerce-photos/kadin_ayakkabi_03_loafer_blue_1.png	0
85	31	/e-commerce-photos/kadin_ayakkabi_03_loafer_blue_2.png	1
86	32	/e-commerce-photos/kadin_ayakkabi_03_loafer_green_1.png	0
87	32	/e-commerce-photos/kadin_ayakkabi_03_loafer_green_2.png	1
88	33	/e-commerce-photos/kadin_ayakkabi_03_loafer_orange_1.png	0
89	33	/e-commerce-photos/kadin_ayakkabi_03_loafer_orange_2.png	1
90	34	/e-commerce-photos/kadin_ayakkabi_04_sandal_black_1.png	0
91	34	/e-commerce-photos/kadin_ayakkabi_04_sandal_black_2.png	1
92	35	/e-commerce-photos/kadin_ayakkabi_04_sandal_blue_1.png	0
93	35	/e-commerce-photos/kadin_ayakkabi_04_sandal_blue_2.png	1
94	36	/e-commerce-photos/kadin_ayakkabi_04_sandal_green_1.png	0
95	36	/e-commerce-photos/kadin_ayakkabi_04_sandal_green_2.png	1
96	37	/e-commerce-photos/kadin_ayakkabi_04_sandal_orange_1.png	0
97	37	/e-commerce-photos/kadin_ayakkabi_04_sandal_orange_2.png	1
98	38	/e-commerce-photos/kadin_ayakkabi_05_boot_black_1.png	0
99	38	/e-commerce-photos/kadin_ayakkabi_05_boot_black_2.png	1
100	39	/e-commerce-photos/kadin_ayakkabi_05_boot_blue_1.png	0
101	39	/e-commerce-photos/kadin_ayakkabi_05_boot_blue_2.png	1
102	40	/e-commerce-photos/kadin_ayakkabi_05_boot_green_1.png	0
103	40	/e-commerce-photos/kadin_ayakkabi_05_boot_green_2.png	1
104	41	/e-commerce-photos/kadin_ayakkabi_05_boot_orange_1.png	0
105	41	/e-commerce-photos/kadin_ayakkabi_05_boot_orange_2.png	1
106	42	/e-commerce-photos/male_shoes_01_sneakers_blue_1.png	0
107	42	/e-commerce-photos/male_shoes_01_sneakers_blue_2.png	1
108	43	/e-commerce-photos/male_shoes_01_sneakers_green_1.png	0
109	43	/e-commerce-photos/male_shoes_01_sneakers_green_2.png	1
110	44	/e-commerce-photos/male_shoes_01_sneakers_orange_1.png	0
111	44	/e-commerce-photos/male_shoes_01_sneakers_orange_2.png	1
112	45	/e-commerce-photos/male_shoes_01_sneakers_black_1.png	0
113	45	/e-commerce-photos/male_shoes_01_sneakers_black_2.png	1
114	46	/e-commerce-photos/male_shoes_02_dress_shoes_blue_1.png	0
115	46	/e-commerce-photos/male_shoes_02_dress_shoes_blue_2.png	1
116	47	/e-commerce-photos/male_shoes_02_dress_shoes_green_1.png	0
117	47	/e-commerce-photos/male_shoes_02_dress_shoes_green_2.png	1
118	48	/e-commerce-photos/male_shoes_02_dress_shoes_orange_1.png	0
119	48	/e-commerce-photos/male_shoes_02_dress_shoes_orange_2.png	1
120	49	/e-commerce-photos/male_shoes_02_dress_shoes_black_1.png	0
121	49	/e-commerce-photos/male_shoes_02_dress_shoes_black_2.png	1
122	50	/e-commerce-photos/male_shoes_03_boots_blue_1.png	0
123	50	/e-commerce-photos/male_shoes_03_boots_blue_2.png	1
124	51	/e-commerce-photos/male_shoes_03_boots_green_1.png	0
125	51	/e-commerce-photos/male_shoes_03_boots_green_2.png	1
126	52	/e-commerce-photos/male_shoes_03_boots_orange_1.png	0
127	52	/e-commerce-photos/male_shoes_03_boots_orange_2.png	1
128	53	/e-commerce-photos/male_shoes_03_boots_black_1.png	0
129	53	/e-commerce-photos/male_shoes_03_boots_black_2.png	1
130	54	/e-commerce-photos/male_shoes_04_loafers_blue_1.png	0
131	54	/e-commerce-photos/male_shoes_04_loafers_blue_2.png	1
132	55	/e-commerce-photos/male_shoes_04_loafers_green_1.png	0
133	55	/e-commerce-photos/male_shoes_04_loafers_green_2.png	1
134	56	/e-commerce-photos/male_shoes_04_loafers_orange_1.png	0
135	56	/e-commerce-photos/male_shoes_04_loafers_orange_2.png	1
136	57	/e-commerce-photos/male_shoes_04_loafers_black_1.png	0
137	57	/e-commerce-photos/male_shoes_04_loafers_black_2.png	1
138	58	/e-commerce-photos/male_shoes_05_running_shoes_blue_1.png	0
139	58	/e-commerce-photos/male_shoes_05_running_shoes_blue_2.png	1
140	59	/e-commerce-photos/male_shoes_05_running_shoes_green_1.png	0
141	59	/e-commerce-photos/male_shoes_05_running_shoes_green_2.png	1
142	60	/e-commerce-photos/male_shoes_05_running_shoes_orange_1.png	0
143	60	/e-commerce-photos/male_shoes_05_running_shoes_orange_2.png	1
144	61	/e-commerce-photos/male_shoes_05_running_shoes_black_1.png	0
145	61	/e-commerce-photos/male_shoes_05_running_shoes_black_2.png	1
146	62	/e-commerce-photos/male_shirt_01_button_down_shirt_blue_1.png	0
147	62	/e-commerce-photos/male_shirt_01_button_down_shirt_blue_2.png	1
148	63	/e-commerce-photos/male_shirt_01_button_down_shirt_green_1.png	0
149	63	/e-commerce-photos/male_shirt_01_button_down_shirt_green_2.png	1
150	64	/e-commerce-photos/male_shirt_01_button_down_shirt_orange_1.png	0
151	64	/e-commerce-photos/male_shirt_01_button_down_shirt_orange_2.png	1
152	65	/e-commerce-photos/male_shirt_01_button_down_shirt_black_1.png	0
153	65	/e-commerce-photos/male_shirt_01_button_down_shirt_black_2.png	1
154	66	/e-commerce-photos/male_shirt_02_oxford_shirt_blue_1.png	0
155	66	/e-commerce-photos/male_shirt_02_oxford_shirt_blue_2.png	1
156	67	/e-commerce-photos/male_shirt_02_oxford_shirt_green_1.png	0
157	67	/e-commerce-photos/male_shirt_02_oxford_shirt_green_2.png	1
158	68	/e-commerce-photos/male_shirt_02_oxford_shirt_orange_1.png	0
159	68	/e-commerce-photos/male_shirt_02_oxford_shirt_orange_2.png	1
160	69	/e-commerce-photos/male_shirt_02_oxford_shirt_black_1.png	0
161	69	/e-commerce-photos/male_shirt_02_oxford_shirt_black_2.png	1
162	70	/e-commerce-photos/male_shirt_03_linen_shirt_blue_1.png	0
163	70	/e-commerce-photos/male_shirt_03_linen_shirt_blue_2.png	1
164	71	/e-commerce-photos/male_shirt_03_linen_shirt_green_1.png	0
165	71	/e-commerce-photos/male_shirt_03_linen_shirt_green_2.png	1
166	72	/e-commerce-photos/male_shirt_03_linen_shirt_orange_1.png	0
167	72	/e-commerce-photos/male_shirt_03_linen_shirt_orange_2.png	1
168	73	/e-commerce-photos/male_shirt_03_linen_shirt_black_1.png	0
169	73	/e-commerce-photos/male_shirt_03_linen_shirt_black_2.png	1
170	74	/e-commerce-photos/male_shirt_04_flannel_shirt_blue_1.png	0
171	74	/e-commerce-photos/male_shirt_04_flannel_shirt_blue_2.png	1
172	75	/e-commerce-photos/male_shirt_04_flannel_shirt_green_1.png	0
173	75	/e-commerce-photos/male_shirt_04_flannel_shirt_green_2.png	1
174	76	/e-commerce-photos/male_shirt_04_flannel_shirt_orange_1.png	0
175	76	/e-commerce-photos/male_shirt_04_flannel_shirt_orange_2.png	1
176	77	/e-commerce-photos/male_shirt_04_flannel_shirt_black_1.png	0
177	77	/e-commerce-photos/male_shirt_04_flannel_shirt_black_2.png	1
178	78	/e-commerce-photos/male_shirt_05_denim_shirt_blue_1.png	0
179	78	/e-commerce-photos/male_shirt_05_denim_shirt_blue_2.png	1
180	79	/e-commerce-photos/male_shirt_05_denim_shirt_green_1.png	0
181	79	/e-commerce-photos/male_shirt_05_denim_shirt_green_2.png	1
182	80	/e-commerce-photos/male_shirt_05_denim_shirt_orange_1.png	0
183	80	/e-commerce-photos/male_shirt_05_denim_shirt_orange_2.png	1
184	81	/e-commerce-photos/male_shirt_05_denim_shirt_black_1.png	0
185	81	/e-commerce-photos/male_shirt_05_denim_shirt_black_2.png	1
186	82	/e-commerce-photos/male_sweater_01_crewneck_sweater_blue_1.png	0
187	82	/e-commerce-photos/male_sweater_01_crewneck_sweater_blue_2.png	1
188	83	/e-commerce-photos/male_sweater_01_crewneck_sweater_green_1.png	0
189	83	/e-commerce-photos/male_sweater_01_crewneck_sweater_green_2.png	1
190	84	/e-commerce-photos/male_sweater_01_crewneck_sweater_orange_1.png	0
191	84	/e-commerce-photos/male_sweater_01_crewneck_sweater_orange_2.png	1
192	85	/e-commerce-photos/male_sweater_01_crewneck_sweater_black_1.png	0
193	85	/e-commerce-photos/male_sweater_01_crewneck_sweater_black_2.png	1
194	86	/e-commerce-photos/male_sweater_02_hoodie_blue_1.png	0
195	86	/e-commerce-photos/male_sweater_02_hoodie_blue_2.png	1
196	87	/e-commerce-photos/male_sweater_02_hoodie_green_1.png	0
197	87	/e-commerce-photos/male_sweater_02_hoodie_green_2.png	1
198	88	/e-commerce-photos/male_sweater_02_hoodie_orange_1.png	0
199	88	/e-commerce-photos/male_sweater_02_hoodie_orange_2.png	1
200	89	/e-commerce-photos/male_sweater_02_hoodie_black_1.png	0
201	89	/e-commerce-photos/male_sweater_02_hoodie_black_2.png	1
202	90	/e-commerce-photos/male_sweater_03_cardigan_blue_1.png	0
203	90	/e-commerce-photos/male_sweater_03_cardigan_blue_2.png	1
204	91	/e-commerce-photos/male_sweater_03_cardigan_green_1.png	0
205	91	/e-commerce-photos/male_sweater_03_cardigan_green_2.png	1
206	92	/e-commerce-photos/male_sweater_03_cardigan_orange_1.png	0
207	92	/e-commerce-photos/male_sweater_03_cardigan_orange_2.png	1
208	93	/e-commerce-photos/male_sweater_03_cardigan_black_1.png	0
209	93	/e-commerce-photos/male_sweater_03_cardigan_black_2.png	1
210	94	/e-commerce-photos/male_sweater_04_turtleneck_sweater_blue_1.png	0
211	94	/e-commerce-photos/male_sweater_04_turtleneck_sweater_blue_2.png	1
212	95	/e-commerce-photos/male_sweater_04_turtleneck_sweater_green_1.png	0
213	95	/e-commerce-photos/male_sweater_04_turtleneck_sweater_green_2.png	1
214	96	/e-commerce-photos/male_sweater_04_turtleneck_sweater_orange_1.png	0
215	96	/e-commerce-photos/male_sweater_04_turtleneck_sweater_orange_2.png	1
216	97	/e-commerce-photos/male_sweater_04_turtleneck_sweater_black_1.png	0
217	97	/e-commerce-photos/male_sweater_04_turtleneck_sweater_black_2.png	1
218	98	/e-commerce-photos/male_sweater_05_sweatshirt_blue_1.png	0
219	98	/e-commerce-photos/male_sweater_05_sweatshirt_blue_2.png	1
220	99	/e-commerce-photos/male_sweater_05_sweatshirt_green_1.png	0
221	99	/e-commerce-photos/male_sweater_05_sweatshirt_green_2.png	1
222	100	/e-commerce-photos/male_sweater_05_sweatshirt_orange_1.png	0
223	100	/e-commerce-photos/male_sweater_05_sweatshirt_orange_2.png	1
224	101	/e-commerce-photos/male_sweater_05_sweatshirt_black_1.png	0
225	101	/e-commerce-photos/male_sweater_05_sweatshirt_black_2.png	1
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, description, price, stock, store_id, category_id, rating, sell_count, detail) FROM stdin;
62	Mavi Erkek Button Down Gömlek	Erkek mavi button down gömlek, modern kesimi, düğmeli yaka detayı ve günlük şık kombinlere uygun rahat yapısıyla öne çıkar.	18.99	95	1	11	4.42	640	\N
63	Yeşil Erkek Button Down Gömlek	Erkek yeşil button down gömlek, sade tasarımı, rahat kalıbı ve smart casual kombinlere uyum sağlayan modern görünümüyle dikkat çeker.	17.49	82	1	11	4.18	512	\N
64	Turuncu Erkek Button Down Gömlek	Erkek turuncu button down gömlek, canlı rengi, düğmeli yaka yapısı ve günlük stile enerji katan modern tasarımıyla öne çıkar.	19.99	67	1	11	4.35	438	\N
65	Siyah Erkek Button Down Gömlek	Erkek siyah button down gömlek, zamansız rengi, düğmeli yaka detayı ve şık casual kombinlere uygun sade tasarımıyla tamamlayıcıdır.	20.49	104	1	11	4.61	756	\N
66	Mavi Erkek Oxford Gömlek	Erkek mavi oxford gömlek, kaliteli dokulu görünümü, klasik yakası ve hem ofis hem günlük kombinlere uygun şık duruşuyla öne çıkar.	22.99	88	1	11	4.56	690	\N
67	Yeşil Erkek Oxford Gömlek	Erkek yeşil oxford gömlek, modern rengi, rahat kalıbı ve klasik gömlek formunu günlük kullanıma taşıyan şık tasarımıyla dikkat çeker.	21.49	73	1	11	4.24	405	\N
68	Turuncu Erkek Oxford Gömlek	Erkek turuncu oxford gömlek, canlı tonuyla öne çıkan, klasik kesimli ve smart casual kombinlere uygun modern bir modeldir.	23.49	59	1	11	4.39	524	\N
69	Siyah Erkek Oxford Gömlek	Erkek siyah oxford gömlek, sade şık görünümü, klasik yakası ve güçlü duruşuyla ofis ve günlük kombinler için idealdir.	24.99	111	1	11	4.72	821	\N
70	Mavi Erkek Keten Gömlek	Erkek mavi keten gömlek, hafif dokusu, ferah kullanımı ve yazlık kombinlere uygun rahat kesimiyle öne çıkar.	16.99	126	1	11	4.31	610	\N
71	Yeşil Erkek Keten Gömlek	Erkek yeşil keten gömlek, nefes alabilir yapısı, doğal dokusu ve rahat kalıbıyla günlük yaz kombinleri için uygundur.	15.99	98	1	11	4.12	489	\N
72	Turuncu Erkek Keten Gömlek	Erkek turuncu keten gömlek, hafif kumaş hissi, canlı rengi ve rahat yaz stiliyle dikkat çekici bir görünüm sunar.	17.99	76	1	11	4.28	557	\N
73	Siyah Erkek Keten Gömlek	Erkek siyah keten gömlek, sade rengi, hafif dokusu ve rahat kesimiyle yaz akşamları ve günlük kombinler için idealdir.	18.49	115	1	11	4.47	702	\N
74	Mavi Erkek Flanel Gömlek	Erkek mavi flanel gömlek, yumuşak dokusu, rahat kalıbı ve casual kombinlere uygun sıcak görünümüyle öne çıkar.	19.49	86	1	11	4.22	478	\N
75	Yeşil Erkek Flanel Gömlek	Erkek yeşil flanel gömlek, konforlu kumaşı, günlük kullanıma uygun yapısı ve modern casual tarzıyla dikkat çeker.	18.99	91	1	11	4.33	533	\N
76	Turuncu Erkek Flanel Gömlek	Erkek turuncu flanel gömlek, sıcak renk tonu, yumuşak dokusu ve rahat kesimiyle casual kombinlere hareket katar.	20.99	62	1	11	4.41	621	\N
77	Siyah Erkek Flanel Gömlek	Erkek siyah flanel gömlek, sade görünümü, yumuşak dokusu ve günlük kombinlere uyum sağlayan rahat tasarımıyla öne çıkar.	21.99	103	1	11	4.58	744	\N
78	Mavi Erkek Denim Gömlek	Erkek mavi denim gömlek, jean dokulu görünümü, modern kesimi ve günlük kombinlere uyum sağlayan casual tasarımıyla öne çıkar.	25.99	79	1	11	4.64	688	\N
79	Yeşil Erkek Denim Gömlek	Erkek yeşil denim gömlek, dayanıklı görünümü, modern rengi ve casual stil için uygun rahat kalıbıyla dikkat çeker.	24.49	68	1	11	4.21	417	\N
80	Turuncu Erkek Denim Gömlek	Erkek turuncu denim gömlek, canlı rengi, denim dokulu yüzeyi ve modern casual kombinlere uygun tasarımıyla öne çıkar.	26.49	54	1	11	4.36	502	\N
81	Siyah Erkek Denim Gömlek	Erkek siyah denim gömlek, güçlü casual görünümü, modern kesimi ve jean dokulu yapısıyla günlük kombinlerin tamamlayıcısıdır.	27.99	97	1	11	4.73	803	\N
82	Mavi Erkek Crewneck Kazak	Erkek mavi crewneck kazak, bisiklet yaka formu, rahat kalıbı ve sade günlük şıklığıyla soğuk gün kombinleri için uygundur.	19.99	94	1	12	4.42	610	\N
83	Yeşil Erkek Crewneck Kazak	Erkek yeşil crewneck kazak, modern rengi, yumuşak dokulu görünümü ve rahat kesimiyle günlük kombinlere uyum sağlar.	18.49	87	1	12	4.18	524	\N
84	Turuncu Erkek Crewneck Kazak	Erkek turuncu crewneck kazak, canlı rengi, bisiklet yaka yapısı ve konforlu kalıbıyla casual stile enerji katar.	20.99	71	1	12	4.31	458	\N
85	Siyah Erkek Crewneck Kazak	Erkek siyah crewneck kazak, zamansız rengi, sade tasarımı ve rahat kullanımıyla günlük ve smart casual kombinler için idealdir.	21.49	105	1	12	4.67	792	\N
86	Mavi Erkek Hoodie	Erkek mavi hoodie, kapüşonlu tasarımı, rahat kalıbı ve sportif günlük görünümüyle casual kombinler için uygundur.	22.99	112	1	12	4.52	684	\N
87	Yeşil Erkek Hoodie	Erkek yeşil hoodie, yumuşak dokulu görünümü, kapüşon detayı ve rahat kesimiyle günlük kullanımda konfor sunar.	21.99	96	1	12	4.26	547	\N
88	Turuncu Erkek Hoodie	Erkek turuncu hoodie, canlı rengi, sportif kapüşonlu tasarımı ve rahat formuyla enerjik casual kombinler oluşturur.	23.49	64	1	12	4.39	489	\N
89	Siyah Erkek Hoodie	Erkek siyah hoodie, sade ve sportif görünümü, kapüşon detayı ve rahat kalıbıyla günlük stilin tamamlayıcısıdır.	24.99	118	1	12	4.71	836	\N
90	Mavi Erkek Hırka	Erkek mavi hırka, düğmeli önü, rahat kesimi ve modern görünümüyle katmanlı günlük kombinler için uygundur.	25.49	73	1	12	4.48	565	\N
91	Yeşil Erkek Hırka	Erkek yeşil hırka, yumuşak dokulu görünümü, düğmeli tasarımı ve rahat kalıbıyla şık casual kombinlere uyum sağlar.	24.49	82	1	12	4.21	438	\N
92	Turuncu Erkek Hırka	Erkek turuncu hırka, sıcak renk tonu, düğmeli yapısı ve modern casual görünümüyle dikkat çekici bir stil sunar.	26.49	58	1	12	4.35	503	\N
93	Siyah Erkek Hırka	Erkek siyah hırka, klasik rengi, düğmeli formu ve rahat kullanımıyla günlük ve ofis kombinlerine kolayca uyum sağlar.	25.99	101	1	12	4.62	721	\N
94	Mavi Erkek Balıkçı Yaka Kazak	Erkek mavi balıkçı yaka kazak, modern yaka formu, sıcak tutan görünümü ve şık duruşuyla kış kombinleri için idealdir.	27.49	69	1	12	4.54	602	\N
95	Yeşil Erkek Balıkçı Yaka Kazak	Erkek yeşil balıkçı yaka kazak, sade tasarımı, konforlu kalıbı ve modern rengiyle soğuk günlerde şık kullanım sunar.	26.99	77	1	12	4.33	477	\N
96	Turuncu Erkek Balıkçı Yaka Kazak	Erkek turuncu balıkçı yaka kazak, canlı rengi, sıcak dokulu görünümü ve modern kesimiyle dikkat çekici kombinler oluşturur.	28.49	53	1	12	4.29	419	\N
97	Siyah Erkek Balıkçı Yaka Kazak	Erkek siyah balıkçı yaka kazak, zarif yaka formu, sade rengi ve şık görünümüyle klasik kış kombinlerinin tamamlayıcısıdır.	29.99	92	1	12	4.76	844	\N
98	Mavi Erkek Sweatshirt	Erkek mavi sweatshirt, bisiklet yaka yapısı, rahat kalıbı ve sportif günlük görünümüyle casual kombinler için uygundur.	18.99	124	1	12	4.24	593	\N
2	Mavi Basic Crew Neck Tişört	Kadın mavi basic crew neck, kısa kollu, regular fit, sade ve günlük kullanıma uygun tişört.	145.99	84	1	1	0.35	923	\N
3	Yeşil Basic Crew Neck Tişört	Kadın yeşil basic crew neck, kısa kollu, regular fit, sade tasarımlı günlük tişört.	140.99	80	1	1	1.39	48	\N
5	Siyah Basic Crew Neck Tişört	Kadın siyah basic crew neck, kısa kollu, regular fit, minimal ve zamansız günlük tişört.	89.90	54	1	1	1.16	837	\N
6	Mavi Oversized Tişört	Kadın mavi oversized tişört, düşük omuzlu, rahat kesimli ve salaş günlük kullanım için ideal.	89.00	69	1	1	2.44	777	\N
7	Yeşil Oversized Tişört	Kadın yeşil oversized tişört, rahat kalıp, düşük omuz ve modern salaş görünüm.	159.00	188	1	1	0.6	764	\N
8	Turuncu Oversized Tişört	Kadın turuncu oversized tişört, salaş kesim, kısa kollu ve canlı renkli casual model.	118.00	138	1	1	2.43	511	\N
9	Siyah Oversized Tişört	Kadın siyah oversized tişört, rahat kesimli, düşük omuzlu ve sade şehir stili için uygun.	119.90	160	1	1	0.05	659	\N
10	Mavi Desenli Crop Tişört	Kadın mavi crop tişört, kısa kesimli, crew neck yaka ve güneş-dalga temalı modern desenli model.	59.00	126	1	1	0.71	116	\N
12	Turuncu Desenli Crop Tişört	Kadın turuncu crop tişört, kısa kesimli, crew neck yaka ve retro çiçek desenli canlı model.	69.00	38	1	1	4.76	543	\N
13	Siyah Desenli Crop Tişört	Kadın siyah crop tişört, kısa kesimli, crew neck yaka ve ay-yıldız temalı celestial desenli model.	59.99	156	1	1	1.89	386	\N
14	Mavi Geometrik Graphic Tişört	Kadın mavi graphic tişört, regular fit, modern geometrik formlar ve çizgilerden oluşan baskılı model.	54.28	51	1	1	3.22	211	\N
15	Yeşil Abstract Graphic Tişört	Kadın yeşil graphic tişört, regular fit, soyut yüzler, göz motifleri ve doodle detaylı özgün tasarım.	85.00	56	1	1	4.42	686	\N
17	Siyah Moth Graphic Tişört	Kadın siyah graphic tişört, regular fit, celestial kelebek/moth illüstrasyonlu detaylı baskı tasarımı.	89.00	173	1	1	1.5	625	\N
18	Mavi Şerit Yakalı Polo Tişört	Kadın mavi polo tişört, kısa kollu, düğmeli yaka ve ince şerit yakalı sade spor model.	89.00	104	1	1	1.71	640	\N
20	Turuncu Şerit Yakalı Polo Tişört	Kadın turuncu polo tişört, kısa kollu, düğmeli yaka ve şerit yaka detaylı canlı renkli model.	69.00	191	1	1	2.84	141	\N
21	Siyah Şerit Yakalı Polo Tişört	Kadın siyah polo tişört, kısa kollu, düğmeli yaka ve kontrast şerit yakalı sade şık model.	69.00	6	1	1	4.81	868	\N
22	Siyah Tasarımlı Sneaker	Kadın siyah sneaker, modern tasarımlı, rahat tabanlı ve günlük kullanıma uygun şık spor ayakkabı.	139.00	166	1	2	3.94	826	\N
24	Yeşil Tasarımlı Sneaker	Kadın yeşil sneaker, şık tasarım çizgileri, rahat kalıbı ve günlük kullanıma uygun spor görünümüyle öne çıkar.	99.00	39	1	2	2.24	649	\N
25	Turuncu Tasarımlı Sneaker	Kadın turuncu sneaker, canlı rengi, modern panel detayları ve rahat tabanıyla enerjik günlük kombinler için idealdir.	75.00	168	1	2	4.55	967	\N
26	Siyah Running Shoes	Kadın siyah running ayakkabı, nefes alabilir yüzey, destekleyici taban ve sportif tasarımıyla aktif kullanım için uygundur.	67.30	76	1	2	0.29	564	\N
27	Mavi Running Shoes	Kadın mavi running ayakkabı, hafif yapısı, file dokulu yüzeyi ve yastıklamalı tabanıyla sportif kullanım sunar.	127.75	114	1	2	0.05	410	\N
28	Yeşil Running Shoes	Kadın yeşil running ayakkabı, konforlu tabanı, nefes alabilir dokusu ve modern spor görünümüyle günlük aktivitelere uygundur.	89.90	112	1	2	0.05	17	\N
29	Turuncu Running Shoes	Kadın turuncu running ayakkabı, canlı rengi, hafif yapısı ve yastıklamalı taban tasarımıyla sportif kombinlere enerji katar.	150.00	157	1	2	3.02	21	\N
11	Yeşil Desenli Crop Tişört	Kadın yeşil crop tişört, kısa kesimli, crew neck yaka ve botanik yaprak desenli modern model.	84.00	160	1	1	1.62	670	\N
16	Turuncu Pop Art Graphic Tişört	Kadın turuncu graphic tişört, regular fit, pop-art portre, yıldız ve şimşek detaylı enerjik tasarım.	89.00	20	1	1	3.59	20	\N
4	Turuncu Basic Crew Neck Tişört	Kadın turuncu basic crew neck, kısa kollu, regular fit, canlı renkli sade tişört.	64.49	179	1	1	2.07	634	\N
23	Mavi Tasarımlı Sneaker	Kadın mavi sneaker, katmanlı panel detayları, modern görünümü ve konforlu taban yapısıyla günlük kombinlere uygundur.	59.00	196	1	2	1.94	260	\N
19	Yeşil Şerit Yakalı Polo Tişört	Kadın yeşil polo tişört, kısa kollu, düğmeli yaka ve ince şerit detaylı minimal spor model.	79.90	84	1	1	3.64	930	\N
30	Siyah Metal Detaylı Loafer	Kadın siyah loafer, metal aksesuar detayı, kalın tabanı ve deri görünümlü şık tasarımıyla klasik-modern kombinlere uygundur.	90.00	10	1	2	3.43	902	\N
31	Mavi Metal Detaylı Loafer	Kadın mavi loafer, tokalı metal aksesuarı, kalın tabanı ve modern deri görünümüyle dikkat çeken şık bir modeldir.	139.00	125	1	2	4.32	361	\N
32	Yeşil Metal Detaylı Loafer	Kadın yeşil loafer, metal toka detayı, rahat kalın tabanı ve sade şık görünümüyle günlük ve ofis kombinlerine uygundur.	99.00	91	1	2	4.52	69	\N
33	Turuncu Metal Detaylı Loafer	Kadın turuncu loafer, canlı rengi, metal aksesuar detayı ve güçlü taban yapısıyla modern kombinlere iddialı bir görünüm katar.	85.98	97	1	2	2.35	696	\N
35	Mavi Tasarımlı Sandalet	Kadın mavi sandalet, kalın bantlı modern tasarımı, rahat tabanı ve metal detaylarıyla yaz stiline canlılık katar.	88.00	37	1	2	1.35	874	\N
36	Yeşil Tasarımlı Sandalet	Kadın yeşil sandalet, örgü bant detayları, modern taban yapısı ve zarif toka detayıyla konforlu bir yaz modelidir.	139.00	118	1	2	4.81	633	\N
37	Turuncu Tasarımlı Sandalet	Kadın turuncu sandalet, canlı rengi, modern bant tasarımı ve blok topuk detayıyla dikkat çekici yaz kombinleri oluşturur.	129.75	52	1	2	0.28	387	\N
38	Siyah Deri Görünümlü Bot	Kadın siyah bot, sivri burun, blok topuk, fermuar detayı ve modern deri görünümüyle şık şehir kombinlerine uygundur.	89.00	147	1	2	2.31	309	\N
39	Mavi Deri Görünümlü Bot	Kadın mavi bot, canlı rengi, blok topuklu yapısı ve modern çizgileriyle iddialı ve şık kombinler için tasarlanmıştır.	129.00	136	1	2	2.44	665	\N
40	Yeşil Deri Görünümlü Bot	Kadın yeşil bot, kemer ve metal aksesuar detayları, blok topuk tasarımı ve modern silüetiyle dikkat çeker.	89.50	70	1	2	4.01	873	\N
41	Turuncu Deri Görünümlü Bot	Kadın turuncu bot, platform tabanı, blok topuğu ve gold toka detayıyla güçlü ve modern bir stil sunar.	149.00	172	1	2	1.53	540	\N
34	Siyah Tasarımlı Sandalet	Kadın siyah sandalet, ince bant detayları, zarif topuk yapısı ve metal aksesuarıyla şık yaz kombinleri için uygundur.	88.00	199	1	2	3.16	946	\N
99	Yeşil Erkek Sweatshirt	Erkek yeşil sweatshirt, sade tasarımı, konforlu kesimi ve günlük kullanıma uygun sportif yapısıyla öne çıkar.	17.99	108	1	12	4.11	486	\N
100	Turuncu Erkek Sweatshirt	Erkek turuncu sweatshirt, canlı rengi, rahat kalıbı ve enerjik casual görünümüyle günlük stile hareket katar.	19.49	85	1	12	4.37	558	\N
101	Siyah Erkek Sweatshirt	Erkek siyah sweatshirt, zamansız rengi, sade sportif tasarımı ve rahat kullanımıyla her gün tercih edilebilecek bir modeldir.	20.49	132	1	12	4.69	789	\N
42	Mavi Erkek Sneaker	Erkek mavi sneaker, modern panel detayları, rahat tabanı ve günlük kombinlere uygun sportif tasarımıyla öne çıkar.	19.99	143	1	9	4.26	732	\N
43	Yeşil Erkek Sneaker	Erkek yeşil sneaker, şık katmanlı yüzeyi, konforlu tabanı ve casual stile uygun modern görünümüyle dikkat çeker.	17.99	96	1	9	3.84	518	\N
44	Turuncu Erkek Sneaker	Erkek turuncu sneaker, canlı rengi, modern spor çizgileri ve rahat taban yapısıyla enerjik günlük kombinler sunar.	21.99	121	1	9	4.51	846	\N
45	Siyah Erkek Sneaker	Erkek siyah sneaker, sade şık tasarımı, rahat kalıbı ve günlük kullanıma uygun modern spor görünümüyle tamamlayıcıdır.	18.99	88	1	9	4.08	604	\N
46	Mavi Erkek Klasik Ayakkabı	Erkek mavi klasik ayakkabı, deri görünümlü yüzeyi ve zarif formuyla özel gün ve şık kombinler için uygundur.	27.99	64	1	9	4.62	391	\N
47	Yeşil Erkek Klasik Ayakkabı	Erkek yeşil klasik ayakkabı, modern renk yorumu, ince işçilik detayları ve şık formuyla dikkat çeker.	25.99	73	1	9	4.21	287	\N
48	Turuncu Erkek Klasik Ayakkabı	Erkek turuncu klasik ayakkabı, iddialı rengi, zarif tasarımı ve özel kombinlere uyum sağlayan şık yapısıyla öne çıkar.	29.99	42	1	9	4.48	456	\N
49	Siyah Erkek Klasik Ayakkabı	Erkek siyah klasik ayakkabı, zamansız tasarımı, deri görünümlü yüzeyi ve şık duruşuyla klasik kombinlerin tamamlayıcısıdır.	24.99	110	1	9	4.75	902	\N
50	Mavi Erkek Bot	Erkek mavi bot, güçlü taban yapısı, modern formu ve dayanıklı görünümüyle şehir stiline sportif bir dokunuş katar.	26.99	82	1	9	4.19	645	\N
51	Yeşil Erkek Bot	Erkek yeşil bot, kalın tabanı, modern detayları ve rahat kullanımıyla günlük şehir kombinleri için idealdir.	23.99	117	1	9	3.96	533	\N
52	Turuncu Erkek Bot	Erkek turuncu bot, dikkat çekici rengi, güçlü taban yapısı ve modern tasarımıyla iddialı bir stil sunar.	28.99	75	1	9	4.38	711	\N
53	Siyah Erkek Bot	Erkek siyah bot, dayanıklı tabanı, şık deri görünümü ve modern çizgileriyle günlük ve casual kombinlere uygundur.	25.49	134	1	9	4.55	860	\N
54	Mavi Erkek Loafer	Erkek mavi loafer, modern kesimi, rahat kalıbı ve şık detaylarıyla günlük ve smart casual kombinlere uygundur.	18.49	101	1	9	4.11	472	\N
55	Yeşil Erkek Loafer	Erkek yeşil loafer, sade tasarımı, konforlu yapısı ve modern rengiyle şık günlük kombinler oluşturur.	16.99	90	1	9	3.88	359	\N
56	Turuncu Erkek Loafer	Erkek turuncu loafer, canlı rengi, modern loafer formu ve rahat kullanımıyla dikkat çekici bir stil sunar.	19.49	67	1	9	4.34	621	\N
57	Siyah Erkek Loafer	Erkek siyah loafer, klasik-modern tasarımı, rahat kalıbı ve sade şıklığıyla ofis ve günlük kombinlere uygundur.	17.49	154	1	9	4.57	774	\N
58	Mavi Erkek Running Shoes	Erkek mavi running ayakkabı, hafif yapısı, nefes alabilir yüzeyi ve destekleyici tabanıyla aktif kullanım için uygundur.	22.99	89	1	9	4.29	548	\N
59	Yeşil Erkek Running Shoes	Erkek yeşil running ayakkabı, sportif tasarımı, yastıklamalı tabanı ve rahat formuyla günlük aktivitelere eşlik eder.	21.49	112	1	9	4.03	430	\N
60	Turuncu Erkek Running Shoes	Erkek turuncu running ayakkabı, canlı rengi, hafif yapısı ve performans odaklı tabanıyla dinamik bir görünüm sunar.	24.49	78	1	9	4.66	690	\N
61	Siyah Erkek Running Shoes	Erkek siyah running ayakkabı, sade sportif tasarımı, konforlu tabanı ve nefes alabilir yüzeyiyle aktif kullanım sağlar.	20.99	137	1	9	4.41	815	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, code, name) FROM stdin;
1	admin	Admin
2	store	Store
3	customer	Customer
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stores (id, name, phone, tax_no, bank_account, approved) FROM stdin;
1	Demo Store	05551234567	T1234V123456	TR000000000000000000000000	t
5	Nautilus Giyim	05551234567	T1234V123457	TR330006100519786457841326	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, role_id, store_id, active) FROM stdin;
1	gizem	musteri@gmail.com	$2a$10$2oaYiDVpZVf1qAem.Vs5z.Y/0Ev.zdX6XExjF3/mzauVdezfJMzqy	3	\N	t
2	Demo Store Owner 1	store1@example.com	$2a$10$MnmOPCkjR4LCMxCb/eiFPOBNO2FT4aTtZy3vNevVWsXxo1/82YDNK	2	1	t
3	gizem	admin@gmail.com	$2a$10$MAqN3BtJ3jRl967dkkkzHe2nKmHMawDfk.bs71jN2afUHoWDlC8NS	3	\N	t
4	Test User	test@example.com	$2a$10$4b.KAzDFPAWsUNntjjnWHOOyBBq68KOoPzYYNAXqer3Tj4OIDZdBS	3	\N	t
5	Test User	test2@example.com	$2a$10$jOlvvia7qUhy6E.AtaiEc.sXeomFZYYlzrwItBehqBrNrct1OJSAe	3	\N	t
6	Test User	test3@example.com	$2a$10$3xaKl79k7oeOTkhABo2QJ.IjHAKBtV8HPh8X.KVlId22gpdvomhQa	3	\N	t
7	Test User	alisan@example.com	$2a$10$uZkRPHZ6sPuRe0XCDlzCu.IlZmFbIE/K9Pzn.VLYyoHU5d7wE5vHi	3	\N	t
8	gizem	gizem@gmail.com	$2a$10$pSDWjYdsly7szXqQV93m/eXnaTt5mYug.PvF4E8UD81d9gfsqz1KW	3	\N	t
9	Test Kullanici	test1@example.com	$2a$10$D13LX5cD0Lv/QduFjSJPf.FULskYw61zTaKrFmuCw0TX598fFnBMS	3	\N	t
10	Mert	mert@example.com	$2a$10$Kp/dY25J.NZdIs8qrQ.4v.QnAx/ulKhjV5Uk7jE9tPflgJVy87zku	3	\N	t
11	Magaza Sahibi	nautilus@example.com	$2a$10$SDewV85ir5HHPBOw0/E9LOvC/Acb5zLgOjTWQftuWk38TF1yfZBOW	2	5	t
\.


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.addresses_id_seq', 6, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: credit_cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_cards_id_seq', 5, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 7, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 20, true);


--
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_images_id_seq', 225, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 41, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: stores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stores_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: categories categories_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_code_key UNIQUE (code);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: credit_cards credit_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_cards
    ADD CONSTRAINT credit_cards_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: roles roles_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_code_key UNIQUE (code);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);


--
-- Name: stores stores_tax_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_tax_no_key UNIQUE (tax_no);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_addresses_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_addresses_user_id ON public.addresses USING btree (user_id);


--
-- Name: idx_credit_cards_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_credit_cards_user_id ON public.credit_cards USING btree (user_id);


--
-- Name: idx_order_items_order_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_order_items_order_id ON public.order_items USING btree (order_id);


--
-- Name: idx_order_items_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_order_items_product_id ON public.order_items USING btree (product_id);


--
-- Name: idx_orders_address_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_address_id ON public.orders USING btree (address_id);


--
-- Name: idx_orders_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_status ON public.orders USING btree (status);


--
-- Name: idx_orders_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_orders_user_id ON public.orders USING btree (user_id);


--
-- Name: idx_product_images_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_images_product_id ON public.product_images USING btree (product_id);


--
-- Name: idx_products_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_category_id ON public.products USING btree (category_id);


--
-- Name: idx_products_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_name ON public.products USING btree (name);


--
-- Name: idx_products_store_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_store_id ON public.products USING btree (store_id);


--
-- Name: idx_users_role_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_role_id ON public.users USING btree (role_id);


--
-- Name: idx_users_store_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_store_id ON public.users USING btree (store_id);


--
-- Name: addresses fk_addresses_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: credit_cards fk_credit_cards_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_cards
    ADD CONSTRAINT fk_credit_cards_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_items_order; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_items_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders fk_orders_address; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_address FOREIGN KEY (address_id) REFERENCES public.addresses(id);


--
-- Name: orders fk_orders_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: product_images fk_product_images_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products fk_products_category; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: products fk_products_store; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_store FOREIGN KEY (store_id) REFERENCES public.stores(id);


--
-- Name: users fk_users_role; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: users fk_users_store; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_store FOREIGN KEY (store_id) REFERENCES public.stores(id);


--
-- PostgreSQL database dump complete
--

