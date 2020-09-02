import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
    company,
    skills,
  },
}) => {
  return (
    <Card className="profile card">
      <img src={avatar} alt="" className="round-img"></img>
      <div>
        <h4>{name}</h4>
        <Typography component="span" color="textSecondary" variant="h6">
          {status}
          {company && <span> at {company}</span>}
        </Typography>
        <br />
        <p></p>
        <Typography
          component="span"
          variant="body1"
          color="textSecondary"
          gutterBottom
        >
          {location && <span>{location}</span>}
        </Typography>
        <br />
        <Link
          to={`/profile/${_id}`}
          className="btn btn-light"
          style={{ marginTop: 8 }}
        >
          View profile
        </Link>
        <Link
          to={`/profile/${_id}`}
          className="btn btn-light"
          style={{ marginTop: 8 }}
        >
          <i class="fa fa-envelope" aria-hidden="true"></i> Connect
        </Link>
      </div>
      <ul>
        {skills.splice(0, 4).map((skill, index) => (
          <li key={index}>
            <i className="fas fa-check"> {skill}</i>
          </li>
        ))}
      </ul>
    </Card>
  );
};

ProfileItem.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileItem;
