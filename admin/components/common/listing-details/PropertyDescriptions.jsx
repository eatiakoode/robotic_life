'use client'

import { useState } from "react";
import { useMemo } from "react";
import parse from 'html-react-parser';

const PropertyDescriptions = ({property,propertydetail}) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);

// Helper to extract plain text from HTML and slice words
// function splitHtmlContent(html, wordLimit = 150) {
//   const tempElement = document.createElement("div");
//   tempElement.innerHTML = html;
//   const text = tempElement.textContent || tempElement.innerText || "";

//   const words = text.split(/\s+/);
//   const firstPart = words.slice(0, wordLimit).join(" ");
//   const secondPart = words.slice(wordLimit).join(" ");

//   return {
//     first: firstPart,
//     second: secondPart
//   };
// }

function splitHtmlPreserve(html, wordLimit = 149) {
  let currentWords = 0;
  let firstPart = '';
  let secondPart = '';
  const regex = /(<[^>]+>)|([^<>\s]+(?:\s+)?)/g;

  let isFirstPart = true;

  for (const match of html.matchAll(regex)) {
    const [fullMatch, tag, word] = match;

    if (tag) {
      // Preserve tag in both parts
      if (isFirstPart) firstPart += tag;
      else secondPart += tag;
    } else if (word) {
      if (isFirstPart) {
        if (currentWords + 1 <= wordLimit) {
          firstPart += word;
          currentWords++;
        } else {
          isFirstPart = false;
          secondPart += word;
        }
      } else {
        secondPart += word;
      }
    }
  }

  return { first: firstPart, second: secondPart };
}

// const { first, second } = useMemo(() => {
//   if (!propertydetail?.description) return { first: "", second: "" };
//   return splitHtmlContent(propertydetail.description, 150);
// }, [propertydetail?.description]);

const { first, second } = useMemo(() => {
  if (!propertydetail?.description) return { first: "", second: "" };
  return splitHtmlPreserve(propertydetail.description, 149);
}, [propertydetail?.description]);




  return (
    <>
   {/* <p >{propertydetail.description}</p>  */}
    {/* <div dangerouslySetInnerHTML={{ __html: propertydetail?.description }} /> */}
   {/* <p className="" dangerouslySetInnerHTML={{ __html: first }} /> */}
   <div dangerouslySetInnerHTML={{ __html: first }} />




      {/* <p className="mb25">
        Evans Tower very high demand corner junior one bedroom plus a large
        balcony boasting full open NYC views. You need to see the views to
        believe them. Mint condition with new hardwood floors. Lots of closets
        plus washer and dryer.
      </p>
      <p className={click ? "gpara second_para white_goverlay mt10 mb10" : ""}>
        Fully furnished. Elegantly appointed condominium unit situated on
        premier location. PS6. The wide entry hall leads to a large living room
        with dining area. This expansive 2 bedroom and 2 renovated marble
        bathroom apartment has great windows. Despite the interior views, the
        apartments Southern and Eastern exposures allow for lovely natural light
        to fill every room. The master suite is surrounded by handcrafted
        milkwork and features incredible walk-in closet and storage space.
      </p> */}
      {/* <p className="mt10 mb10">
            Fully furnished. Elegantly appointed condominium unit situated on
            premier location. PS6. The wide entry hall leads to a large living
            room with dining area. This expansive 2 bedroom and 2 renovated
            marble bathroom apartment has great windows. Despite the interior
            views, the apartments Southern and Eastern exposures allow for
            lovely natural light to fill every room. The master suite is
            surrounded by handcrafted milkwork and features incredible walk-in
            closet and storage space.
          </p>
          */}
      <div className="collapse" id="collapseExample">
        {/* <div className="card card-body"> */}
          <div  dangerouslySetInnerHTML={{ __html: second }} />
          {/* <p  className="" dangerouslySetInnerHTML={{ __html: second }} /> */}
          
        {/* </div> */}
      </div> 
      <p className="overlay_close">
        <a
          className="text-thm fz14"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={handleClick}
        >
          {click ? 'Show More' : 'Show Less'} <span className={`flaticon-download-1 fz12 transition ${click ? '' : 'rotate-icon'}`}></span>
        </a>
      </p>
    </>
  );
};

export default PropertyDescriptions;
