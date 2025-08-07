import Image from "next/image";
import PopupVideo from "../common/PopupVideo";

const OurMission = () => {
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "80,123",
      meta: "Customers to date",
    },
    {
      id: 2,
      icon: "flaticon-home",
      number: "$74 Billion",
      meta: "In home sales",
    },
    {
      id: 3,
      icon: "flaticon-transfer",
      number: "$468 Million",
      meta: "In Savings",
    },
  ];

  return (
    <>
      <div className="col-lg-7 col-xl-6">
        <div className="about_content">
          <h2 className="mt0 color-main">About Ankit Goyat</h2>
          <h4 className="mt0">Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions</h4>
          <p>
          At WEGROW INFRAVENTURES PVT. LTD., we pride ourselves on helping you find the perfect property that meets your budget. Specializing in projects across Gurgaon and Delhi NCR, we offer a tailored approach to home buying and property investment. With our expert team, we guide residential buyers and commercial investors through every step, ensuring they make the best real estate decisions. Let us help you secure your future with property investments that matter.
          </p>
          <p>
          At WEGROW INFRAVENTURES PVT. LTD., we pride ourselves on helping you find the perfect property that meets your budget. Specializing in projects across Gurgaon and Delhi NCR, we offer a tailored approach to home buying and property investment. With our expert team, we guide residential buyers and commercial investors through every step, ensuring they make the best real estate decisions. Let us help you secure your future with property investments that matter.
          </p>
          <p>
          At WEGROW INFRAVENTURES PVT. LTD., we pride ourselves on helping you find the perfect property that meets your budget. Specializing in projects across Gurgaon and Delhi NCR, we offer a tailored approach to home buying and property investment. With our expert team, we guide residential buyers and commercial investors through every step, ensuring they make the best real estate decisions. Let us help you secure your future with property investments that matter.
          </p>
          <p>
          At WEGROW INFRAVENTURES PVT. LTD., we pride ourselves on helping you find the perfect property that meets your budget. Specializing in projects across Gurgaon and Delhi NCR, we offer a tailored approach to home buying and property investment. With our expert team, we guide residential buyers and commercial investors through every step, ensuring they make the best real estate decisions. Let us help you secure your future with property investments that matter.
          </p>

          {/* <ul className="ab_counting">
            {missionContent.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <div className="about_counting">
                  <div className="icon">
                    <span className={`${item.icon}`}></span>
                  </div>
                  <div className="details">
                    <h3>{item.number}</h3>
                    <p>{item.meta}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul> */}
          {/* End .ab_counting */}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-5 col-xl-5 offset-xl-1 ms-auto">
        <div className="about_thumb">
          <Image
            width={461}
            height={750}
            priority
            className="w100 cover"
            src="/assets/images/about/head.webp"
            alt="1.jpg"
          />
          <PopupVideo />
        </div>
      </div>
    </>
  );
};

export default OurMission;
