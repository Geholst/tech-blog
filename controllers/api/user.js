const router = require("express").Router();
const { User } = require("../../models");

// Gets all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
    });
    if (users.length===0){
      return res.status(404).json({ msg: 'no users'});
    }
    res.json(users);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific user
router.get('/:id', async (req, res) => {
  try {
    const userId = await User.findByPk(req.params.id);
    if (!userId) {
      return res.status(404).json({ message: 'no user' });
    }
    res.json(userId);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    const dbResponse = await User.create(newUser);
    if (req.body.postId){
      await dbResponse.addPost(req.body.postId);
    }
    req.session.user_id = dbResponse.dataValues.id;
    req.session.logged_in = true;
    return res.status(200).json(dbResponse);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error", err: err });
  }
});


// updates user
router.put("/:id", (req, res) => {
  User.update(
    {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password, 
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

// Deletes user
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

//logs in
router.post("/login", async (req, res) => {
  console.log("req.body:", req.body);
  try {
    const userData = await User.findOne({ where: { userName: req.body.email } });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "wrong email" });
    }

    const passwordCheck = await userData.checkPassword(req.body.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ message: "wrong password" });
    }
    req.session.logged_in = true;
    req.session.user_id = userData.id;
    return res.render("homepage");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error", err: err });
  }
});

// logs out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;