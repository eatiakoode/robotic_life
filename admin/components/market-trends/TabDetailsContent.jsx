import { useEffect, useState } from "react";
import PropertyTable from "./PropertyTable";
import { getCategoryTableData } from "@/api/frontend/category";
import { getPropertytypeByCategoryTableData } from "@/api/frontend/propertytype";

const TabDetailsContent = () => {
  const [mainTab, setMainTab] = useState("residential");
  const [residentialTab, setResidentialTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [propertyTypesMap, setPropertyTypesMap] = useState({});

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const filter = {
            limit: 1000,
            page:  1
          }
        const response = await getCategoryTableData(filter);
        setCategories(response || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch property types based on selected category
  // useEffect(() => {
  //   const selectedCategory = categories.find(
  //     (category) => category.title.toLowerCase() === mainTab
  //   );

  //   if (selectedCategory && !propertyTypesMap[selectedCategory._id]) {
  //     const fetchTypes = async () => {
  //       try {
  //         const response = await getPropertytypeByCategoryTableData(selectedCategory._id);
  //         setPropertyTypesMap((prev) => ({
  //           ...prev,
  //           [selectedCategory._id]: response.data || [],
  //         }));

  //         if (!residentialTab && response.data?.length) {
  //           setResidentialTab(response.data[0].title.toLowerCase());
  //         }
  //       } catch (err) {
  //         console.error("Error fetching property types:", err);
  //       }
  //     };
  //     fetchTypes();
  //   }
  // }, [mainTab, categories, propertyTypesMap, residentialTab]);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.title.toLowerCase() === mainTab
    );
  
    if (selectedCategory) {
      const fetchTypes = async () => {
        try {
          const response = await getPropertytypeByCategoryTableData(selectedCategory._id);
          const propertyTypes = response.data || [];
  
          setPropertyTypesMap((prev) => ({
            ...prev,
            [selectedCategory._id]: propertyTypes,
          }));
  
          // Always set the first property type as the active sub-tab
          if (propertyTypes.length > 0) {
            setResidentialTab(propertyTypes[0].title.toLowerCase());
          }
        } catch (err) {
          console.error("Error fetching property types:", err);
        }
      };
  
      fetchTypes();
    }
  }, [mainTab, categories]);
  

  const selectedCategory = categories.find(
    (c) => c.title.toLowerCase() === mainTab
  );
  const propertyTypes = selectedCategory
    ? propertyTypesMap[selectedCategory._id] || []
    : [];

  const selectedPropertyType = propertyTypes.find(
    (item) => item.title.toLowerCase() === residentialTab
  );

  return (
    <div>
      {/* Main Tabs */}
      <div className="text-center">
        <ul className="nav nav-pills mb-4">
          {categories.map((categoryitem) => (
            <li className="nav-item" key={categoryitem._id}>
              <button
                className={`nav-link ${
                  mainTab === categoryitem.title.toLowerCase() ? "active" : ""
                }`}
                onClick={() => {
                  setMainTab(categoryitem.title.toLowerCase());
                  // setResidentialTab(""); // Reset sub-tab
                }}
              >
                {categoryitem.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub Tabs */}
      {selectedCategory && (
        <>
          <ul className="nav nav-tabs mb-3">
            {propertyTypes.map((propertytypeitem) => (
              <li className="nav-item" key={propertytypeitem._id}>
                <button
                  className={`nav-link ${
                    residentialTab === propertytypeitem.title.toLowerCase()
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setResidentialTab(propertytypeitem.title.toLowerCase())
                  }
                >
                  {propertytypeitem.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Tab Content */}
          <ResidentialTabContent
            activeTab={residentialTab}
            propertytypeid={selectedPropertyType?._id}
            categoriesid={selectedCategory._id}
          />
        </>
      )}
    </div>
  );
};

const ResidentialTabContent = ({ activeTab, propertytypeid, categoriesid }) => {
  return (
    <div className="tab-pane-content">
      {activeTab && propertytypeid && categoriesid && (
        <PropertyTable
          propertytypeid={propertytypeid}
          categoriesid={categoriesid}
        />
      )}
    </div>
  );
};

export default TabDetailsContent;
