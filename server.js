const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //absolute directory
app.use((req, res, next) => {  //register some middleware
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }

  });
  next();
});
app.use((req,res) => {
  res.render('maintenance.hbs');
})
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});
//set up http route handler
//For http get Request handler.  When user request root of app
app.get('/',(req,res) => {
  //res.send('<h1>Hello Express!</h1>');
  //send json object
  // res.send({
  //   name: 'CozmicFlo',
  //   likes: [
  //     'Biking',
  //     'Animals',
  //     'Felting',
  //     'Traveling'
  //   ],
  //   welcomeMessage: 'Welcome to my Website!'
  // });
  res.render('home.hbs',{
    siteName: 'CozmicFlo',
    likes: [
      ' Biking',
      ' Animals',
      ' Felting',
      ' Traveling'
    ],
    pageTitle: 'CozmicFlo Page',
    welcomeMessage: 'Welcome to my Website!',
  });

});

app.get('/about',(req,res)=> {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });

})
//Route handler when a request fails
app.get('/bad', (req,res) => {
  res.send({
    errorMessage:'Unable to handle Request!'
  })
})
//Bind the application to a port
app.listen(3000,() => {
  console.log('Server is up and running on port 3000...');
});
