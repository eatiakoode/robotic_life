import Link from "next/link";

const ErrorPageContent = () => {
  return (
    <div className="error_page footer_apps_widget">
      <div className="tick-check">
        <span className="flaticon-tick"></span>
      </div>
      <div className="erro_code">
        <h1>Thank You! <span>We've Received Your Submission.</span></h1>
      </div>
      <p>We appreciate you reaching out. Our team will get back to you shortly.</p>

      {/* <Form /> */}
      {/* End form */}

      <Link href="/" className="btn btn_error btn-thm">
        Back To Home
      </Link>
    </div>
  );
};

export default ErrorPageContent;
