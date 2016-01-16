var express = require('express');
var rest = require ('restler');
var app = express();
var OAuth = require('oauth').OAuth
  , oauth = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      "a81IxgGNDWlbpxRsUUTa3RjHB",
      "fymc3BFIeLLNIMcnRvVEY1417ckr9s2Kw3ke90KZehzkmPqRA1",
      "1.0",
      "http://pnnapp.azurewebsites.net/auth/twitter/callback",
      "HMAC-SHA1"
    );


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
                
                res.sendFile(__dirname+"/resultpage.html");
});


app.get('/auth/twitter', function(req, res) {

  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    if (error) {
      console.log(error);
      res.send("Authentication Failed!");
    }
    else {
      req.session.oauth = {
        token: oauth_token,
        token_secret: oauth_token_secret
      };
      console.log(req.session.oauth);
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
    }
  });

});


app.get('/auth/twitter/callback', function(req, res, next) {

  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth_data = req.session.oauth;

    oauth.getOAuthAccessToken(
      oauth_data.token,
      oauth_data.token_secret,
      oauth_data.verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.log(error);
          res.send("Authentication Failure!");
        }
        else {
          req.session.oauth.access_token = oauth_access_token;
          req.session.oauth.access_token_secret = oauth_access_token_secret;
          console.log(results, req.session.oauth);
          res.send("Authentication Successful");
          res.redirect(''); // You might actually want to redirect!
       }
      }
    );
  }
  else {
    res.redirect('/login'); // Redirect to login page
  }

});

app.get('/api/:name', function(req, res) {
                
                
                
                var name = req.params.name;
                var requestURL = "http://www.omdbapi.com/?t="+name+"&y=&plot=shlort&r=json";
                rest.get(requestURL).on('complete', function(result){
                                console.log(result);
                                res.send(result);
                });
});


app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3010!');
})
