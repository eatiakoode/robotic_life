"use client";

const AllStatistics = ({
  robot = [],
  manufacturer = [],
  testimonials = [],
  enquery = [],
}) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: robot.length,
      name: "Total Robots",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-industry", 
      timer: manufacturer.length,
      name: "Total Manufacturers",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-star", 
      timer: testimonials.length,
      name: "Total Testimonials",
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-chat", 
      timer: enquery.length,
      name: "Total Enquiries",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div
          className="col-sm-6 col-md-6 col-lg-6 col-xl-3"
          key={item.id}
        >
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
