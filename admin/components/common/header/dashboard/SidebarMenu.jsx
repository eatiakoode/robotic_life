"use client";

import Link from "next/link";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();

  const myRobots = [
    { id: 1, name: "Add Robot", route: "/cmswegrow/create-listing" },
    { id: 2, name: "Robot List", route: "/cmswegrow/my-robot" },
  ];
  const RoboCategory = [
    { id: 1, name: "Add Category", route: "/cmswegrow/add-category" },
    { id: 2, name: "Category List", route: "/cmswegrow/my-category" },
  ];
  const MasterData = [
    { id: 1, name: "Add Country", route: "/cmswegrow/add-country" },
    { id: 2, name: "Country List", route: "/cmswegrow/my-country" },
    { id: 3, name: "Add Power Source", route: "/cmswegrow/add-powersource" },
    { id: 4, name: "Power Source List", route: "/cmswegrow/my-powersource" },
    { id: 5, name: "Add Color", route: "/cmswegrow/add-color" },
    { id: 6, name: "Color List", route: "/cmswegrow/my-color" },
    { id: 7, name: "Add Material", route: "/cmswegrow/add-material" },
    { id: 8, name: "Material List", route: "/cmswegrow/my-material" },
    {
      id: 9,
      name: "Add Navigation Type",
      route: "/cmswegrow/add-navigationtype",
    },
    {
      id: 10,
      name: "Navigation Type List",
      route: "/cmswegrow/my-navigationtype",
    },
    { id: 11, name: "Add Sensor", route: "/cmswegrow/add-sensor" },
    { id: 12, name: "Sensor List", route: "/cmswegrow/my-sensor" },
    {
      id: 13,
      name: "Add Primary Function",
      route: "/cmswegrow/add-primaryfunction",
    },
    {
      id: 14,
      name: "Primary Function List",
      route: "/cmswegrow/my-primaryfunction",
    },
    {
      id: 15,
      name: "Add AI Software",
      route: "/cmswegrow/add-aisoftware",
    },
    {
      id: 16,
      name: "AI Software List",
      route: "/cmswegrow/my-aisoftware",
    },
    {
      id: 17,
      name: "Add Operating Environment",
      route: "/cmswegrow/add-operatingenvironment",
    },
    {
      id: 18,
      name: "Operating Environment List",
      route: "/cmswegrow/my-operatingenvironment",
    },
    {
      id: 19,
      name: "Add Terrain Capability",
      route: "/cmswegrow/add-terraincapability",
    },
    {
      id: 20,
      name: "Terrain Capability List",
      route: "/cmswegrow/my-terraincapability",
    },
    {
      id: 21,
      name: "Add Autonomy Level",
      route: "/cmswegrow/add-autonomylevel",
    },
    {
      id: 22,
      name: "Autonomy Level List",
      route: "/cmswegrow/my-autonomylevel",
    },
    {
      id: 23,
      name: "Add Communication Method",
      route: "/cmswegrow/add-communicationmethod",
    },
    {
      id: 24,
      name: "Communication Method List",
      route: "/cmswegrow/my-communicationmethod",
    },
    { id: 25, name: "Add Payload Type", route: "/cmswegrow/add-payloadtype" },
    { id: 26, name: "Payload Type List", route: "/cmswegrow/my-payloadtype" },
    // { id: 14, name: "Add Payload Capacity", route: "/cmswegrow/add-payloadcapacity" },
  ];

  const RoboManufacturer = [
    { id: 1, name: "Add Manufacturer", route: "/cmswegrow/add-manufacturer" },
    { id: 2, name: "Manufacturer List", route: "/cmswegrow/my-manufacturer" },
  ];

  const Blog = [
    { id: 1, name: "Add Blog category", route: "/cmswegrow/add-blogcategory" },
    { id: 2, name: "Blog category List", route: "/cmswegrow/my-blogcategory" },
    { id: 3, name: "Add Blog", route: "/cmswegrow/add-blog" },
    { id: 4, name: "Blog List", route: "/cmswegrow/my-blog" },
  ];

  // const myTestimonial = [
  //   { id: 1, name: "Add Testimonial", route: "/cmswegrow/add-testimonial" },
  //   { id: 2, name: "Testimonial List", route: "/cmswegrow/my-testimonial" }
  // ];

  const Faq = [
    { id: 1, name: "Add FAQ", route: "/cmswegrow/add-faq" },
    { id: 2, name: "FAQ List", route: "/cmswegrow/my-faq" },
  ];

  const reviews = [
    { id: 1, name: "My Reviews", route: "/cmswegrow/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/cmswegrow/my-review" },
  ];

  const enquerylist = [
    { id: 1, name: "My enquery list", route: "/cmswegrow/my-enquiry" },
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
          <Link href="/cmswegrow/my-dashboard">
            <Image
              width={170}
              height={65}
              src="/assets/images/robotic_logo1.svg"
              // src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/robotic_logo1.svg`}
              alt="logo.svg"
            />
            {/* <span>WeGrow</span> */}
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          {/* <span>Main</span> */}
          <ul>
            <li
              className={`treeview ${isSinglePageActive("/my-dashboard", pathname) ? "active" : ""
                }`}
            >
              <Link href="/cmswegrow/my-dashboard">
                <i className="flaticon-layers"></i>
                <span> Dashboard</span>
              </Link>
            </li>
            {/* <li
              className={`treeview ${
                isSinglePageActive("/create-listing", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-listing">
                <i className="flaticon-plus"></i>
                <span> Create Listing</span>
              </Link>
            </li> */}
            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-message", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-message">
                <i className="flaticon-envelope"></i>
                <span> Message</span>
              </Link>
            </li> */}
          </ul>
        </li>
        {/* End Main */}

        {/* Robot Robot Manage Listing Start */}
        <li className="title">
          <span>Manage Listings</span>
          <ul>
            {/* Robot Master Data Start */}
            <li
              className={`treeview ${isParentPageActive(MasterData, pathname) ? "active" : ""
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
              className={`treeview ${isParentPageActive(RoboManufacturer, pathname) ? "active" : ""
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
              className={`treeview ${isParentPageActive(RoboCategory, pathname) ? "active" : ""
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
              className={`treeview ${isParentPageActive(myRobots, pathname) ? "active" : ""
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

            {/* Robot Blog Start */}
            <li
              className={`treeview ${isParentPageActive(Blog, pathname) ? "active" : ""
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
              className={`treeview ${isParentPageActive(enquerylist, pathname) ? "active" : ""
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
              className={`treeview ${isParentPageActive(Faq, pathname) ? "active" : ""
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

            {/* Robot Testimonials Start */}
            {/* <li
              className={`treeview ${isParentPageActive(myTestimonial, pathname) ? "active" : ""
                }`}
            >
              <a data-bs-toggle="collapse" href="#my-Testimonial">
                <i className="flaticon-home"></i> <span>Testimonials</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-Testimonial">
                {myTestimonial.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* Robot Testimonials End */}

            {/* Robot Reviews Start */}
            <li
              className={`treeview ${isParentPageActive(reviews, pathname) ? "active" : ""
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
