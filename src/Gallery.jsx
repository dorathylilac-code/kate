import React, { useState, useEffect, useRef } from "react";
import "./Gallery.css";

// Images (uppercase .JPG), skipping kate9 and kate10
const imageFiles = [
  "kate1.JPG","kate2.JPG","kate3.JPG","kate4.JPG","kate5.JPG",
  "kate6.JPG","kate7.JPG","kate8.JPG","kate11.JPG","kate12.JPG",
  "kate13.JPG","kate14.JPG","kate15.JPG","kate16.JPG","kate17.JPG",
  "kate18.JPG","kate19.JPG"
];

export default function Gallery() {
  const images = imageFiles.map((file) => require(`./images/${file}`));
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handlePlanClick = (plan) =>
    setSelectedPlan(plan === selectedPlan ? null : plan);

  const plans = [
    { name: "Basic Plan", price: "$150 / day" },
    { name: "Premium Plan", price: "$1000 / week" },
    { name: "VIP Plan", price: "$2500 / month" },
  ];

  return (
    <div className="gallery-container">
      <div
        className="slider"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => {
          let className = "slide-img blurred";
          // Show 4 images at a time, 2 center images clear
          if (
            i === index ||
            i === (index + 1) % images.length ||
            i === (index + 2) % images.length ||
            i === (index + 3) % images.length
          ) {
            className = "slide-img center";
          }
          return <img key={i} src={img} alt={`Kate ${i + 1}`} className={className} />;
        })}
      </div>

      <div className="controls">
        <button onClick={prevSlide}>⟵ Prev</button>
        <button onClick={nextSlide}>Next ⟶</button>
      </div>

      <div className="subscribe-section">
        <h2>Subscribe to Unlock Exclusive Content</h2>
        <p>Get access to all images and videos!</p>
        <div className="plans">
          {plans.map((plan, i) => (
            <div key={i} className="plan-card" onClick={() => handlePlanClick(plan.name)}>
              <h3>{plan.name}</h3>
              <p>{plan.price}</p>
              {selectedPlan === plan.name && (
                <div className="contact-info">
                  <p>BTC: 15oSd7zCfm2My9BUCpVu7hwSP67qvHJjVU</p>
                  <p>Signal: +1 917 382 5593</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
