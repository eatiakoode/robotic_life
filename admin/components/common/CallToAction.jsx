import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2>Book your site visit now</h2>
          <p>We only work with the best builders around the globe</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/contact" className="btn btn-thm2">
            Visit Now
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CallToAction;
