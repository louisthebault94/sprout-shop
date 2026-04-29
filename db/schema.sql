-- Sprout database schema

CREATE TABLE IF NOT EXISTS resources (
  id           SERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  subject      TEXT NOT NULL,
  type         TEXT NOT NULL,
  year_group   TEXT NOT NULL,
  price        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  rating       NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count INT NOT NULL DEFAULT 0,
  state        TEXT NOT NULL DEFAULT 'default',
  page_count   INT NOT NULL,
  is_new       BOOLEAN NOT NULL DEFAULT false,
  curriculum   TEXT NOT NULL,
  description  TEXT,
  file_path    TEXT,
  preview_path TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resources_subject_idx     ON resources (subject);
CREATE INDEX IF NOT EXISTS resources_curriculum_idx  ON resources (curriculum);
CREATE INDEX IF NOT EXISTS resources_created_at_idx  ON resources (created_at DESC);

CREATE TABLE IF NOT EXISTS purchases (
  id                 SERIAL PRIMARY KEY,
  user_id            TEXT NOT NULL,        -- Clerk user id
  resource_id        INT  NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  stripe_session_id  TEXT UNIQUE,
  amount             NUMERIC(10, 2) NOT NULL,
  currency           TEXT NOT NULL DEFAULT 'AUD',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

CREATE INDEX IF NOT EXISTS purchases_user_idx ON purchases (user_id);

CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  resource_id INT  NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  user_id     TEXT NOT NULL,
  rating      INT  NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT,
  author_name TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

CREATE INDEX IF NOT EXISTS reviews_resource_idx ON reviews (resource_id);
CREATE INDEX IF NOT EXISTS reviews_created_idx  ON reviews (created_at DESC);
