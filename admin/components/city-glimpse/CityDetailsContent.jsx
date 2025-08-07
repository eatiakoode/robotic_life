'use client'

import Cardslidelisting from "../common/Cardslidelisting";

const CityDetailsContent = ({citiedetail}) => {
  function stripHtml(html) {
    return html?.replace(/<[^>]*>/g, '');
  }
  return (
    <>
  <div className="listing_single_description">
    <h4 className="mb30">{citiedetail.title}</h4>
    <p className="mb25">{stripHtml(citiedetail.description)?.slice(0, 500)}</p>
    {/* <p className="mb25">Gurgaon, officially known as Gurugram, is a major city in the Indian state of Haryana. It is located just southwest of New Delhi and is part of the National Capital Region (NCR). Over the past two decades, Gurgaon has transformed from a rural town into a thriving urban center known for its modern infrastructure and rapid economic development.</p> */}
    {/* <p className="gpara second_para white_goverlay mt10 mb10">Gurgaon is a prominent commercial, financial, and technology hub of India, hosting numerous multinational corporations, IT parks, and Fortune 500 companies. The city also houses several key government offices and business process outsourcing (BPO) firms, making it a key contributor to India’s service sector economy.</p> */}
    <div className="collapse" id="collapseExample">
      <div className="card card-body">
        <p className="mt10 mb10">{stripHtml(citiedetail.description)?.slice(500)}</p>
        {/* <p className="mt10 mb10">The city boasts excellent connectivity via road, metro, and air. It is well-connected to Delhi and other NCR regions through the Delhi Metro, Rapid Metro, and expressways like the Delhi-Gurgaon Expressway. Gurgaon is also in close proximity to the Indira Gandhi International Airport, making both domestic and international travel convenient.</p>
        <p className="mt10 mb10">Gurgaon offers world-class healthcare facilities, international schools, upscale shopping malls, and entertainment centers, making it a popular choice for families and professionals alike. It is also known for its vibrant food scene, featuring everything from high-end restaurants in Cyber Hub to authentic street food in local markets.</p>
        <p className="mt10 mb10">Some of the top residential and commercial localities in Gurgaon include DLF Phase 1–5, Golf Course Road, Sector 56, Sector 82, Sohna Road, and MG Road. Each area offers a unique mix of modern living, excellent amenities, and a well-planned infrastructure.</p> */}
      </div>
    </div>
    <p className="overlay_close">
      <a className="text-thm fz14 collapsed" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Show More <span className="flaticon-download-1 fz12"></span>
      </a>
    </p>
  </div>
  {/* <div className="property_attachment_area mt30">
    <h4 className="mb30">Property Brochure</h4>
    <div className="iba_container style2">
      <a
        href="/assets/images/51_Property_Law.pdf"
        download
        className="icon_box_area style2 d-flex align-items-center"
        style={{ textDecoration: 'none' }}
      >
        <div className="score">
          <span className="flaticon-pdf text-thm fz30"></span>
        </div>
        <div className="details">
          <h5 className="mb-0">
            <span className="flaticon-download text-thm pr10"></span> Property Details Doc
          </h5>
        </div>
      </a>
    </div>
  </div> */}
 <div className="application_statics mt30 shadow-none">
  <Cardslidelisting citiedetail={citiedetail}/>
 </div>
  
  
  

      
    </>
  );
};

export default CityDetailsContent;
