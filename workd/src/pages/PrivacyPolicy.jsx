import React from 'react';
import { FaShieldAlt, FaLock, FaEye, FaDatabase, FaUserShield, FaEnvelope } from 'react-icons/fa';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      {/* Hero Section */}
      <section className="privacy-policy-hero">
        <div className="privacy-policy-hero-content">
          <h1 className="privacy-policy-title">Privacy Policy</h1>
          <p className="privacy-policy-subtitle">Last Updated: January 2025</p>
          <p className="privacy-policy-description">
            Welcome to WorkD. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <h2 className="privacy-policy-section-title">Table of Contents</h2>
          <ul className="privacy-policy-toc">
            <li><a href="#section1">1. Information We Collect</a></li>
            <li><a href="#section2">2. How We Use Your Information</a></li>
            <li><a href="#section3">3. Data Security</a></li>
            <li><a href="#section4">4. Third-Party Services</a></li>
            <li><a href="#section5">5. Your Rights</a></li>
            <li><a href="#section6">6. Data Retention</a></li>
            <li><a href="#section7">7. Children's Privacy</a></li>
            <li><a href="#section8">8. Changes to This Policy</a></li>
            <li><a href="#section9">9. Contact Us</a></li>
          </ul>
        </div>
      </section>

      {/* Section 1 */}
      <section id="section1" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaDatabase className="privacy-policy-icon" />
            <h2>1. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and profile details</li>
              <li><strong>Account Information:</strong> Username, password, and authentication data</li>
              <li><strong>Payment Information:</strong> Payment method details (processed securely through third parties)</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and time spent on the platform</li>
              <li><strong>Files & Documents:</strong> Job files, proposals, and communication records</li>
              <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section2" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaEye className="privacy-policy-icon" />
            <h2>2. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To process payments and transactions</li>
              <li>To communicate with you about your account and jobs</li>
              <li>To improve our platform and user experience</li>
              <li>To prevent fraud and ensure platform security</li>
              <li>To comply with legal obligations</li>
              <li>To send important updates and notifications</li>
              <li>To personalize your experience on the platform</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="section3" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaLock className="privacy-policy-icon" />
            <h2>3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure servers with restricted access</li>
              <li>Regular security audits and updates</li>
              <li>Two-factor authentication for account protection</li>
              <li>Compliance with data protection regulations</li>
              <li>Secure payment processing through trusted third parties</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section id="section4" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaShieldAlt className="privacy-policy-icon" />
            <h2>4. Third-Party Services</h2>
            <p>
              We may use third-party services to operate our platform:
            </p>
            <ul>
              <li><strong>Payment Processors:</strong> Razorpay, Stripe, or other payment gateways</li>
              <li><strong>Email Services:</strong> For sending notifications and updates</li>
              <li><strong>Cloud Storage:</strong> For storing files and documents</li>
              <li><strong>Analytics:</strong> To understand user behavior and improve services</li>
            </ul>
            <p>
              These third parties have their own privacy policies. We recommend reviewing them before using their services.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="section5" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaUserShield className="privacy-policy-icon" />
            <h2>5. Your Rights</h2>
            <p>You have the following rights regarding your data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Export:</strong> Download your data in a portable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information below.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section id="section6" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaDatabase className="privacy-policy-icon" />
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary:
            </p>
            <ul>
              <li><strong>Active Accounts:</strong> While your account is active</li>
              <li><strong>Completed Jobs:</strong> For 2 years after job completion</li>
              <li><strong>Payment Records:</strong> For 7 years for tax and legal compliance</li>
              <li><strong>Deleted Accounts:</strong> 30 days before permanent deletion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section id="section7" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaUserShield className="privacy-policy-icon" />
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have collected data from a child, we will delete it immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8 */}
      <section id="section8" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaShieldAlt className="privacy-policy-icon" />
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul>
              <li>Posting the new policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification for significant changes</li>
            </ul>
            <p>
              Your continued use of the platform after changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </section>

      {/* Section 9 */}
      <section id="section9" className="privacy-policy-section">
        <div className="privacy-policy-container-inner">
          <div className="privacy-policy-card">
            <FaEnvelope className="privacy-policy-icon" />
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@wod.com</li>
              <li><strong>Phone:</strong> +91 87805 23694</li>
              <li><strong>Address:</strong> Pal, Surat, India</li>
              <li><strong>Response Time:</strong> Within 7 business days</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="privacy-policy-footer">
        <p>&copy; 2026 WOD. All rights reserved.</p>
        <p>By using our services, you agree to this Privacy Policy.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;