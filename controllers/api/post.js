const router = require("express").Router();
const { Post, User, Comments } = require('../../models');

// gets all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [Comments, User],
    });
    if (posts.length === 0){
      return res.status(404).json({ msg: "no post in database "})
    } else {
      res.json(posts);
    }
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ message: err.message });
  }
});

//gets posts by id
router.get("/:id", async (req, res) => {
  try {
    const postID = await Post.findByPk(req.params.id, {
      include: [{ model: Comments }],
    });
    if (!postID) {
      res.status(404).json({ message: "No post with that id" });
      return;
    }
    res.status(200).json(postID);
  } catch (err) {
    res.status(500).json(err);
  }
});
//creates new blog post
router.post('/', async (req, res) => {
  try{
  const newPost = ({
    title: req.body.title,
    content: req.body.content,
  });
  const dbResponse = await Post.create(newPost);
  await dbResponse.addUser(req.session.userId);
  const formatData = await dbResponse.get({plain: true});
  res.status(200).json(formatData);

  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ msg: 'error', err: err });
  }
});

router.put("/:id", (req, res) => {
  console.log("req.body:", req.body);
  Post.update(
    {
      title: req.body.title,
      content: req.body.comment,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatePost) => {
      
      res.json(updatePost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});

//deletes blog post
router.delete('/:id',(req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    },
  })
  .then((delPost) => {
    res.json(delPost);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ msg: "error", err });
  });
});

module.exports = router;