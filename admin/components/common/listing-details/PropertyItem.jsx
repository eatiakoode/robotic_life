// const PropertyItem = ({property})=> {
//   return (
//     <ul className="mb0">
//       <li className="list-inline-item">
//         <a href="#">{property.propertytypeid?.title}</a>
//       </li>
//       <li className="list-inline-item">
//         <a href="#">Beds: {property.bedrooms}</a>
//       </li>
//       <li className="list-inline-item">
//         <a href="#">Baths: {property.bathrooms}</a>
//       </li>
//       <li className="list-inline-item">
//         <a href="#">{property.sizeprefix}: {property.areasize}</a>
//       </li>
//     </ul>
//   );
// };

// export default PropertyItem;


const PropertyItem = ({ property }) => {
  return (
    <>
    <ul className="mb0">
      {/* {property.propertytypeid && ( */}
      <li className="list-inline-item">
        <span>{property.propertytypeid?.title}</span>
      </li>
      {/* )} */}
      {property.paymentplan && (
      <li className="list-inline-item">
        <span>Payment Plan: {property.paymentplan}</span>
      </li>
      )}
      {property.categoryid._id=="67ea48d17cfa562fe8eaafd0" && (
      <li className="list-inline-item">
        <span>Food court/restaurant: {property.foodcourt ? "Yes" : "No"}</span>
      </li>
      )}
      {property.categoryid._id=="67ea48d17cfa562fe8eaafd0" && (
      <li className="list-inline-item">
        <span>Multiplex: {property.multiplex ? "Yes" : "No"}</span>
      </li>
      )}
      <li className="list-inline-item">
        <span>Size: {property.areasize} {property.sizeprefix}</span>
      </li>
    </ul>
    {property.highlights && (
    <div className="property-highlights"><h4>Highlights</h4>
    <p>{property.highlights}</p></div>
    )}
    </>
  );
};

export default PropertyItem;
