const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = 'stan nct';
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest : 'uploads/'});
const fs = require('fs');

mongoose.connect('mongodb+srv://blog:tDeztCazU5I7NDCP@cluster0.jlrkbsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try {
    const UserDoc = await User.create({
      username, 
      password:bcrypt.hashSync(password,salt),
    });
    res.json(UserDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
  
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  try {
    const UserDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, UserDoc.password); 
    if (passOk) {
      jwt.sign({username,id:UserDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:UserDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies)
});

app.post('/logout', (req, res) => {
  res.cookie('token','').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  try {

    console.log("post");
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
    
  } catch (error) {
    console.error('Error in /post endpoint:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }

});

app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find(({}))
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20); // Fetch all posts from the database
    res.json(posts);

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});



app.get('/post/:_id', async (req, res) => {
  const {_id} = req.params;
  const postDoc= await Post.findById(_id).populate('author',['username']);
  res.json(postDoc);
})



app.listen(4000, () => console.log('listening on port 4000'));
