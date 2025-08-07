import BuyFilter from "./BuyFilter";
// import SaleFilter from "./SaleFilter";

const GlobalHeroFilter = ({ className = "",cities }) => {
  return (
    <div className={`apartments-listing ${className}`}>
      {/* <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-buy-tab"
            data-bs-toggle="pill"
            href="#pills-buy"
            role="tab"
            aria-controls="pills-buy"
            aria-selected="true"
          >
            Buy
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-sale-tab"
            data-bs-toggle="pill"
            href="#pills-sale"
            role="tab"
            aria-controls="pills-sale"
            aria-selected="false"
          >
            Sale
          </a>
        </li>
      </ul> */}
      {/* End nav-pills */}

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <BuyFilter cities={cities}/>
        </div>
        {/* <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <SaleFilter />
        </div> */}
      </div>
    </div>
  );
};

export default GlobalHeroFilter;
