import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGitHub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    console.log("one");
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <>
      <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos </h2>
        {repos === null ? (
          <Spinner></Spinner>
        ) : (
          repos.map((repo) => (
            <div key={repo._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href={repo.html_url} rel="noopener nooreferrer">
                    {repo.name}
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
            </div>
          ))
        )}
      </div>
    </>
  );
};

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired,
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGitHub);
