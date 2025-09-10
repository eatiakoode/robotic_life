import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Contact1 from "@/components/otherPages/Contact1";
import React from "react";

export const metadata = {
  title: "Enquiry || TheBotsWorld ",
  description: "TheBotsWorld - Your Trusted Platform in Robotics Education",
};

export default function ContactPage() {
  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      <Header1 />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d112294.99411616968!2d76.96145368446672!3d28.412661102055466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390d183d8ffffffd%3A0xbbe3233b2d9e6363!2sTower%20B4%2C%20SPAZE%20ITECH%20PARK%2C%20UN%20616%2C%20Badshahpur%20Sohna%20Rd%20Hwy%2C%20Sector%2049%2C%20Gurugram%2C%20Haryana%20122018!3m2!1d28.4126859!2d77.0438551!5e0!3m2!1sen!2sin!4v1757255449578!5m2!1sen!2sin"
        width={600}
        height={450}
        style={{ border: 0, width: "100%" }}
        allowFullScreen=""
        loading="lazy"
      />
      <Contact1 />
      <Footer1 dark />
    </>
  );
}
