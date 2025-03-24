create table if not exists account (
	"id" uuid primary key default gen_random_uuid(),
	"username" varchar(31) not null unique,
	"password" text not null,
	"first_name" varchar(63) not null default '',
	"last_name" varchar(63) not null default '',
	"email" varchar(63) not null default '',
	"email_verified" boolean not null default false,
	"bio" varchar(1024) not null default '',
	"created" timestamptz not null default now()
);

create table if not exists post (
	"id" uuid primary key default gen_random_uuid(),
	"author_id" uuid not null references account(id),
	"content" varchar(4095) not null,
	"created" timestamptz not null default now()
);
