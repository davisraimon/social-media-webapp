import React from "react";
import { Link } from "react-router-dom";
import { deleteAccount } from "../../actions/profile";
import { connect } from "react-redux";

const DashboardActions = ({ deleteAccount }) => {
  return (
    <>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap"></i> Add Education
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteAccount();
          }}
        >
          <i className="fas fa-user"></i> Delete Account
        </button>
      </div>
    </>
  );
};
export default connect(null, { deleteAccount })(DashboardActions);
