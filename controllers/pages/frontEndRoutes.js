const router = require("express").Router();
const { Post, User } = require("../../models");


router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/");
  }

  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    Post.findAll({
      include: [User],
    }).then((postData) => {
      const hbsData = postData.map((post) => post.get({ plain: true }));
      console.log(hbsData);
      res.render("homepage", {
        allPosts: hbsData,
        logged_in: req.session.logged_in,
      });

    });
  } else {
    someObj = {};
    res.render("login");
  }
});

router.get("/sign-up", async (req, res) => {
  try {
    res.render("sign-up");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error", err: err });
  }
});

router.get("/createPost", async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render("create-post", { logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "error", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

//gets posts
router.get("/posts", async (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render("posts", { logged_in: req.session.logged_in });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "error", err: err });
    }
  } else {
    res.redirect("/login");
  }
});

// gets post by id
router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [User],
  }).then((dbResponse) => {
    const taskData = dbResponse.get({ plain: true });
    console.log("taskData:", taskData);
    res.render("edit-post", taskData);
  });
});

module.exports = router;



