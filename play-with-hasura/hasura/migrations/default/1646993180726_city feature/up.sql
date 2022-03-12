
CREATE TABLE "public"."cities" ("id" serial NOT NULL, "name" text NOT NULL, PRIMARY KEY ("id") );

alter table "public"."photos"
  add constraint "photos_city_id_fkey"
  foreign key ("city_id")
  references "public"."cities"
  ("id") on update restrict on delete restrict;

alter table "public"."cities" add column "country" text
 null;
