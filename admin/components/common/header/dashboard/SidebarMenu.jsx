"use client";

import Link from "next/link";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import { SafeImage } from "../../../../utils/imageUtils";
// import { SafeImage } from "../../../../utils/imageUtils";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();

  const myRobots = [
    { id: 1, name: "Add Robot", route: "/cmsroboticlife/create-listing" },
    { id: 2, name: "Robot List", route: "/cmsroboticlife/my-robot" },
  ];
  const RoboCategory = [
    { id: 1, name: "Add Category", route: "/cmsroboticlife/add-category" },
    { id: 2, name: "Category List", route: "/cmsroboticlife/my-category" },
  ];
  const MasterData = [
    { id: 1, name: "Add Country", route: "/cmsroboticlife/add-country" },
    { id: 2, name: "Country List", route: "/cmsroboticlife/my-country" },
    {
      id: 3,
      name: "Add Power Source",
      route: "/cmsroboticlife/add-powersource",
    },
    {
      id: 4,
      name: "Power Source List",
      route: "/cmsroboticlife/my-powersource",
    },
    { id: 5, name: "Add Color", route: "/cmsroboticlife/add-color" },
    { id: 6, name: "Color List", route: "/cmsroboticlife/my-color" },
    { id: 7, name: "Add Material", route: "/cmsroboticlife/add-material" },
    { id: 8, name: "Material List", route: "/cmsroboticlife/my-material" },
    {
      id: 9,
      name: "Add Navigation Type",
      route: "/cmsroboticlife/add-navigationtype",
    },
    {
      id: 10,
      name: "Navigation Type List",
      route: "/cmsroboticlife/my-navigationtype",
    },
    { id: 11, name: "Add Sensor", route: "/cmsroboticlife/add-sensor" },
    { id: 12, name: "Sensor List", route: "/cmsroboticlife/my-sensor" },
    {
      id: 13,
      name: "Add Primary Function",
      route: "/cmsroboticlife/add-primaryfunction",
    },
    {
      id: 14,
      name: "Primary Function List",
      route: "/cmsroboticlife/my-primaryfunction",
    },
    {
      id: 15,
      name: "Add AI/Software Feature",
      route: "/cmsroboticlife/add-aisoftwarefeature",
    },
    {
      id: 16,
      name: "AI/Software Feature List",
      route: "/cmsroboticlife/my-aisoftwarefeature",
    },
    {
      id: 17,
      name: "Add Operating Environment",
      route: "/cmsroboticlife/add-operatingenvironment",
    },
    {
      id: 18,
      name: "Operating Environment List",
      route: "/cmsroboticlife/my-operatingenvironment",
    },
    {
      id: 19,
      name: "Add Terrain Capability",
      route: "/cmsroboticlife/add-terraincapability",
    },
    {
      id: 20,
      name: "Terrain Capability List",
      route: "/cmsroboticlife/my-terraincapability",
    },
    {
      id: 21,
      name: "Add Autonomy Level",
      route: "/cmsroboticlife/add-autonomylevel",
    },
    {
      id: 22,
      name: "Autonomy Level List",
      route: "/cmsroboticlife/my-autonomylevel",
    },
    {
      id: 23,
      name: "Add Communication Method",
      route: "/cmsroboticlife/add-communicationmethod",
    },
    {
      id: 24,
      name: "Communication Method List",
      route: "/cmsroboticlife/my-communicationmethod",
    },
    {
      id: 25,
      name: "Add Payload Type",
      route: "/cmsroboticlife/add-payloadtype",
    },
    {
      id: 26,
      name: "Payload Type List",
      route: "/cmsroboticlife/my-payloadtype",
    },
  ];

  const RoboManufacturer = [
    {
      id: 1,
      name: "Add Manufacturer",
      route: "/cmsroboticlife/add-manufacturer",
    },
    {
      id: 2,
      name: "Manufacturer List",
      route: "/cmsroboticlife/my-manufacturer",
    },
  ];

  const Slider = [
    { id: 1, name: "Add Slider", route: "/cmsroboticlife/add-slider" },
    { id: 2, name: "Slider List", route: "/cmsroboticlife/my-slider" },
  ];

  const Blog = [
    {
      id: 1,
      name: "Add Blog category",
      route: "/cmsroboticlife/add-blogcategory",
    },
    {
      id: 2,
      name: "Blog category List",
      route: "/cmsroboticlife/my-blogcategory",
    },
    { id: 3, name: "Add Blog", route: "/cmsroboticlife/add-blog" },
    { id: 4, name: "Blog List", route: "/cmsroboticlife/my-blog" },
  ];

  const Faq = [
    { id: 1, name: "Add FAQ", route: "/cmsroboticlife/add-faq" },
    { id: 2, name: "FAQ List", route: "/cmsroboticlife/my-faq" },
  ];

  const testimonial = [
    {
      id: 1,
      name: "Add Testimonial",
      route: "/cmsroboticlife/add-testimonial",
    },
    {
      id: 2,
      name: "Testimonial List",
      route: "/cmsroboticlife/my-testimonial",
    },
  ];

  const reviews = [
    { id: 1, name: "My Reviews", route: "/cmsroboticlife/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/cmsroboticlife/my-review" },
  ];

  const enquerylist = [
    { id: 1, name: "My enquery list", route: "/cmsroboticlife/my-enquiry" },
  ];

  const manageAccount = [
    {
      id: 1,
      name: "My Package",
      route: "/my-package",
      icon: "flaticon-box",
    },
    {
      id: 2,
      name: "My Profile",
      route: "/my-profile",
      icon: "flaticon-user",
    },
    { id: 3, name: "Logout", route: "/login", icon: "flaticon-logout" },
  ];

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link href="/cmsroboticlife/my-dashboard">
            <SafeImage
              width={275}
              height={100}
              src="/assets/images/logo1.svg"
              alt="logo1.svg"
            />
            {/* <span>WeGrow</span> */}
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          {/* <span>Main</span> */}
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/my-dashboard", pathname) ? "active" : ""
              }`}
            >
              <Link href="/cmsroboticlife/my-dashboard">
                <i className="flaticon-layers"></i>
                <span> Dashboard</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* End Main */}

        {/* Robot Robot Manage Listing Start */}
        <li className="title">
          <span>Manage Listings</span>
          <ul>
            {/* Robot Master Data Start */}
            <li
              className={`treeview ${
                isParentPageActive(MasterData, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#MasterData">
                <i className="flaticon-home"></i> <span>Master Data</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="MasterData">
                {MasterData.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Master Data End */}

            {/* Robot Manufacturer Start */}
            <li
              className={`treeview ${
                isParentPageActive(RoboManufacturer, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#roboManufacturer">
                <i className="flaticon-home"></i> <span>Manufacturer</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="roboManufacturer">
                {RoboManufacturer.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Manufacturer End */}

            {/* Robot Category Start */}
            <li
              className={`treeview ${
                isParentPageActive(RoboCategory, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-RoboCategory">
                <i className="flaticon-home"></i> <span>Robot Category</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-RoboCategory">
                {RoboCategory.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Category Start */}

            {/* Robot Listing Start */}
            <li
              className={`treeview ${
                isParentPageActive(myRobots, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-robots">
                <i className="flaticon-home"></i> <span>Robot Listing</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-robots">
                {myRobots.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Listing End */}

            {/* Slider Start */}
            <li
              className={`treeview ${
                isParentPageActive(Slider, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#slider">
                <i className="flaticon-home"></i> <span>Slider</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="slider">
                {Slider.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Slider End */}

            {/* Robot Blog Start */}
            <li
              className={`treeview ${
                isParentPageActive(Blog, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#blog">
                <i className="flaticon-home"></i> <span>Blogs</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="blog">
                {Blog.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Blog End */}

            {/* Robot Enqueries Start */}
            <li
              className={`treeview ${
                isParentPageActive(enquerylist, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-enquerylist">
                <i className="flaticon-home"></i> <span>Enqueries</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-enquerylist">
                {enquerylist.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Enqueries End */}

            {/* Robot FAQs Start */}
            <li
              className={`treeview ${
                isParentPageActive(Faq, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#faq">
                <i className="flaticon-home"></i> <span>FAQs</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="faq">
                {Faq.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot FAQs End */}

            {/* Robot Testimonial Start */}
            <li
              className={`treeview ${
                isParentPageActive(testimonial, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#roboTestimonial">
                <i className="flaticon-home"></i> <span>Testimonials</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="roboTestimonial">
                {testimonial.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Testimonial End */}

            {/* Robot Reviews Start */}
            <li
              className={`treeview ${
                isParentPageActive(reviews, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#review">
                <i className="flaticon-chat"></i>
                <span>Reviews</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="review">
                {reviews.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* Robot Reviews End */}
          </ul>
        </li>
        {/* Robot Manage Listing End */}
      </ul>
    </>
  );
};

export default SidebarMenu;
