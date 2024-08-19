import React from 'react';
import './AboutUs.css';
import our from "../assets/vision.jpeg";
import roha from "../assets/rohan.jpg";


const AboutUs: React.FC = () => {
    // Function to handle FAQ toggle
    const handleFaqToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const answer = event.currentTarget.nextElementSibling as HTMLElement;
        if (answer) {
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        }
    };

    return (
        <div>
            <header className="vision">
                <div className="aboutcontainer">
                    <img src={our} alt="Our Vision" className="vision-img" />
                    <div className="vision-content">
                        <h1>Our Vision</h1>
                        <p>At Rolo Nepal, our vision is to preserve and promote the rich cultural heritage of Nepal through our exquisite tapestries and backpacks. Each product tells a story of tradition, craftsmanship, and artistry, bringing the essence of Nepalese heritage to the world.</p>
                    </div>
                </div>
            </header>

            <section className="team">
                <h2>Our Team</h2>
                <div className="container">

                    <div className="team-members">
                        <div className="member">
                            <img src={roha} alt="Rohan Das"/>
                            <h3>Rohan Das</h3>
                            <p>CEO</p>
                        </div>
                        <div className="member">
                            <img src={roha} alt="XYZ"/>
                            <h3>XYZ</h3>
                            <p>XYZ</p>
                        </div>
                        <div className="member">
                            <img src={roha} alt="XYZr"/>
                            <h3>XYZ</h3>
                            <p>XYZ</p>
                        </div>
                        <div className="member">
                            <img src={roha} alt="XYZ"/>
                            <h3>XYZ</h3>
                            <p>XYZ</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-container">

                    <div className="faq-item">
                        <button className="faq-question" onClick={handleFaqToggle}>Do you offer custom designs or
                            personalized items?
                        </button>
                        <div className="faq-answer">
                            <p>Yes, we offer custom designs and personalized items. Please contact our customer support
                                for more details.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-question" onClick={handleFaqToggle}>How do I place an order?</button>
                        <div className="faq-answer">
                            <p>You can place an order through our website by selecting the items you want and proceeding
                                to checkout.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-question" onClick={handleFaqToggle}>What payment methods do you accept?
                        </button>
                        <div className="faq-answer">
                            <p>We accept various payment methods including credit cards, PayPal, and bank transfers.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-question" onClick={handleFaqToggle}>Can I return or exchange an item?
                        </button>
                        <div className="faq-answer">
                            <p>Yes, you can return or exchange an item within 30 days of purchase. Please refer to our
                                return policy for more information.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
