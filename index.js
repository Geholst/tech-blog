const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'process.env.SESSION_SECRET',
    cookie: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess))


const allRoutes = require('./controllers');
app.use(allRoutes)
const User = require('./models/User');
const Comments = require('./models/Comments');

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening to port ${PORT} `);
    });
});
