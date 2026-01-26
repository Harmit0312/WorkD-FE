import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFileAlt, FaHandshake, FaUser, FaHome } from 'react-icons/fa';
import FreelancerStats from '../components/FreelancerStats';
import FreelancerFindJobs from '../components/FreelancerFindJobs';
import FreelancerMyProposals from '../components/FreelancerMyProposals';
import FreelancerActiveJobs from '../components/FreelancerActiveJobs';
import FreelancerProfile from '../components/FreelancerProfile';
import './FreelancerDashboard.css';
import logo from '../assets/WOD-Logo.png';

const FreelancerDashboard = () => {

  const [DefaultComponent, setDefaultComponent] = useState(true);
  const [showFindJobs, setShowFindJobs] = useState(false);
  const [showMyProposals, setShowMyProposals] = useState(false);
  const [showActiveJobs, setShowActiveJobs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleButtonClick = (temp,temp1,temp2,temp3,temp4) => {
    temp(true);
    temp1(false);
    temp2(false);
    temp3(false);
    temp4(false);
  }

  return (
    <div className="freelancer-container">
      <nav className="freelancer-navbar">
        <img src={logo} alt="WOD Logo" className="freelancer-logo" />
        <div className="freelancer-nav-links">
          <Link to="" className="freelancer-nav-link" onClick={() => handleButtonClick(setDefaultComponent, setShowFindJobs, setShowMyProposals, setShowActiveJobs, setShowProfile)}>
            <FaHome style={{ marginRight: '8px' }} />
            Home
          </Link>
          <Link to="" className="freelancer-nav-link" onClick={() => handleButtonClick(setShowFindJobs, setDefaultComponent, setShowMyProposals, setShowActiveJobs, setShowProfile)}>
            <FaSearch style={{ marginRight: '8px' }} />
            Find Jobs
          </Link>
          <Link to="" className="freelancer-nav-link" onClick={() => handleButtonClick(setShowMyProposals, setShowFindJobs, setDefaultComponent, setShowActiveJobs, setShowProfile)}>
            <FaFileAlt style={{ marginRight: '8px' }} />
            My Proposals
          </Link>
          <Link to="" className="freelancer-nav-link" onClick={() => handleButtonClick(setShowActiveJobs, setShowFindJobs, setShowMyProposals, setDefaultComponent, setShowProfile)}>
            <FaHandshake style={{ marginRight: '8px' }} />
            Active Contracts
          </Link>
          <Link to="" className="freelancer-nav-link" onClick={() => handleButtonClick(setShowProfile, setShowFindJobs, setShowMyProposals, setShowActiveJobs, setDefaultComponent)}>
            <FaUser style={{ marginRight: '8px' }} />
            Profile
          </Link>
        </div>
      </nav>

      {DefaultComponent && <FreelancerStats />}
      {showFindJobs && <FreelancerFindJobs />}
      {showMyProposals && <FreelancerMyProposals />}
      {showActiveJobs && <FreelancerActiveJobs />}
      {showProfile && <FreelancerProfile />}
      
      <footer className="freelancer-footer">
        <p>&copy; 2026 WOD. All rights reserved. | <a href="/privacy" className="freelancer-footer-link">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default FreelancerDashboard;