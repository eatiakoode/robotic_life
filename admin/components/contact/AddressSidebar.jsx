import Social from "../common/footer/Social";

const AddressSidebar = () => {
  return (
    <div className="contact_localtion">
      <h4>Contact Us</h4>
      <p>
      Whether you're ready to buy, just exploring options, or need expert advice, our team is here to help. Reach out today and take the next step toward your perfect property.
      </p>
      <div className="content_list">
        <h5>Address</h5>
        <p>
        1205, DLF Corporate Greens
        Sector 74A, Southern Peripheral Road, Gurgaon 122004
        </p>
      </div>
      <div className="content_list">
        <h5>Phone</h5>
        <p>+91 74219-22000</p>
      </div>
      <div className="content_list">
        <h5>Mail</h5>
        <p>Info@wegrowinfraventures.com</p>
      </div>
      <h5>Follow Us</h5>
      <ul className="contact_form_social_area">
        <Social />
      </ul>
    </div>
  );
};

export default AddressSidebar;
