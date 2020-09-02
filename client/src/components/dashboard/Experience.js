import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((item) => (
    <tr key={item._id}>
      <td>{item.company}</td>
      <td className="hide-sm">{item.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{item.from}</Moment>-
        {item.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{item.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteExperience(item._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my">Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="width-100">Company</th>
            <th className="hide-sm width-200">Title</th>
            <th className="hide-sm width-200">Years</th>
            <th className="width-100"/>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
