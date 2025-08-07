const AllStatistics = ({properties,enqueryProperty,enqueryLanding,enquery}) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: properties.length,
      name: "All Properties",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-view",
      timer: enqueryProperty.length,
      name: "Total Property Page Enquiry",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-chat",
      timer: enqueryLanding.length,
      name: "Total Landing Page Enquiry",
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-heart",
      timer: enquery.length,
      name: "Total Contact Us Enquiry",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
