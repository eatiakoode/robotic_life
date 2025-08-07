import Link from "next/link";

const TalktoExpert = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2>Need help? Talk to our expert.</h2>
          <p>Talk to our experts or Browse through more properties.</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4">
       
        <div className="parner_reg_btn text-right tac-smd">
            <Link href="tel:+917421922000" className="call-icon">
            <span className="flaticon-telephone"></span>
            </Link>
          <Link href="/contact" className="btn btn-thm2">
            Contact Us
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default TalktoExpert;
