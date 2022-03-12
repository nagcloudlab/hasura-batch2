SET check_function_bodies = false;
INSERT INTO public.cities (id, name, country) VALUES (1, 'chennai', 'india');
INSERT INTO public.cities (id, name, country) VALUES (2, 'bengalore', 'india');
SELECT pg_catalog.setval('public.cities_id_seq', 2, true);
