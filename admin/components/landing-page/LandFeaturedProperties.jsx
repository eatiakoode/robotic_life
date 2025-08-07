// 'use client';

// import Link from "next/link";
// import Slider from "react-slick";
// import landproperties from "../../data/landproperties";
// import Image from "next/image";

// const LandFeaturedProperties = () => {
//   const settings = {
//     dots: false,
//     arrows: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: false,
//     speed: 1200,
//     responsive: [
//       {
//         breakpoint: 1600,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 1400,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 520,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...settings}>
//       {landproperties.slice(0, 6).map((item) => (
//         <div className="item" key={item.id}>
//           <div className="properti_city home6">
//             <div className="thumb">
//               <Image
//                 width={367}
//                 height={370}
//                 className="img-whp"
//                 src={item.img}
//                 alt={item.title}
//               />
//               {/* Optionally, you can put price as a tag or badge */}
//               <div className="thmb_cntnt">
//                 <ul className="tag mb0">
//                   <li className="list-inline-item">
//                     <span className="badge bg-primary">{item.type}</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             {/* End .thumb */}

//             <div className="overlay">
//               <div className="details">
//                 <div className="fp_price">
//                   {item.price}
//                 </div>
//                 <h4>
//                   <Link href={`/listing-details/${item.id}`}>
//                     {item.title}
//                   </Link>
//                 </h4>
//                 <p>{item.location}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default LandFeaturedProperties;

