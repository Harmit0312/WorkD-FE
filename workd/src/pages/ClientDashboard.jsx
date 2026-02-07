import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaBriefcase, FaUser, FaHome } from 'react-icons/fa';
import ClientStats from '../components/ClientStats';
import ClientPostJobs from '../components/ClientPostJobs';
import ClientUpdateJob from '../components/ClientUpdateJob';
import ClientProposals from '../components/ClientProposals';
import ClientActiveJobs from '../components/ClientActiveJobs';
import ClientProfile from '../components/ClientProfile';
import './ClientDashboard.css';
import logo from '../assets/WOD-Logo.png';

const ClientDashboard = () => {

  const [DefaultComponent, setDefaultComponent] = useState(true);
  const [showPostJobs, setShowPostJobs] = useState(false);
  const [showProposals, setShowProposals] = useState(false);
  const [showActiveJobs, setShowActiveJobs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUpdateJob, setShowUpdateJob] = useState(false);

  const handleButtonClick = (temp,temp1,temp2,temp3,temp4,temp5) => {
    temp(true);
    temp1(false);
    temp2(false);
    temp3(false);
    temp4(false);
    temp5(false);
  }

  return (
    <div className="client-container">
      <nav className="client-navbar">
        <img src={logo} alt="WOD Logo" className="client-logo" />
        <div className="client-nav-links">
          <Link to="" className="client-nav-link" onClick={() => handleButtonClick(setDefaultComponent, setShowPostJobs, setShowProposals, setShowActiveJobs, setShowProfile, setShowUpdateJob)}>
            <FaHome style={{ marginRight: '8px' }} />
            Home
          </Link>
          <Link to="" className="client-nav-link" onClick={() => handleButtonClick(setShowPostJobs, setDefaultComponent, setShowProposals, setShowActiveJobs, setShowProfile, setShowUpdateJob)}>
            <FaPlus style={{ marginRight: '8px' }} />
            Post Job
          </Link>
          <Link to="" className="client-nav-link" onClick={() => handleButtonClick(setShowProposals, setDefaultComponent, setShowPostJobs, setShowActiveJobs, setShowProfile, setShowUpdateJob)}>
            <FaEye style={{ marginRight: '8px' }} />
            Proposals
          </Link>
          <Link to="" className="client-nav-link" onClick={() => handleButtonClick(setShowActiveJobs, setShowPostJobs, setShowProposals, setDefaultComponent, setShowProfile, setShowUpdateJob)}>
            <FaBriefcase style={{ marginRight: '8px' }} />
            Active Jobs
          </Link>
          <Link to="" className="client-nav-link" onClick={() => handleButtonClick(setShowUpdateJob, setShowPostJobs, setShowProposals, setShowActiveJobs, setShowProfile, setDefaultComponent)}>
            <FaBriefcase style={{ marginRight: '8px' }} />
            Update Job
          </Link>
          <Link to="" className="client-nav-link" onClick={() => handleButtonClick(setShowProfile, setShowPostJobs, setShowProposals, setShowActiveJobs, setShowUpdateJob, setDefaultComponent)}>
            <FaUser style={{ marginRight: '8px' }} />
            Profile
          </Link>
        </div>
      </nav>
      
      {DefaultComponent && <ClientStats />}
      {showPostJobs && <ClientPostJobs />}
      {showProposals && <ClientProposals />}
      {showActiveJobs && <ClientActiveJobs />}
      {showProfile && <ClientProfile />}
      {showUpdateJob && <ClientUpdateJob />}

      <footer className="client-footer">
        <p>&copy; 2026 WOD. All rights reserved. | <a href="/privacy" className="client-footer-link">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default ClientDashboard;