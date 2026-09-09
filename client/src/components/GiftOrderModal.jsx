import { useActionState, useEffect, useRef } from "react";
import { createGiftOrder } from "../lib/api.js";
import { useGiftModal } from "../context/giftModal.jsx";

const UNIT_PRICE = 50_000;
const initialState = { status: "idle", fields: {}, values: {}, order: null, error: null };
const money = (n) => new Intl.NumberFormat("mn-MN").format(n);

export function GiftOrderModal() {
  const { open, closeGiftModal } = useGiftModal();
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  const [state, formAction, isPending] = useActionState(async (_prev, formData) => {
    const payload = {
      buyerName: (formData.get("buyerName") || "").toString().trim(),
      buyerPhone: (formData.get("buyerPhone") || "").toString().trim(),
      recipient: (formData.get("recipient") || "").toString().trim(),
      quantity: Number(formData.get("quantity") || 1),
      message: (formData.get("message") || "").toString().trim(),
    };

    if (!payload.buyerName || !payload.buyerPhone) {
      return {
        status: "error",
        error: "Нэр болон утасны дугаараа оруулна уу.",
        fields: {
          ...(payload.buyerName ? {} : { buyerName: "Нэрээ бичнэ үү." }),
          ...(payload.buyerPhone ? {} : { buyerPhone: "Утасны дугаараа бичнэ үү." }),
        },
        values: payload,
        order: null,
      };
    }

    try {
      const data = await createGiftOrder(payload);
      return { status: "success", fields: {}, values: {}, order: data.order, error: null };
    } catch (err) {
      return {
        status: "error",
        error: err.message,
        fields: err.fields ?? {},
        values: payload,
        order: null,
      };
    }
  }, initialState);

  const v = state.values ?? {};

  // Lock scroll + focus management while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && closeGiftModal();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, closeGiftModal]);

  if (!open) return null;

  const success = state.status === "success";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-forest-dark/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && closeGiftModal()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-modal-title"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] bg-white p-7 shadow-2xl sm:rounded-[1.75rem] sm:p-9"
      >
        <button
          type="button"
          onClick={closeGiftModal}
          aria-label="Хаах"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-sage-soft/60 text-ink/60 transition-colors hover:bg-cream"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>

        {success ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest/10 text-forest">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="gift-modal-title" className="mt-5 text-3xl text-forest-dark">
              Хүсэлт хүлээн авлаа
            </h2>
            <p className="mt-3 text-ink/70">
              Захиалгын дугаар: <strong>#{state.order?.id}</strong>
              <br />
              {state.order?.quantity} ширхэг · нийт{" "}
              <strong>{money(state.order?.totalMnt ?? UNIT_PRICE)}₮</strong>
            </p>
            <p className="mt-2 text-sm text-ink/55">
              Бид ажлын цагт тантай утсаар холбогдож, картыг хэрхэн авахыг
              тохирно.
            </p>
            <button
              type="button"
              className="btn btn--primary btn--lg mt-7"
              onClick={closeGiftModal}
            >
              Хаах
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Бэлгийн карт</p>
            <h2 id="gift-modal-title" className="mt-2 text-3xl text-forest-dark">
              Хүсэлт үлдээх
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              50,000₮-ийн бэлгийн карт. Мэдээллээ үлдээвэл бид тантай эргэн
              холбогдоно.
            </p>

            <form
              action={formAction}
              key={`${v.buyerName ?? ""}|${v.buyerPhone ?? ""}|${state.error ?? ""}`}
              className="mt-6 grid gap-4"
            >
              <div className={`field ${state.fields.buyerName ? "field--error" : ""}`}>
                <label htmlFor="buyerName">Таны нэр</label>
                <input
                  ref={firstFieldRef}
                  id="buyerName"
                  name="buyerName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Овог нэр"
                  defaultValue={v.buyerName ?? ""}
                />
                {state.fields.buyerName ? (
                  <span className="field__error">{state.fields.buyerName}</span>
                ) : null}
              </div>

              <div className={`field ${state.fields.buyerPhone ? "field--error" : ""}`}>
                <label htmlFor="buyerPhone">Утасны дугаар</label>
                <input
                  id="buyerPhone"
                  name="buyerPhone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="9900-0000"
                  defaultValue={v.buyerPhone ?? ""}
                />
                {state.fields.buyerPhone ? (
                  <span className="field__error">{state.fields.buyerPhone}</span>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
                <div className="field">
                  <label htmlFor="recipient">Хэнд бэлэглэх вэ? (заавал биш)</label>
                  <input
                    id="recipient"
                    name="recipient"
                    type="text"
                    placeholder="Жишээ нь: Ээж"
                    defaultValue={v.recipient ?? ""}
                  />
                </div>
                <div className="field">
                  <label htmlFor="quantity">Тоо</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    max="50"
                    defaultValue={v.quantity ?? 1}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Нэмэлт мэдээлэл (заавал биш)</label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="Огноо, хүсэлт г.м."
                  defaultValue={v.message ?? ""}
                />
              </div>

              {state.error ? (
                <p className="rounded-xl bg-[#fbeae8] px-4 py-3 text-sm text-[#a13a30]">
                  {state.error}
                </p>
              ) : null}

              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-ink/60">
                  Нэгж үнэ: <strong className="text-forest-dark">{money(UNIT_PRICE)}₮</strong>
                </span>
                <button type="submit" className="btn btn--primary btn--lg" disabled={isPending}>
                  {isPending ? "Илгээж байна…" : "Хүсэлт илгээх"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
