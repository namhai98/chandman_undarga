-- Gift card purchase requests submitted from the marketing site.
CREATE TABLE IF NOT EXISTS gift_orders (
  id           BIGSERIAL PRIMARY KEY,
  buyer_name   TEXT        NOT NULL,
  buyer_phone  TEXT        NOT NULL,
  recipient    TEXT,
  amount_mnt   INTEGER     NOT NULL DEFAULT 50000,
  quantity     INTEGER     NOT NULL DEFAULT 1 CHECK (quantity BETWEEN 1 AND 50),
  message      TEXT,
  status       TEXT        NOT NULL DEFAULT 'new',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gift_orders_created_at_idx ON gift_orders (created_at DESC);
