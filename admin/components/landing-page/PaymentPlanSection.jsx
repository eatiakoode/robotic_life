import { useState } from "react";
import Modal from "./UnlockModal"; // we'll create this next

const PaymentPlanSection = ({landingpage}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [plans, setPlans] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setShowModal(false);
  };

  // const plans = [
  //   {
  //     type: "3.5 BHK",
  //     area: "1825 Sq. Ft.",
  //     price: "₹ 3.65 Cr* Onwards",
  //   },
  //   {
  //     type: "4 BHK",
  //     area: "2100 Sq. Ft.",
  //     price: "₹ 4.15 Cr* Onwards",
  //   },
  //   {
  //     type: "4.5 BHK",
  //     area: "2350 Sq. Ft.",
  //     price: "₹ 4.75 Cr* Onwards",
  //   },
  // ];

  return (
    <section id="payment-plan" className="paymentland property-city scroll-mt-80px border-btm bgc-f7">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center">
              <h2>Payment Plan - 30:70</h2>
              <p>Latest Offers</p>
            </div>
          </div>
        </div>

        {!unlocked && (
            <div className="view-all text-center my-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                View Payment Plans
              </button>
            </div>
          )}


        <div className="row">
          {landingpage?.paymentplan?.map((plan, index) => (
            <div className="col-lg-4" key={index}>
              <div
                className={`property-block_one style-two ${!unlocked ? "blurred" : ""}`}
                onClick={() => {
                  if (!unlocked) setShowModal(true);
                }}
                style={{ cursor: !unlocked ? "pointer" : "default" }}
              >
                <div className="property-block_one-inner">
                  <div className="property-block_one-content">
                    <div className="property-block_one-location">{plan.title}</div>
                    <h4 className="property-block_one-heading">
                      <a href="#">{plan.areasize}</a>
                    </h4>
                    <ul className="property-block_one-info">
                      <li><span>{plan.price}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal with form */}
        {showModal && <Modal onClose={() => setShowModal(false)} onUnlock={handleUnlock} landingpage={landingpage} />}
      </div>

    </section>
  );
};

export default PaymentPlanSection;

