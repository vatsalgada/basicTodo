
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

var items = ["clean", "eat"];

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
  
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric", 
        month: "long"
    };
   
    var day = today.toLocaleDateString("en-US", options);


    res.render('list', {kindOfDay: day, listOfItems: items});
});  

app.post('/', function(req, res){
    items.push(req.body.newItem);
    console.log(items);
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server started on port on 3000...")
})