////////////////////////////////////////////////////////
///////////////          SETUP         /////////////////
////////////////////////////////////////////////////////

// NPM PACKAGE SETUP
var bodyParser      = require('body-parser'),
express             = require('express'),
request             = require('request'),
app                 = express();

// APP CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));


////////////////////////////////////////////////////////
////////////////         ROUTES        /////////////////
////////////////////////////////////////////////////////

// HOME ROUTE
app.get('/', function(req, res) {
    res.render('home');
});




app.get('/show', function(req, res) {
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    
    // Following substring() contains the first two elements of startDate-->
    var startMonth = startDate.substring(0, 2);
    var startDay = startDate.substring(3, 5);
    var startYear = startDate.substring(6);
    
    var endMonth = endDate.substring(0, 2);
    var endDay = endDate.substring(3, 5);
    var endYear = endDate.substring(6);
    
    var convertedStartDate = startYear + '-' + startMonth + '-' + startDay;
    var convertedEndDate = endYear + '-' + endMonth + '-' + endDay;
    
    request('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + convertedStartDate + '&end_date=' + convertedEndDate + '&api_key=WgUOHmvbWyaPR8rGmCwD6Kii3u732VutWXa75GWb', function(error, response, body) {
        if(!error && response.statusCode == 200) { // 200 OK status code
            var parsedData = JSON.parse(body);
            res.render('show', {
                body: parsedData,
                startDate: convertedStartDate,
                endDate: convertedEndDate
            });
        } else {
            res.redirect('/home');
        }
    });
    
});

app.get('/id/:neoid', function(req, res) {
   var id = req.params.neoid;
   request('https://api.nasa.gov/neo/rest/v1/neo/' + id + '?api_key=WgUOHmvbWyaPR8rGmCwD6Kii3u732VutWXa75GWb', function(error, response, body) {
        if(!error && response.statusCode == 200) { // 200 OK status code
            var parsedData = JSON.parse(body);
            res.render('index', {
                body: parsedData,
                neoid: id
            });
        } else {
            res.redirect('/show');
        }
    });
   
});


// INDEX ROUTE
// app.get('/players', function(req, res) {
//         if(err) {
//             console.log(err);
//         } else {
//             res.render('index', {players: players});
//         }
// });

// NEW ROUTE
// app.get('/players/new', function(req, res) {
//   res.render('new'); 
// });


// CREATE ROUTE
// app.post('/players', function(req, res) {
//   // create player

//       if(err) {

//       } else {

//       }
//   });
// });


// SHOW ROUTE

// app.get('/asteroids/:id', function(req, res) {
//       if(err) {
//       } else {
//       }
//     });
// });

// EDIT ROUTE

// UPDATE ROUTE

// DESTROY ROUTE


////////////////////////////////////////////////////////
////////////////        METHODS        /////////////////
////////////////////////////////////////////////////////






////////////////////////////////////////////////////////
////////////////         SERVER        /////////////////
////////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is Running on port: ", process.env.PORT);
});


