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
          <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </>
      )}
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
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
