import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Privacy Policy - Rolo Nepal</title>
            <link rel="stylesheet" href="privacypolicy.css" />
        </head>
        <body>
        <div className="privacycontainer">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date: June 20, 2023</strong></p>
            <p>Thank you for visiting Rolo Nepal. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to your personal information.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect personal information that you provide to us directly, such as when you create an account, place an order, subscribe to our newsletter, or contact us. This may include your name, email address, shipping address, phone number, and payment information.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use your personal information to process your orders, provide customer support, improve our services, and communicate with you about products, services, and promotions. We may also use your information to comply with legal obligations and protect our rights.</p>

            <h2>3. Sharing Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except to trusted third parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>

            <h2>4. Your Choices and Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also opt-out of receiving marketing communications from us. To exercise these rights, please contact us at <a href="mailto:support@rolonepal.com">support@rolonepal.com</a>.</p>

            <h2>5. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.</p>

            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@rolonepal.com">support@rolonepal.com</a>.</p>
        </div>
        </body>
        </html>
    );
};

export default PrivacyPolicy;
