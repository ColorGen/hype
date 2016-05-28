//Express setup
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')


  var bodyParser = require('body-parser')

//Basic things..

  var app = express()
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.logger('dev'))
  app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
  ))
  app.use(express.static(__dirname + '/public'))
  app.use(bodyParser.urlencoded({ extended: true }));



//Html default?

//Gettings the Username/UUID
app.post('/userName',function(req,res){
var userEntry = req.body.last_name;



//Hypixel repositories loading

  const Hypixel = require('hypixel');

  const client = new Hypixel({ key: '256be061-bb73-49da-a56d-b5981d110974' });


var userEntries = "getPlayer";


// Check if the entry is an UUID or an username

if (userEntry.length < 16) {
  var userEntries = "getPlayerByUsername";
}
else {
  var userEntries = "getPlayer";
}

    client[userEntries](userEntry, (err, player) => {
      if (err) {
        return console.info('Nope!');
      }



//Check if the player is in the database..
if (!player) {

res.redirect('http://hype.crnt.ch?e');

  return;
}


//Check if the player stats are up to date

else if (typeof player.stats.SkyWars === "undefined") {
    res.redirect('http://hype.crnt.ch?eg');

    return;
}

//Begin to recover some stats

var skyStats = {

gwins : player.stats.SkyWars.wins,
gcoins: player.stats.SkyWars.coins,
glosses : player.stats.SkyWars.losses,
};

//Kdr computation

var kdr = Math.floor((skyStats.gwins / skyStats.glosses) * 1000) / 1000

//Output jade vars


var soloWins = {

farmer : player.stats.SkyWars.wins_kit_advanced_solo_farmer,
canoner : player.stats.SkyWars.wins_kit_advanced_solo_cannoneer,
//hunter : player.stats.SkyWars.wins_kit_advanced_solo_hunter,
armorer : player.stats.SkyWars.wins_kit_advanced_solo_armorer,
//pyroman : player.stats.SkyWars.wins_kit_advanced_solo_pyro,
//enchanter : player.stats.SkyWars.wins_kit_advanced_solo_enchanter,
knight : player.stats.SkyWars.wins_kit_advanced_solo_knight,

};
var bestSoloKit = Math.max(soloWins.farmer, soloWins.canoner, soloWins.knight, soloWins.armorer);

console.log(bestSoloKit);

function searchObj( obj ){

    for( var key in obj ) {

        if( typeof obj[key] === 'object' ){
            searchObj( obj[key] );
        }

        if( obj[key] === bestSoloKit ){

            var outPut = key;
        }

    }

return outPut;
};

outPut = searchObj(soloWins);

console.log(outPut);




res.render('index2',
{ title : userEntry,
  swgKdr : kdr,
  swgWins : skyStats.gwins,
  swgLosses : skyStats.glosses,
  bestSoloKits : outPut }
)


})


});

//Server start
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
