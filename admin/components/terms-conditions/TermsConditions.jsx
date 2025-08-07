// import Link from "next/link";

// const TermsConditions = () => {
//   const termsContent = [
//     {
//       id: 1,
//       title: "Privacy Policy",
//       text1: `Curabitur massa magna, tempor in blandit id, porta in ligula.
//       Aliquam laoreet nisl massa, at interdum mauris sollicitudin et.
//       Mauris risus lectus, tristique at nisl at, pharetra tristique
//       enim.`,
//       text2: `Nullam this is a link nibh facilisis, at malesuada orci congue.
//       Nullam tempus sollicitudin cursus. Nulla elit mauris, volutpat eu
//       varius malesuada, pulvinar eu ligula. Ut et adipiscing erat.
//       Curabitur adipiscing erat vel libero tempus congue. Nam pharetra
//       interdum vestibulum. Aenean gravida mi non aliquet porttitor.
//       Praesent dapibus, nisi a faucibus tincidunt, quam dolor
//       condimentum metus, in convallis libero ligula ut`,
//     },
//     {
//       id: 2,
//       title: "Our Terms",
//       text1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
//       mollis et sem sed sollicitudin. Donec non odio neque. Aliquam
//       hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque
//       bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam
//       tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this
//       is a text link libero tempus congue.`,
//       text2: `Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin
//       sagittis dolor sed mi elementum pretium. Donec et justo ante.
//       Vivamus egestas sodales est, eu rhoncus urna semper eu. Cum sociis
//       natoque penatibus et magnis dis parturient montes, nascetur
//       ridiculus mus. Integer tristique elit lobortis purus bibendum,
//       quis dictum metus mattis. Phasellus posuere felis sed eros
//       porttitor mattis. Curabitur massa magna, tempor in blandit id,
//       porta in ligula. Aliquam laoreet nisl massa, at interdum mauris
//       sollicitudin et.`,
//     },
//   ];

//   const navigationList = [
//     { id: 1, routeLink: "#", name: "Welcome Text" },
//     { id: 2, routeLink: "#", name: "Our Terms" },
//     { id: 3, routeLink: "#", name: "Conditions" },
//     { id: 4, routeLink: "#", name: "Your Privacy" },
//     { id: 5, routeLink: "#", name: "Informations We Collect" },
//   ];

//   return (
//     <div className="row">
//       <div className="col-lg-8 col-xl-8">
//         <div className="terms_condition_grid">
//           {termsContent.map((item) => (
//             <div className="grids mb30" key={item.id}>
//               <h4>{item.title}</h4>
//               <p className="mb20">{item.text1}</p>
//               <p>{item.text2}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-4 col-xl-4">
//         <div className="terms_condition_widget">
//           <h4 className="title">Navigation</h4>
//           <div className="widget_list">
//             <ul className="list_details">
//               {navigationList.map((list) => (
//                 <li key={list.id}>
//                   <Link href={list.routeLink}>
//                     <i className="fa fa-caret-right mr10"></i>
//                     {list.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsConditions;
export default function TermsConditions() {
  return (
    <div className="container my-5 terms-conditions-page">
      <h1 className="mb-4">Terms & Conditions</h1>

      <p>
        Welcome to the website of <strong>WEGROW INFRAVENTURES PRIVATE LIMITED</strong>. By accessing or using our services, you agree to the following terms:
      </p>

      <h4 className="mt-4">1. Role of the Company</h4>
      <p>
        WEGROW INFRAVENTURES operates as a real estate channel partner, facilitating property transactions between buyers and developers.
      </p>

      <h4 className="mt-4">2. Use of Content</h4>
      <p>
        All content on this website, including images, text, and property information, is for informational purposes only. Unauthorized use or reproduction is prohibited.
      </p>

      <h4 className="mt-4">3. No Guarantee</h4>
      <p>
        Project details are subject to change. We do not guarantee the accuracy, availability, or completeness of information provided on behalf of developers.
      </p>

      <h4 className="mt-4">4. Limitation of Liability</h4>
      <p>
        WEGROW INFRAVENTURES shall not be liable for any direct or indirect losses resulting from your reliance on information presented on this website or shared through our team.
      </p>

      <h4 className="mt-4">5. User Conduct</h4>
      <p>
        You agree not to misuse the website for fraudulent or unlawful activities, including spam, unauthorized access, or interference with site operations.
      </p>

      <h4 className="mt-4">6. Intellectual Property</h4>
      <p>
        All branding, logos, and content are the intellectual property of WEGROW INFRAVENTURES or its content providers.
      </p>

      <h4 className="mt-4">7. Jurisdiction</h4>
      <p>
        These terms are governed by the laws of Haryana, India. Disputes shall be subject to the jurisdiction of courts in Gurgaon.
      </p>

      <h4 className="mt-4">Contact Us</h4>
      <p>
        For questions related to these terms, reach out to us at <a href="tel:+917421922000">7421922000</a>.
      </p>
    </div>
  );
}
