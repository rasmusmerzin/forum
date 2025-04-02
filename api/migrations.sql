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

create unique index if not exists account_verified_email_index
on account(email)
where email_verified;

create table if not exists email_verification (
	"id" uuid primary key default gen_random_uuid(),
	"account_id" uuid not null references account(id),
	"email" varchar(63) not null default gen_random_uuid(),
	"created" timestamptz not null default now(),
	"sent" timestamptz,
	"confirmed" timestamptz
);

create table if not exists post (
	"id" uuid primary key default gen_random_uuid(),
	"author_id" uuid not null references account(id),
	"content" varchar(4095) not null,
	"comments" int not null default 0,
	"favorites" int not null default 0,
	"created" timestamptz not null default now()
);

create index if not exists post_created_index
on post(created);

create table if not exists comment (
	"id" uuid primary key default gen_random_uuid(),
	"post_id" uuid not null references post(id),
	"author_id" uuid not null references account(id),
	"content" varchar(255) not null,
	"favorites" int not null default 0,
	"created" timestamptz not null default now()
);

create index if not exists comment_created_index
on comment(created);

create or replace function update_post_comment_count()
returns trigger as $$
	begin
		if TG_OP = 'INSERT' then
			update post
			set comments = comments + 1
			where id = NEW.post_id;
		elsif TG_OP = 'DELETE' then
			update post
			set comments = comments - 1
			where id = OLD.post_id;
		end if;
		return null;
	end;
$$ language plpgsql;

create trigger comment_insert_trigger
after insert on comment
for each row
execute function update_post_comment_count();

create trigger comment_delete_trigger
after delete on comment
for each row
execute function update_post_comment_count();

create table if not exists post_favorite (
	"id" uuid primary key default gen_random_uuid(),
	"post_id" uuid not null references post(id),
	"author_id" uuid not null references account(id),
	"created" timestamptz not null default now(),
	unique(post_id, author_id)
);

create or replace function update_post_favorite_count()
returns trigger as $$
	begin
		if TG_OP = 'INSERT' then
			update post
			set favorites = favorites + 1
			where id = NEW.post_id;
		elsif TG_OP = 'DELETE' then
			update post
			set favorites = favorites - 1
			where id = OLD.post_id;
		end if;
		return null;
	end;
$$ language plpgsql;

create trigger favorite_insert_trigger
after insert on post_favorite
for each row
execute function update_post_favorite_count();

create trigger favorite_delete_trigger
after delete on post_favorite
for each row
execute function update_post_favorite_count();

create table if not exists comment_favorite (
	"id" uuid primary key default gen_random_uuid(),
	"comment_id" uuid not null references comment(id),
	"author_id" uuid not null references account(id),
	"created" timestamptz not null default now(),
	unique(comment_id, author_id)
);

create or replace function update_comment_favorite_count()
returns trigger as $$
	begin
		if TG_OP = 'INSERT' then
			update comment
			set favorites = favorites + 1
			where id = NEW.comment_id;
		elsif TG_OP = 'DELETE' then
			update comment
			set favorites = favorites - 1
			where id = OLD.comment_id;
		end if;
		return null;
	end;
$$ language plpgsql;

create trigger favorite_insert_trigger
after insert on comment_favorite
for each row
execute function update_comment_favorite_count();

create trigger favorite_delete_trigger
after delete on comment_favorite
for each row
execute function update_comment_favorite_count();
