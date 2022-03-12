
alter table "public"."cities" drop column "country";

alter table "public"."photos" drop constraint "photos_city_id_fkey";

DROP TABLE "public"."cities";
