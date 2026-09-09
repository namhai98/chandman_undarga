export function GiftCardVisual() {
  return (
    <div
      className="giftcard"
      role="img"
      aria-label="Чандмань Ундаргын 50,000 төгрөгийн бэлгийн карт"
    >
      <svg className="giftcard__botanical" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <path
          d="M170 20c-6 40-24 70-56 84M170 20c-40 6-70 24-84 56M120 40c-2 18-10 30-24 40"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M150 30c-1 10-6 17-15 22M162 52c-10 1-17 6-22 15"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      <div className="giftcard__top">
        <span className="giftcard__brand">ЧАНДМАНЬ УНДАРГА</span>
        <span className="giftcard__sub">Энергийн төв</span>
      </div>

      <div className="giftcard__mid">
        <span className="giftcard__label">Бэлгийн карт</span>
        <span className="giftcard__value">
          50,000<span>₮</span>
        </span>
      </div>

      <div className="giftcard__foot">
        <span>Өөртөө зориулсан цаг</span>
        <span className="giftcard__leaf" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M11 20A7 7 0 0 1 4 13C4 8 8 4 18 3 17 13 13 17 11 20Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M4 20C6 15 9 12 14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
