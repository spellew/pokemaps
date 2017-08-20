
//var Pokedex = require('pokedex-promise-v2');
//var P = new Pokedex();

var mode = 1;
var contact = true;
var x;
var y;
var battle_scene;
var cnv;
var map_image;
var player;
var player_model;
var player_backmodel;
var pokemon;
var pokemon_enemy;
var pokemon_enemy_id;
var pokemon_group = [];
var pokemon_model = [];
var kdex;
var kdex_list = [];
var url_start = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
var url_end = ".png"
var url;
var randX;
var randY;

function centerCanvas() {
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function wild_pokemon() {
	for (var i = 1; i <= 10; i++) {
		kdex = Math.ceil(random(1,151))
		kdex_list.push(kdex)
		kdex = str(kdex)
		url = url_start + kdex + url_end
		pokemon_model.push(loadImage(url))
	}
}

function pokemon_battle() {
	contact = false
	mode = 2
	player.addImage(player_backmodel)
	player.setSpeed(0,0)
	player.position.x = 100
	player.position.y = 314
	player.scale = 1.5
	pokemon_enemy_id = pokemon_enemy.getAnimationLabel()
	// P.getCharacteristicById(pokemon_enemy_id)
	if (mode === 2) {
		if (mouseIsPressed) {
    		if (mouseButton == LEFT) {
				mode = 1
				contact = true
			}
		}
		image(battle_image,0,0);
		for (var l = 0; l <= pokemon_group.length - 1; l++) {
			if (pokemon_enemy != pokemon_group[l]) {
				pokemon_group[l].visible = false
			}
		}
		pokemon_enemy.scale = 2
		pokemon_enemy.position.x = width/1.375
		pokemon_enemy.position.y = height/2.6875
		drawSprites();
	}
}

function preload() {
	map_image = loadImage("http://maps.googleapis.com/maps/api/staticmap?center=Rockefeller+Center,+10+Rockefeller+Plaza,+New+York,+NY+10020&zoom=15&scale=1&size=640x640&maptype=roadmap&key=AIzaSyDJXU9P8ieyia_jPLo26RSrj4tx7Kq1rg4&format=png&visual_refresh=true");
	player_model = loadImage("https://spellewasc.github.io/portfolio/Pokemon_groupCodeAPI/assets/player_model.png");
	player_backmodel = loadImage("https://spellewasc.github.io/portfolio/Pokemon_groupCodeAPI/assets/player_backsprite.png");
	battle_image = loadImage("https://spellewasc.github.io/portfolio/Pokemon_groupCodeAPI/assets/battle_image.png");
	wild_pokemon();
}

function setup() {
	console.log(kdex_list);
    cnv = createCanvas(640, 640);
    cnv.parent('Script');
    centerCanvas();
	image(map_image,0,0);
	player = createSprite(320,320,64,64);
	player.addImage(player_model);
	for (var j = 0; j <= pokemon_model.length - 1; j++) {
		if (j % 2 === 0) {
			randX = random(40,player.position.x-65)	
		}
		else {
			randX = random(player.position.x+65,width-40)
		}
		randY = random(100,height-100)
		pokemon = createSprite(randX,randY,64,64)
		pokemon.addImage(str(kdex_list[j]),pokemon_model[j])
		pokemon_group.push(pokemon)
	}
}

function draw() {
	if (mode === 0) {
		background(255)
		if (keyCode === ENTER) {
			mode = 1
		}
	}
	if (mode === 1) {
		image(map_image,0,0);
		for (var m = 0; m <= pokemon_group.length - 1; m++) {
			pokemon_group[m].visible = true
			}
		player.visible = true
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
		image(map_image,0,0);
		drawSprites();
		for (var k = 0; k <= pokemon_group.length - 1; k++) {
			if (contact === true) {
				pokemon_group[k].setCollider("circle",0,0,12)
				pokemon_enemy = pokemon_group[k]
				player.collide(pokemon_group[k],pokemon_battle)
			}
		}
	}
}
