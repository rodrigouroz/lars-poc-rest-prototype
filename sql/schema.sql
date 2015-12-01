CREATE SCHEMA lars_poc;

SET search_path TO lars_poc;

DROP TABLE IF EXISTS "personen" CASCADE;
DROP TABLE IF EXISTS "functies" CASCADE;
DROP TABLE IF EXISTS "responsibilities" CASCADE;

CREATE TABLE "personen" (
  "key" uuid primary key,
  "firstname" text,
  "lastname" text,
  "birthdate" date,
  "registrationnumber" numeric not null,
  "email" text,
  "$$meta.deleted" boolean default false,
  "$$meta.modified" timestamp with time zone not null default current_timestamp,
  "$$meta.created" timestamp with time zone not null default current_timestamp
);

CREATE INDEX personen_created ON personen ("$$meta.created");
CREATE INDEX personen_modified ON personen ("$$meta.modified");
CREATE INDEX personen_deleted ON personen ("$$meta.deleted");
CREATE INDEX personen_created_key ON personen ("$$meta.created", "key");

CREATE TABLE "functies" (
  "key" uuid primary key,
  "name" text,
  "description" text,
  "$$meta.deleted" boolean default false,
  "$$meta.modified" timestamp with time zone not null default current_timestamp,
  "$$meta.created" timestamp with time zone not null default current_timestamp
);

CREATE INDEX functies_created ON functies ("$$meta.created");
CREATE INDEX functies_modified ON functies ("$$meta.modified");
CREATE INDEX functies_deleted ON functies ("$$meta.deleted");
CREATE INDEX functies_created_key ON functies ("$$meta.created", "key");

CREATE TABLE "responsibilities" (
	key uuid primary key,
	"persoon" uuid REFERENCES personen (key),
	"functie" uuid REFERENCES functies (key),
	"from" timestamp with time zone,
	"to" timestamp with time zone,
  "$$meta.deleted" boolean default false,
  "$$meta.modified" timestamp with time zone not null default current_timestamp,
  "$$meta.created" timestamp with time zone not null default current_timestamp
);

CREATE INDEX responsibilities_created ON responsibilities ("$$meta.created");
CREATE INDEX responsibilities_modified ON responsibilities ("$$meta.modified");
CREATE INDEX responsibilities_deleted ON responsibilities ("$$meta.deleted");
CREATE INDEX responsibilities_created_key ON responsibilities ("$$meta.created", "key");
CREATE INDEX responsibilities_persoon on responsibilities ("persoon");
CREATE INDEX responsibilities_functie on responsibilities ("functie");
