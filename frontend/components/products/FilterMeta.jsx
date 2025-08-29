import React from "react";

export default function FilterMeta({ allProps, productLength }) {
  return (
    <div className="meta-filter-shop" style={{}}>
      <div id="product-count-grid" className="count-text">
        <span className="count">{productLength}</span> Products Found
      </div>

      <div id="applied-filters">
        {allProps.availability != "All" ? (
          <span
            className="filter-tag"
            onClick={() => allProps.setAvailability("All")}
          >
            {allProps.availability.label}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}
                 {allProps.weight && allProps.weightBounds && 
          allProps.weight[1] !== allProps.weightBounds[1] ? (
          <span
            className="filter-tag weight-tag"
            onClick={() => allProps.setWeight(allProps.weightBounds)}
          >
            0 - {allProps.weight[1]} {allProps.weightUnit}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}
        {allProps.color != "All" ? (
          <span
            className="filter-tag color-tag"
            onClick={() => allProps.setColor("All")}
          >
            <span className={`color bg-red ${allProps.color.className} `} />
            {allProps.color.name}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}

        {allProps.brands.length ? (
          <React.Fragment>
            {allProps.brands.map((brand, i) => (
              <span
                key={i}
                className="filter-tag"
                onClick={() => allProps.removeBrand(brand)}
              >
                {brand}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
        
                 {/* Price filter tag */}
         {allProps.price && allProps.priceBounds && 
          allProps.price[1] !== allProps.priceBounds[1] ? (
          <span
            className="filter-tag price-tag"
            onClick={() => allProps.setPrice(allProps.priceBounds)}
          >
            $0 - ${allProps.price[1]}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}
      </div>
                    {allProps.availability != "All" ||
        (allProps.weight && allProps.weightBounds && 
         allProps.weight[1] !== allProps.weightBounds[1]) ||
        allProps.color != "All" ||
        allProps.brands.length ||
        (allProps.price && allProps.priceBounds && 
         allProps.price[1] !== allProps.priceBounds[1]) ? (
        <button
          id="remove-all"
          className="remove-all-filters text-btn-uppercase"
          onClick={allProps.clearFilter}
        >
          REMOVE ALL <i className="icon icon-close" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
