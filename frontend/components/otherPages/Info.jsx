"use client";

import Image from "next/image";

export default function Team() {
  const aboutData = [
    {
      id: 1,
      icon: "icon-checkCircle",
      title: "Our Mission",
      description: "We aim to make robotics knowledge accessible to everyone through quality content and insights. Our mission is to bridge the gap between complex robotics technology and everyday understanding, providing comprehensive resources that empower students, researchers, and enthusiasts to explore the fascinating world of robotics.",
    },
    {
      id: 2,
      icon: "icon-eye", 
      title: "Our Vision",
      description: "To be the go-to platform for discovering innovations and learning about robots worldwide. We envision a future where robotics education is democratized, where anyone can access reliable information about the latest developments in artificial intelligence, automation, and robotic systems that are shaping our world.",
    },
    {
      id: 3,
      icon: "icon-heart",
      title: "Our Values", 
      description: "We believe in curiosity, innovation, and sharing knowledge openly with our community. Our core values include transparency in information sharing, commitment to accuracy and authenticity, fostering a collaborative learning environment, and inspiring the next generation of robotics innovators through accessible education.",
    },
  ];

  return (
    <>
      <style jsx>{`
        .about-section {
          background: #fff;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 2;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #6c757d;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 40px;
          position: relative;
        }

        .feature-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 20px;
          top: 60px;
          bottom: -40px;
          width: 2px;
          background: linear-gradient(to bottom, #dee2e6, transparent);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
          border: 2px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .feature-description {
          font-size: 1rem;
          color: #6c757d;
          line-height: 1.7;
          text-align: justify;
          text-justify: inter-word;
          margin: 0;
        }

        .image-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(108, 117, 125, 0.1) 0%, transparent 50%);
          z-index: 1;
        }


        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .section-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
      
      <section className="about-section">
      <div className="container">
          {/* Header Section */}
          <div className="section-header">
            <h2 className="section-title">Empowering Learning Through Robotics Education</h2>
            <p className="section-subtitle">
              With TheBotsWorld, you can explore the latest and most comprehensive knowledge about robots that are currently functional in the real world. We showcase their actual capabilities, specifications, and applications to provide you with accurate, up-to-date information about how these robots work and what they can do in various industries and environments.
            </p>
          </div>

          {/* Main Content */}
          <div className="content-wrapper">
            <div className="row align-items-center">
              {/* Left Column - Features */}
              <div className="col-lg-6">
                <div className="features-list">
                  {aboutData.map((item, index) => (
                    <div key={item.id} className="feature-item">
                      <div className="feature-icon">
                    <span 
                      className={`icon ${item.icon}`}
                      style={{
                            fontSize: '20px',
                            color: '#6c757d',
                        display: 'flex'
                      }}
                    />
                  </div>
                      <div className="feature-content">
                        <h4 className="feature-title">{item.title}</h4>
                        <p className="feature-description">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="col-lg-6">
                <div className="image-container">
                  <Image
                    src="/images/banner/about-us.png"
                    alt="Robotics Innovation and Technology"
                    width={600}
                    height={500}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
