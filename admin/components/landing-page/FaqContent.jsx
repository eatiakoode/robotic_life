const FaqContent = ({landingpage}) => {
  return (
    <>
      <div className="accordion" id="accordionExample">
      {landingpage?.faqid?.slice(0, 38).map((singleItem,index) => (
        <div className="card" key={singleItem._id || index}>
          <div id="{`heading${index}`}">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
             {singleItem.title}
            </button>
          </div>
          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              <p>
              {singleItem.description}
              </p>
            </div>
          </div>
        </div>
        
      ))}
      {/* End .card */}

      </div>
    </>
  );
};

export default FaqContent;
