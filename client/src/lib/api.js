const BASE = import.meta.env.VITE_API_URL ?? "";

/**
 * Submit a gift card purchase request.
 * @param {{buyerName:string, buyerPhone:string, recipient?:string, quantity?:number, message?:string}} payload
 */
export async function createGiftOrder(payload) {
  let res;
  try {
    res = await fetch(`${BASE}/api/gift-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Сервертэй холбогдож чадсангүй. Дараа дахин оролдоно уу.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(
      data.error === "validation_failed"
        ? "Мэдээллээ шалгаад дахин илгээнэ үү."
        : "Захиалга илгээхэд алдаа гарлаа. Дараа дахин оролдоно уу.",
    );
    err.status = res.status;
    err.fields = data.fields ?? {};
    throw err;
  }

  return data;
}
