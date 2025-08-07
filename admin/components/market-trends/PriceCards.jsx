

export default function PriceCards() {
  return (
    <div className="price-card-container">
      {/* Avg. Price / Sqft Card */}
      <div className="price-card">
        <div className="price-card-left">
          <p className="label">Avg. Price / Sqft</p>
          <div className="price-info">
            <span className="price">₹21,892</span>
            <span className="change">Y-o-Y</span>
          </div>
        </div>
        {/* <a href="#" className="link">
            Price Trend
        </a> */}
      </div>

      {/* Price Range / Sqft Card */}
      <div className="price-card">
        <div className="price-card-left">
          <p className="label">Price Range / Sqft</p>
          <div className="price-info">
            <span className="price-range">₹1,333 - ₹1 Lakh</span>
            <span className="change">Y-o-Y</span>
          </div>
        </div>
        {/* <a href="#" className="link">See 2K Properties</a> */}
      </div>
    </div>
  );
}
