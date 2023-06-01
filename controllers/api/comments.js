const router = require("express").Router();
const { Post, User, Comments } = require('../../models');


// find all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Comments, Post],
    });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "no users" });
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = await Project.findByPk(req.params.id, {
      include: [{ model: Task }],
    });
    if (!userId) {
      res.status(404).json({ message: "No users with that id" });
      return;
    }
    res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new comment
router.post("/", async (req, res) => {
  try {
    const User = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const dbResponse = await User.create(newUser);
    await dbResponse.addUser(req.session.user_id);
    const formatData = await dbResponse.get({ plain: true });
    res.status(200).json(formatData);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.put("/:id", (req, res) => {
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//deletes 
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => res.json(err));
});


module.exports = router;