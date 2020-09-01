import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles }, loading }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h1 className="large-text-primary">Developers</h1>
          <p className="lead text-cursive">
            <i className="fa fa-handshake-o" aria-hidden="true"></i> Browse and
            connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((item) => (
                <ProfileItem key={item._id} profile={item}></ProfileItem>
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
