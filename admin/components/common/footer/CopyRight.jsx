import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';

const CopyRight = () => {
    return (
      <>
<div className="row mt50">
<div className="col-lg-12">
  <div className="copyright-widget text-center">
    <p>© 2025 RoboticLife. All rights reserved | Made With  <a target="_blank" href="https://www.akoode.com/"> <i className="fa fa-heart"></i> </a></p>
  </div>
</div>
</div> 
<ToastContainer /> 
</>
 );
};

export default CopyRight;