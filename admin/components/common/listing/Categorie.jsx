const Categorie = ({propertytypesidebar}) => {
  return (
    <>
      {propertytypesidebar?.map((item) =>
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
      {/* End li */}

    
    </>
  );
};

export default Categorie;
