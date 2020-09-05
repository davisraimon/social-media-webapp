import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Card from "@material-ui/core/Card";

const ProfileGitHub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <>
      <div className="profile-github">
        <h2 className=" my-1">Github Repos </h2>
        {repos === null ? (
          <Spinner></Spinner>
        ) : (
          repos.map((repo) => (
            <Card key={repo.id} className="repo p-1 my">
              <div>
                <h4>
                  <a href={repo.html_url} rel="noopener nooreferrer">
                    {repo.name}{" "}
                    <i className="fa fa-link" aria-hidden="true"></i>
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li
                    className="badge badge-primary"
                    style={{ textAlign: "left" }}
                  >
                    Stars: {repo.stargazers_count}
                  </li>
                  <li
                    className="badge badge-dark"
                    style={{ textAlign: "left" }}
                  >
                    Watchers: {repo.watchers_count}
                  </li>
                  <li
                    className="badge badge-light"
                    style={{ textAlign: "left" }}
                  >
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGitHub);
