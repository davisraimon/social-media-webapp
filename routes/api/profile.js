const express = require("express");
const requrest = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { request } = require("express");
const axios = require("axios");

//@route  GET api/profile/me
//@desc   Get the Profile of current User
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "No profile found for this user" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});

//@route  POST api/profile
//@desc   Create or Update Profile of Current User
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is Required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const profileFields = {};
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    //Build Profile Object

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //Build Social Array
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.youtube = instagram;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update the Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        //Register the Profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
      }
    } catch (err) {
      res.status(500).send("Application Server Error");
    }
  }
);

//@route  GET api/profile
//@desc   Get all Profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});

//@route  GET api/profile/user/:user_id
//@desc   Get Profile by user_id
//@access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "No Profile Found for this ID" });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      res.status(400).json({ msg: "No Profile Found for this ID" });
    }
    res.status(500).send("Application Server Error");
  }
});

//@route  DELETE api/profile
//@desc   Delete Profile, User & Posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Deleted" });
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});

//@route  PUT api/profile/experience
//@desc   Add profile experience
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = { title, company, location, from, to, current, description };
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).send("Application Server Error");
    }
  }
);
//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete profile experience
//@access Private
router.all("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});

//@route  PUT api/profile/education
//@desc   Add profile education
//@access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(500).send("Application Server Error");
    }
  }
);
//@route  DELETE api/profile/education/:exp_id
//@desc   Delete profile education
//@access Private
router.all("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send("Application Server Error");
  }
});

//@route  GET api/profile/github/:username
//@desc   Get github repos from github
//@access Public
router.get("/github/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`
    );
    if (!response) {
      res.status(401).send({ msg: "No Github Profile found" });
    }
    console.log(response);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("No Github Profile found");
  }
});
module.exports = router;
