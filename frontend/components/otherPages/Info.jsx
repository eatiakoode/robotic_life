"use client";

export default function Team() {
  const aboutData = [
    {
      id: 1,
      icon: "icon-check",
      title: "Our Mission",
      description: "We aim to make robotics knowledge accessible to everyone through quality content and insights. Our mission is to bridge the gap between complex robotics technology and everyday understanding, providing comprehensive resources that empower students, researchers, and enthusiasts to explore the fascinating world of robotics.",
    },
    {
      id: 2,
      icon: "icon-star", 
      title: "Our Vision",
      description: "To be the go-to platform for discovering innovations and learning about robots worldwide. We envision a future where robotics education is democratized, where anyone can access reliable information about the latest developments in artificial intelligence, automation, and robotic systems that are shaping our world.",
    },
    {
      id: 3,
      icon: "icon-heart",
      title: "Our Values", 
      description: "We believe in curiosity, innovation, and sharing knowledge openly with our community. Our core values include transparency in information sharing, commitment to accuracy and authenticity, fostering a collaborative learning environment, and inspiring the next generation of robotics innovators through accessible education.",
    },
    {
      id: 4,
      icon: "icon-mail",
      title: "Our Commitment",
      description: "Delivering reliable and engaging educational resources for students, enthusiasts, and researchers. We are committed to maintaining the highest standards of content quality, providing up-to-date information about robotics trends, supporting educational institutions, and creating a platform that serves as a trusted resource for robotics knowledge worldwide.",
    },
  ];

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div 
              className="tf-icon-box-wrapper d-flex flex-wrap justify-content-center"
              style={{
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 15px'
              }}
            >
              {aboutData.map((item) => (
                <div 
                  key={item.id} 
                  className="tf-icon-box style-2 text-center"
                  style={{
                    flex: '1 1 45%',
                    minWidth: '400px',
                    maxWidth: '500px',
                    padding: '40px 30px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #f0f0f0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  <div className="icon-box mb-3 icon-center">
                    <span 
                      className={`icon ${item.icon}`}
                      style={{
                        fontSize: '40px',
                        color: '#333',
                        display: 'flex'
                      }}
                    />
                  </div>
                  <div className="content">
                    <h6 
                      className="fw-bold mb-4"
                      style={{
                        fontSize: '20px',
                        color: '#333',
                        lineHeight: '1.3'
                      }}
                    >
                      {item.title}
                    </h6>
                    <p 
                      className="text-secondary mb-0"
                      style={{
                        fontSize: '15px',
                        color: '#666',
                        lineHeight: '1.7',
                        margin: '0',
                        textAlign: 'left'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
