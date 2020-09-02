import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <>
    <Card className="profile-about p-2">
      {bio && (
        <>
          <h3>{name.trim().split(" ")[0]}'s Bio</h3>
          <p>{bio}</p>
        </>
      )}
      <div className="line"></div>
      <h3>Skill Set</h3>
      <div className="skills">
        {skills.map((skill, index) => (
          <div className="p-1" key={index}>
            <i className="fas fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </Card>
  </>
);

ProfileAbout.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileAbout;
