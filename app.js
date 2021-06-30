
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

var items = ["clean", "eat"];
var workItems = [];

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


    res.render('list', {listTitle: day, listOfItems: items});
});  

app.post('/', function(req, res){
    
    console.log(items);
    console.log(req.body.list);

    if(req.body.list === "Work"){
        workItems.push(req.body.newItem);
        res.redirect('/work');
    } else{
        items.push(req.body.newItem);
        res.redirect("/");
    }

    
})

app.get('/work', function(req, res){
    res.render('list', {listTitle: "Work List", listOfItems: workItems} );
})

app.post('/work', function(req, res){
    workItems.push(req.body.newItem);
    res.redirect('/work');
})

app.get('/about', function(req, res){
    res.render('about');
})

app.listen(3000, function(){
    console.log("server started on port on 3000...")
})