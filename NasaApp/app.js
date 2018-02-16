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
    request('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + startDate + '&end_date=' + endDate + '&api_key=WgUOHmvbWyaPR8rGmCwD6Kii3u732VutWXa75GWb', function(error, response, body) {
        if(!error && response.statusCode == 200) { // 200 OK status code
            var parsedData = JSON.parse(body);
            console.log(parsedData['near_earth_objects']);
        
            res.render('show', {
                body: parsedData,
                startDate: startDate,
                endDate: endDate
            });
        } else {
            res.redirect('home');
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
////////////////         SERVER        /////////////////
////////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is Running on port: ", process.env.PORT);
});


