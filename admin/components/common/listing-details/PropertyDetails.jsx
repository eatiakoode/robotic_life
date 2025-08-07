const PropertyDetails = ({property}) => {
  return (
    <>
      <div className="property-detail-item">
        <ul className="list-inline-item">
          {property.propertyid && (
            <li>
              <p>
                Property ID : <span>{property.propertyid}</span>
              </p>
            </li>
          )}
          {property.price && (
            <li>
              <p>
                Price : <span>{property.price}</span>
              </p>
            </li>
          )}
          {(property.areasize || property.sizeprefix) && (
            <li>
              <p>
                Property Size : <span>{property.areasize} {property.sizeprefix}</span>
              </p>
            </li>
          )}
          {property.yearbuild && (
            <li>
              <p>
                Possession Year : <span>{property.yearbuild}</span>
              </p>
            </li>
          )}
          
           {property.bedrooms && (
          <li>
            <p>
              {property.categoryid._id=="67ea48d17cfa562fe8eaafd0" ? "Meeting rooms and cabins":"Bedrooms"} : <span>{property.bedrooms}</span>
            </p>
          </li>
          )}
          {property.bathrooms && (
          <li>
            <p>
              Bathrooms : <span>{property.bathrooms}</span>
            </p>
          </li>
          )}
          {property.garages && (
          <li>
            <p>
              Parking : <span>{property.garages}</span>
            </p>
          </li>
          )}
          {property.garages && (
          <li>
            <p>
            Parking Space: <span>{property.garages}</span>
            </p>
          </li>
          )}
          {property.garagessize && (
          <li>
            <p>
            Parking : <span>{property.garagessize}</span>
            </p>
          </li>
          )}
          <li>
            <p>
              Property Type : <span>{property.propertytypeid?.title}</span>
            </p>
          </li>
          <li>
            <p>
              Property Status : <span>{property.furnishingstatus?.title}</span>
            </p>
          </li>
          {property.reranumber && (
            <li className="rera_no">
              <p>
                Rera Number : <span>{property.reranumber}</span>
              </p>
            </li>
          )}
        </ul>
      </div>
      {/* End .col */}

      
    </>
  );
};

export default PropertyDetails;
