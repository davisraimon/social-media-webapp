import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <>
      <Card className="profile-top p-2 profile-top-card">
        <img className=" my-1 profile-top-logo" src={avatar} alt="" />

        <h1 className="large">{name}</h1>
        <p className="lead">
          {status} at {company && <span>at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
          {website && (
            <a href={website} rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
          )}
          {social && social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          )}
        </div>
      </Card>
    </>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
