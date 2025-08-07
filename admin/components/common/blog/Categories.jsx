const Categories = ({propertytype}) => {
  // const categorieContent = [
  //   { id: 1, name: "Apartment", propertyNumber: "6" },
  //   { id: 2, name: "Condo", propertyNumber: "12" },
  //   { id: 3, name: "Family House", propertyNumber: "8" },
  //   { id: 4, name: "Modern Villa", propertyNumber: "26" },
  //   { id: 5, name: "Town House", propertyNumber: "89" },
  // ];
  
  return (
    <ul className="list_details">
      {propertytype.map((item) =>
        item.propertyCount > 0 ? (
        <li key={item.typeId}>
           <a href={`/property-list?propertytype=${item.typeId}`}>
            <i className="fa fa-caret-right mr10"></i>
            {item.typeName}{" "}
            <span className="float-end">{item.propertyCount} properties</span>
          </a>
        </li>
       ) : null
      )}
    </ul>
  );
};

export default Categories;
