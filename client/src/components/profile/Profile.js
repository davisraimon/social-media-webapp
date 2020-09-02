import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from "./ProfileGitHub";
import Card from "@material-ui/core/Card";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to profiles
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id ? (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit profile
            </Link>
          ) : (
            <></>
          )}
          <div className="profile-grid my">
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile}></ProfileAbout>
            <Card className="profile-exp p-2">
              <h2>Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    ></ProfileExperience>
                  ))}
                </>
              ) : (
                <h4>No experiences added</h4>
              )}
            </Card>
            <Card className="profile-edu p-2">
              <h2>Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    ></ProfileEducation>
                  ))}
                </>
              ) : (
                <h4>No education added</h4>
              )}
            </Card>
            {profile.githubusername && (
              <ProfileGitHub username={profile.githubusername}></ProfileGitHub>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
