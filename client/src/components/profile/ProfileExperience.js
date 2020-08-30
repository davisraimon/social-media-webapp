import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Divider from '@material-ui/core/Divider';

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <>
    <Divider></Divider>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Position: {title}</strong>
    </p>
    <p>
      <strong>Description: {description}</strong>
    </p>
  </>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
