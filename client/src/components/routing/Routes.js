import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-form/CreateProfile";
import EditProfile from "../profile-form/EditProfile";
import AddExperience from "../profile-form/AddExperience";
import AddEducation from "../profile-form/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";

const Routes = () => {
  return (
    <section id="main-section" className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/profiles" component={Profiles}></Route>
        <Route exact path="/profile/:id" component={Profile}></Route>
        <PrivateRoute
          exact
          path="/Dashboard"
          component={Dashboard}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/create-profile"
          component={CreateProfile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit-profile"
          component={EditProfile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/add-experience"
          component={AddExperience}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/add-education"
          component={AddEducation}
        ></PrivateRoute>
        <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
        <PrivateRoute exact path="/post/:id" component={Post}></PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};
export default Routes;
