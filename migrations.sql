create table if not exists account (
	"id" uuid primary key default gen_random_uuid(),
	"username" varchar(31) not null unique,
	"password" text not null
);
