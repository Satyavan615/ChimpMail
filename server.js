const express = require("express");
//const bodyParser = require("body-parser");

// there is no need of body-parser use exoress instead
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    // url https://us12 .api.mailchimp.com/3.0/
    const url = "https://us12.api.mailchimp.com/3.0/lists/cb8ad0627b";
    const options = {
        method: "POST",
        auth: "Satyavan615:725114abb23ea5a54ff0659330a66974-us12"
    }
    const jsonData = JSON.stringify(data);
  const request=  https.request(url, options, function (response) {
    if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

//Mail chimp  api key 725114abb23ea5a54ff0659330a66974-us12
// auidience id cb8ad0627b

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});