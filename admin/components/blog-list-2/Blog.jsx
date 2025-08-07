'use client'
import Link from "next/link";
// import blogContent from "../../data/blogs";
import Image from "next/image";
// import { getBlogTableData } from "@/api/frontend/blog";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

const Blog = ({blogs}) => {
  function stripHtml(html) {
    return html?.replace(/<[^>]*>/g, '');
  }
  
  
  return (
    <>
      {blogs.slice(0, 6).map((item,index) => (
        <div className="col-lg-6" key={index}>
          <div className="for_blog feat_property">
            <div className="thumb">
              <Link href={`/blog-detail/${item.slug}`}>
                <Image
                  width={343}
                  height={220}
                  priority
                  className="img-whp cover w-100"
                  src={
                    item.logoimage
                      ? `${process.env.NEXT_PUBLIC_API_URL}${item.logoimage}`
                      : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                  }
                  alt= {`${item.title}${index + 1}`}
                  unoptimized 
                />
              </Link>
              <div className="blog_tag">{item.blogcategory?.title}</div>
            </div>
            {/* End .thumb */}

            <div className="details">
              <div className="tc_content">
                <h4 className="mb15">
                <Link href={`/blog-detail/${item.slug}`}>{item.title}</Link>
                </h4>
                <ul className="bpg_meta mb10">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="flaticon-calendar"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                  <a href="#">{new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })}</a>
                  </li>
                </ul>
                {stripHtml(item.description).slice(0, 150)}
                {/* <div dangerouslySetInnerHTML={{ __html: item.description.slice(0, 100) }} /> */}
              </div>
              {/* End .tc_content */}

              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  {/* <li className="list-inline-item">
                    <a href="#">
                      <Image
                        width={40}
                        height={40}
                        src={item.posterAvatar}
                        alt={item.posterAvatar}
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">{item.posterName}</a>
                  </li> */}
                   <li className="list-inline-item">
                      <a  href={`/blog-detail/${item.slug}`}>{item.source}</a>
                    </li>
                </ul>
                <a className="fp_pdate float-end text-thm"  href={`/blog-detail/${item.slug}`}>
                    Read More <span className="flaticon-next"></span>
                  </a>
              </div>
              {/* End fb_footer */}
            </div>
            {/* End .thumb */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
