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
          <h2 className="mt0 color-main">WEGROW INFRAVENTURES PVT. LTD.</h2>
          <h4 className="mt0 mb0">Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions
</h4>
<p>At <strong>WEGROW INFRAVENTURES PVT. LTD.</strong>, we are driven by a clear vision — to become the most trusted and result-driven real estate consultancy in <strong>Gurgaon and Delhi NCR</strong>. Since our inception, we have dedicated ourselves to understanding the unique needs of our clients and delivering tailored real estate solutions that meet their expectations, financial goals, and long-term aspirations.</p>
          <p>
          Whether you're a <strong>first-time homebuyer</strong>, a <strong>business owner seeking the right commercial space</strong>, or an <strong>investor looking for high-yield opportunities</strong>, WEGROW INFRAVENTURES ensures a seamless and rewarding experience at every step of your journey.
          </p>
          <p><strong>Why Choose WEGROW INFRAVENTURES?</strong></p>
          <ul>
            <li><strong>Client-Centric Approach: </strong>We prioritize your goals, not transactions. Our strategies are shaped around your needs to ensure satisfaction and long-term value.</li>
            <li><strong>Expert Market Knowledge: </strong>With deep insights into Gurgaon and Delhi NCR's ever-evolving real estate landscape, we guide you toward smart, informed decisions.</li>
            <li><strong>Transparent Processes: </strong>We believe trust is built on honesty. Our processes are fully transparent, with clear communication and no hidden surprises.</li>
            <li><strong>Comprehensive Services: </strong>From residential and commercial properties to investment advisory, we cover all aspects of real estate with professionalism and integrity.</li>

          </ul>

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

      {/* <div className="col-lg-5 col-xl-5 offset-xl-1 ms-auto">
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
      </div> */}
    </>
  );
};

export default OurMission;
