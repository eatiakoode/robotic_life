import { useState } from "react";
import FloorFeaturedProperties from "./FloorFeaturedProperties";
import UnlockModal from "./UnlockModal"; 

const FloorPlanSection = ({landingpage}) => {
  const [floorPlanUnlocked, setFloorPlanUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUnlock = () => {
    setFloorPlanUnlocked(true);
    setShowModal(false);
  };

  return (
    <section id="floorplans" className="feature-property-home6 scroll-mt-80px border-btm">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title mb40">
              <h2>Floor Plan</h2>
            </div>
          </div>
        </div>
      </div>
          {!floorPlanUnlocked && (
            <div className="view-all text-center my-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                View Floor Plans
              </button>
            </div>
          )}
      <div className="feature_property_home6_slider">
        <div className="container ml--xxl-0">
          <div className="gutter-x15">
            <FloorFeaturedProperties
              unlocked={floorPlanUnlocked}
              setShowModal={setShowModal} landingpage={landingpage}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <UnlockModal onClose={() => setShowModal(false)} onUnlock={handleUnlock} landingpage={landingpage}/>
      )}
    </section>
  );
};

export default FloorPlanSection;
