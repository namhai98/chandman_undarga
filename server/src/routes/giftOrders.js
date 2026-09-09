import { Router } from "express";
import { query } from "../db.js";

export const giftOrders = Router();

const AMOUNT_MNT = 50_000;

function validate(body) {
  const errors = {};
  const buyerName = String(body?.buyerName ?? "").trim();
  const buyerPhone = String(body?.buyerPhone ?? "").trim();
  const recipient = String(body?.recipient ?? "").trim();
  const message = String(body?.message ?? "").trim();
  let quantity = Number.parseInt(body?.quantity ?? 1, 10);

  if (buyerName.length < 2 || buyerName.length > 120) {
    errors.buyerName = "Нэрээ бүрэн бичнэ үү.";
  }
  if (!/^[0-9+\-\s()]{6,20}$/.test(buyerPhone)) {
    errors.buyerPhone = "Утасны дугаараа зөв оруулна уу.";
  }
  if (recipient.length > 120) {
    errors.recipient = "Хэтэрхий урт байна.";
  }
  if (message.length > 600) {
    errors.message = "Захиас хэт урт байна.";
  }
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
    quantity = 1;
  }

  return {
    errors,
    value: { buyerName, buyerPhone, recipient, message, quantity },
  };
}

// POST /api/gift-orders — record a gift card purchase request
giftOrders.post("/", async (req, res, next) => {
  try {
    const { errors, value } = validate(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ error: "validation_failed", fields: errors });
    }

    const { rows } = await query(
      `INSERT INTO gift_orders
         (buyer_name, buyer_phone, recipient, amount_mnt, quantity, message)
       VALUES ($1, $2, NULLIF($3, ''), $4, $5, NULLIF($6, ''))
       RETURNING id, amount_mnt, quantity, created_at`,
      [
        value.buyerName,
        value.buyerPhone,
        value.recipient,
        AMOUNT_MNT,
        value.quantity,
        value.message,
      ],
    );

    const order = rows[0];
    return res.status(201).json({
      ok: true,
      order: {
        id: String(order.id),
        amountMnt: order.amount_mnt,
        quantity: order.quantity,
        totalMnt: order.amount_mnt * order.quantity,
        createdAt: order.created_at,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// GET /api/gift-orders — read-only listing, guarded by a shared key
giftOrders.get("/", async (req, res, next) => {
  try {
    const key = req.get("x-admin-key");
    if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const limit = Math.min(Number.parseInt(req.query.limit ?? "50", 10) || 50, 200);
    const { rows } = await query(
      `SELECT id, buyer_name, buyer_phone, recipient, amount_mnt, quantity,
              message, status, created_at
         FROM gift_orders
        ORDER BY created_at DESC
        LIMIT $1`,
      [limit],
    );
    return res.json({
      count: rows.length,
      orders: rows.map((r) => ({ ...r, id: String(r.id) })),
    });
  } catch (err) {
    return next(err);
  }
});
