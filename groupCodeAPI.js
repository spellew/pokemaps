
var player;
var loadimg;
var url = "http://maps.googleapis.com/maps/api/staticmap?center=Rockefeller+Center,+10+Rockefeller+Plaza,+New+York,+NY+10020&zoom=15&scale=1&size=640x640&maptype=roadmap&key=AIzaSyDJXU9P8ieyia_jPLo26RSrj4tx7Kq1rg4&format=png&visual_refresh=true";
var markerList = ["&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/025-pikachu-icon.png%7Cshadow:true%7C", "&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/133-eevee-icon.png%7Cshadow:true%7C", "&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/056-mankey-icon.png%7Cshadow:true%7C", "&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/058-growlithe-icon.png%7Cshadow:true%7C", "&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/016-pidgey-icon.png%7Cshadow:true%7C","&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/063-abra-icon.png%7Cshadow:true%7C","&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/060-poliwag-icon.png%7Cshadow:true%7C","&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/043-oddish-icon.png%7Cshadow:true%7C","&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/041-zubat-icon.png%7Cshadow:true%7C","&markers=icon:http://megaicons.net/static/img/icons_sizes/388/1147/64/043-oddish-icon.png%7Cshadow:true%7C"];
var pikas = ["100 W 53rd St. NY","1 W 57th St. NY", "132 W 39th St. NY", "50 E 53nd St. NY", "2 W 45th St. NY"];//,"1st Ave Tunnel NY", "275 E 57th St. NY","32 W 48th St. NY", "500 7th Ave. NY"];
var pikasList = [];
var frame1 = "https://spellewasc.github.io/portfolio/Pokemon_groupCodeAPI/assets/player_model.gif";
var direction = 90;
var mouse = false;
var cnv;
var pokeID;
var pokeimg;
var pokemon;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

for (var i = 0; i < 7; i ++) { // pikas.length; i ++) {
	
	var pika = encodeURI(pikas[i]);
	var markerStart = markerList[Math.floor(Math.random()*markerList.length)];
	console.log(markerStart);
	url = url + markerStart + pika;
}

function preload() {

	var pokelist = [];
	var pokeimgs = [];

	canvas = loadImage(url);
	player_model = loadImage(frame1);

	/*
	for (var i = 0; i <= 10; ++i) {
		pokeID = Math.floor(Math.random() * (151 - 1 + 1) + 1);
		pokelist.push(pokeID);
		var base = "http://pokeapi.co/media/sprites/pokemon/";
		var png = ".png";
		pokeimg = base + pokelist[i] + png;
		loadImage(pokeimg)
		console.log(pokeimg)
	}	
	*/
}

function setup() {

    cnv = createCanvas(620, 620);
    centerCanvas();
	image(canvas,0,0);
	player = createSprite(320,320,64,64);
	player.addImage(player_model);
	cnv.parent('Script');
	/*
	for (var i = 0; i <= 10; ++i) {
		pokemon[i] = createSprite(Math.random() * 640, Math.random() * 640, 1, 1)
		player.addImage(pokeimg)
	}
	*/
}

function draw() {
	
	if (keyIsDown(RIGHT_ARROW)) {
		player.setSpeed(1.5,0);
	}
	else if (keyIsDown(DOWN_ARROW)) {
		player.setSpeed(1.5,90);
	}
	else if (keyIsDown(LEFT_ARROW)) {
		player.setSpeed(1.5,180);
	}
	else if (keyIsDown(UP_ARROW)) {
		player.setSpeed(1.5,270);
	}
	else {
		player.setSpeed(0,0)
	}
	image(canvas,0,0);
	drawSprites();
}
