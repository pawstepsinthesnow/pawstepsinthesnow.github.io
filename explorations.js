var rolldata = {
	rolltype: "explo",
	world: nskanetis,
	yvanon: false,
	qr: 0,
	seasonmain: false,
	seasoncompanion: false,
	seasonnpc: false,
	streetwise: false,
	minboost: false,
	deepearth: false,
	cider: false,
	beans: "none",
	chasmjump: "none",
	trophy: false
};

function qhigh(q, boost) {
	var first;
	if (boost == true) {
		first = 5;
	} else {
		first = rng(1,5);
	}
	var rolls = [first]
	for (i = 0; i < q; i++) {
		if (boost == true) {
			var a = 5;
		} else {
			var a = rng(0,5);
		}
		rolls.push(a);
	}
	var total = 0
	for(i = 0; i < rolls.length; i++) {
		total = total + rolls[i];
	}
	return total;
}

function qlow(q, boost) {
	var first = 1;
	var rolls = [first]
	for (i = 0; i < q; i++) {
		if (boost == true) {
			var a = 1;
		} else {
			var a = rng(0,1);
		}
		rolls.push(a);
	}
	var total = 0
	for(i = 0; i < rolls.length; i++) {
		total = total + rolls[i];
	}
	return total;
}	

function rng(min, max) {
	return Math.floor((Math.random() * ((max + 1)-min)) + min);
}
function setUp(mode) {
	rolldata.rolltype = document.getElementById("type").value;
	var world = document.getElementById("world").value;
	switch(world) {
		case ("nskanetis"):
			rolldata.world = nskanetis;
			break;
		case ("sxriix"): 
			rolldata.world = sxriix;
			break;
		case ("earth"):
			rolldata.world = earth;
			break;
		case ("chasm"):
			rolldata.world = chasm;
			break;
		case ("livestock"):
			rolldata.world = livestock;
			break;
		case ("land"):
			rolldata.world = land;
			break;
		case ("sea"):
			rolldata.world = sea;
			break;
		case ("plant"):
			rolldata.world = plant;
			break;
		case ("ungulate"):
			rolldata.world = ungulate;
			break;
		case ("mine"):
			rolldata.world = mining;
			break;
		case ("fightclub"):
			rolldata.world = combat;
			break;
		default:
			rolldata.world = nskanetis;
	}
	var speed = parseInt(document.getElementById("spd").value);
	var special = parseInt(document.getElementById("spc").value);
	var attack = parseInt(document.getElementById("atk").value);
	var defense = parseInt(document.getElementById("def").value);
	
	if (document.getElementById("raven").checked == true) {
		special += 50;
		if(special > 400) {
			special = 400;
		}
	}
	if (document.getElementById("kellas").checked == true) {
		attack += 50;
		if(attack > 400) {
			attack = 400;
		}
	}
	if (document.getElementById("tooth").checked == true) {
		attack += 50;
		if(attack > 400) {
			attack = 400;
		}
		if (rolldata.rolltype == "hunt") {
			rolldata.minboost = true;
		}
	}
	if (document.getElementById("potpourri").checked == true) {
		defense += 50;
		if(defense > 400) {
			defense = 400;
		}
	}
	if(rolldata.rolltype == "explo") {
		rolldata.qr = Math.floor(speed / 50) + Math.floor(special / 50);
	} else if (rolldata.rolltype == "hunt") {
		rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
	} else if (rolldata.rolltype == "mining") {
		rolldata.qr = Math.floor(defense / 50) + Math.floor(speed / 50);
	} else if (rolldata.rolltype == "combat") {
		rolldata.qr = Math.floor(attack / 50) + Math.floor(special / 50);
	}
	var seasonal = document.getElementById("nom").elements.namedItem("seasonal").value;
	//man that one's a mouthful
	rolldata.seasonmain = false;
	rolldata.seasoncompanion = false;
	rolldata.seasonnpc = false; //clear everything first, then set what we need
	switch(seasonal) { //I like switch statements. they're so straightforward.
		case("none"):
			break;
		case("main"):
			rolldata.seasonmain = true;
			break;
		case("npc"):
			rolldata.seasonmain = true;
			rolldata.seasonnpc = true;
			break;
		case("companion"):
			rolldata.seasonmain = true;
			rolldata.seasoncompanion = true;
			break;
		case("all"):
			rolldata.seasonmain = true;
			rolldata.seasonnpc = true;
			rolldata.seasoncompanion = true;
			break;
		default:
			break;
	}
	if (document.getElementById("sw").checked == true) {
		rolldata.streetwise = true;
		console.log("Streetwise enabled.");
	} else {
		rolldata.streetwise = false;
	}
	if (document.getElementById("yvanon").checked == true) {
		rolldata.yvanon = true;
	} else {
		rolldata.yvanon = false;
	}
	if (document.getElementById("beans").checked == true) {
		var n = rng(1,100);
		console.log("Beans active!");
		if (n <= 60) {
			rolldata.beans = "zoom";
			console.log("Zoom!");
		} else {
			rolldata.beans = "crash";
			console.log("Crash.");
		}
	} else {
		rolldata.beans = "none";
	}
		
	if (document.getElementById("windrink").checked == true) {
		rolldata.deepearth = true;
	} else {
		rolldata.deepearth = false;
	}
	if (document.getElementById("falldrink").checked == true) {
		rolldata.cider = true;
	} else {
		rolldata.cider = false;
	}
	if (document.getElementById("luckycharm").checked == true && rolldata.rolltype == "hunt") {
		rolldata.trophy = true;
	} else {
		rolldata.trophy = false;
	}
	if (document.getElementById("minboost").checked == true ||
		document.getElementById("drake").checked == true || (document.getElementById("luckycharm").checked == true && rolldata.rolltype == "explo")) {
		rolldata.minboost = true;
	} else {
		rolldata.minboost = false;
	}
	if (document.getElementById("pathway").checked == true) {
		rolldata.chasmjump = "pathway";
	}
	if (document.getElementById("parsec").checked == true) {
		rolldata.chasmjump = "parsec";
	} 
	if (document.getElementById("pathway").checked == false && 
		document.getElementById("parsec").checked == false) {
		rolldata.chasmjump = ("none");
	}
	if (mode == "single") {
		formatSingleItem();
	} else {
		document.getElementById("output").value = createOutput();
	}
}

function createOutput() {
	var out = "Main return:\n";

	var espresso = rolldata.yvanon; //get boost value for main roll
	if (rolldata.beans != "none") {
		espresso = true;
	} //if yvanon is off but beans are on, main roll is boosted
	
	if (rolldata.trophy == true) {
		var a = roll(rolldata.qr, rolldata.streetwise, espresso, 2);
	} else {
		var a = roll(rolldata.qr, rolldata.streetwise, espresso);
	}
	out = out + formatThumbs(a);
	if (rolldata.chasmjump == "none") {
		out = out + rollSeasonal(rolldata.seasonmain, espresso);
	}
	
	if (document.getElementById("tbags").checked == true) {
		a = roll(0);
		out = out + "\nTail Bags returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasonmain);
		}
	}
	if (document.getElementById("packcat").checked == true) {
		a = roll(0);
		out = out + "\nPack Cat returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasoncompanion);
		}
	}
	if (document.getElementById("birb").checked == true) {
		a = roll(0);
		out = out + "\nSpring Messengerbird returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasoncompanion);
		}
	}
	if (document.getElementById("swc").checked == true) {
		a = roll(rolldata.qr, true); //override: streetwise
		out = out + "\nStreetwise Companion returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasonnpc);
		}
	}
	
	//Bonus item returns 
	if(document.getElementById("myrk").checked == true) {
		if(rng(1,100) % 2 == 1) {
			a = rollSingleItem(0);
			out = out + "\nMerchant's Eye returns:\n"
			out = out + formatBonusItem(a);
		} else {
			out = out + "\nMerchant's Eye fails.\n"
		}
	}
	if(document.getElementById("coffee").checked == true) {
		if(rng(1,100) % 2 == 1) {
			a = rollSingleItem(0);
			out = out + "\nCoffee returns:\n"
			out = out + formatBonusItem(a);
		} else {
			out = out + "\nCoffee fails.\n"
		}
	}
	if(document.getElementById("drake").checked == true) {
		a = rollSingleItem(0);
		out = out + "\nTunneldrake returns:\n"
		out = out + formatBonusItem(a);
	}
	if(document.getElementById("sumdrink").checked == true) {
		a = rollSingleItem(0);
		out = out + "\nBlue Raspberry Lemonade returns:\n"
		out = out + formatBonusItem(a);
	}
	
	if(document.getElementById("rumorbonus").checked == true) {
		a = rollSingleItem(rolldata.qr);
		out = out + "\nInvestigate/Waste Nothing returns:\n"
		out = out + formatBonusItem(a);
	}
	if(document.getElementById("miscbonus").checked == true) {
		a = rollSingleItem(0);
		out = out + "\nGeneric bonus item returns:\n"
		out = out + formatBonusItem(a);
	}
	
	if(document.getElementById("treats").checked == true) {
		a = petTreats();
		out = out + "\n" + a;
	}
	
	if(document.getElementById("catmint").checked == true) {
		a = catmintTea();
		out = out + "\n" + a;
	}
	
	if(document.getElementById("luckycharm").checked == true && rolldata.rolltype == "mining") {
		a = dowsing();
		out = out + "\n" + a;
	}
	
	return out;
}	

function roll(qr, sw = rolldata.streetwise, boost = rolldata.yvanon, rare = 1) {
	
	var countRoll = rng(1, 20);
	console.log("Item count roll:" + countRoll);
	var done = false;
	while (!done) { //force a reroll if at least one item of
	                //specified rarity isn't rolled
	var itemCount = 0; //roll total number of items
	if (countRoll <= 3) { 
		itemCount = 1;
		if (rolldata.minboost == true) {
			itemCount = 2;
		} //if minimum is boosted to 2, set to 2
	} else if (countRoll <= 13) {
		itemCount = 2;
	} else if (countRoll <= 17) {
		itemCount = 3;
	} else {
		itemCount = 4;
	}
	if (boost == true) {
		itemCount = 4;
	}
	if (rolldata.beans == "crash") {
		itemCount = 1;
	}
	var toprarity = 1;
	var r = 1; //temp variable to hold rarity
	if (rare > 1 && rolldata.chasmjump != "none") {
		if (rolldata.chasmjump == "pathway") {
			rare = 1;
		} else if (rolldata.chasmjump == "parsec") {
			rare = 2;
		}
		//just a failsafe. don't force a rarity over what can roll.
	} //end if
	
	var items = []; //if this loop repeats, reinitialize this variable
	while (itemCount > 0) {
		var rarity = rng(1, 100); //determine rarity
		var list = rolldata.world;
		if (rarity <= 50 || rolldata.chasmjump == "pathway") {
			list = list.common;
		} else if (rarity <= 85) {
			list = list.uncommon;
			r = 2;
		} else {
			if (rolldata.chasmjump == "parsec") {
				list = list.uncommon;
			} else {
				list = list.rare;
				r = 3;
			}			
		}
		var a = rng(1,list.length); //roll item
		a = a - 1; //decrement to get the index
		console.log("Item genned: " + list[a].name);
		var num = 0;
		var q = list[a].quantity; //roll quantity
		if (q == "high") {
			num = qhigh(qr, boost);
		} else {
			num = qlow(qr, boost);
		}
		if (rolldata.deepearth == true) {
			num = num * 2;
		}
		var dupe = false;
		function dupetest(value, index, array) {
			if (value[0] == list[a]) {
				dupe = true;
			}
		}
		items.forEach(dupetest);
		//really not sure how this is easier than a for loop but [shruggie]
		
		//complicated logical statement here:
		//IF item is not a dupe, AND (item is not contraband OR streetwise is enabled)
		//push the item and quantity to items as an array, and decrement count
		//otherwise, do nothing and repeat the while loop
		if (dupe == false && (list[a].contraband == false || sw == true)) {
			console.log("Item pushed:" + list[a].name);
			if(r > toprarity) {
				toprarity = r;
				console.log("Top rarity set to " + toprarity);
			}
			items.push([list[a], num]);
			itemCount--
		}
	//roll returns are a two-dimensional array. 
	//outer array index: each individual item.
	//inner array index: [0] is the item object. [1] is the quantity.
	} //end while
	if (rare <= toprarity) {
		console.log("Done!");
		done = true;
		//if the rarest item rolled is equal or greater in rarity to the
		//specified rarity, we're good. otherwise repeat the inner while loop
	} 
	} //end second while
	
	return items;
}	


function rollSeasonal(si, boost = rolldata.yvanon) {
	var q = 0;
	if (si == true) {
		q = rng(4,20);
		if (boost == true) {
			q = 20;
		}
	} else {
		q = rng(2,10);
		if (boost == true) {
			q = 10;
		}
	}
	if (rolldata.deepearth == true) {
		q = q * 2;
	}
	if (rolldata.cider == true) {
		q = q * 2;
	}
	var a = rng(1,100);
	var extra = false;
	if(a <= 25) {
		extra = true;
	}
	var out = "They also find (seasonal):\n" + 
	"<a href=\"https://www.deviantart.com/magmatixi/art/" + fest[0].url +
	"\">" + fest[0].name + "</a>" + " x" + q;
	if (extra == true) {
		if (rolldata.deepearth == true && rolldata.cider == true) {
			out = out + " and <a href=\"https://www.deviantart.com/magmatixi/art/" +
			fest[1].url + "\">" + fest[1].name + "</a> x4!\n"
		}
		else if (rolldata.deepearth == true || rolldata.cider == true) {
			out = out + " and <a href=\"https://www.deviantart.com/magmatixi/art/" +
			fest[1].url + "\">" + fest[1].name + "</a> x2!\n"
		}
		else {
			out = out + " and a <a href=\"https://www.deviantart.com/magmatixi/art/" +
			fest[1].url + "\">" + fest[1].name + "</a>!\n";
		}
	} else {
		out = out + "!\n";
	}
	return out;
}

function rollSingleItem(qr, sw = rolldata.streetwise, boost = rolldata.yvanon) {
		var rarity = rng(1, 100); //determine rarity
		var list = rolldata.world;
		if (rarity <= 50 || rolldata.chasmjump == "pathway") {
			list = list.common;
		} else if (rarity <= 85) {
			list = list.uncommon;
		} else { 
			if (rolldata.chasmjump == "parsec") {
				list = list.uncommon;
			} else {
				list = list.rare;
			}
		}
		
		var a = rng(1,list.length); //roll item
		a = a - 1; //decrement to get the index
		
		var num = 0;
		var q = list[a].quantity; //roll quantity
		if (q == "high") {
			num = qhigh(qr, boost);
		} else {
			num = qlow(qr, boost);
		}
		if (rolldata.deepearth == true) {
			num = num * 2;
		}
		
		var item = [list[a], num];
		return item;
}

function formatSingleItem() {
	//simplified the format here, so item shouldn't need double array refs anymore
	var item = rollSingleItem(rolldata.qr, rolldata.streetwise);
	var out = item[0].dathumb + "\n" + item[0].name + " x" + item[1] +
		      "\n\n <a href=\"https://www.deviantart.com/magmatixi/art/" + item[0].url +
			  "\"> " + item[0].name + "</a>" + " x" + item[1] + "\n";
	document.getElementById("output").value = out;
}

function formatThumbs(items) {
	var out = "";
	//man these array references are ugly but.
	//roll returns are a two-dimensional array. 
	//outer array index: each induvidual item.
	//inner array index: [0] is the item object. [1] is the quantity.
	//ugly code ugly code formatting strings makes ugly coooode
	for (i = 0; i < items.length; i++) {
		out = out + items[i][0].dathumb + "\n" + items[i][0].name + " x" + items[i][1] + "\n\n";
	}
	return out;
}

function formatLinks(items) {
	var out = "";
	//help
	for (i = 0; i < items.length; i++) {
		out = out + "<a href=\"https://www.deviantart.com/magmatixi/art/" +
		items[i][0].url + "\">" + items[i][0].name + "</a>" + " x" + items[i][1] + "\n";
	}
	return out;
}

function formatBonusItem(item) {
	var out = "";
	out = out + "<a href=\"https://www.deviantart.com/magmatixi/art/" +
		item[0].url + "\">" + item[0].name + "</a>" + " x" + item[1] + "\n";
	return out;
}
	

function crackGeode() {
	rolldata.world = geode; //override item list
	var first = rollSingleItem(0, true); //roll two single items
	var second = rollSingleItem(0, true); //output their thumbs only
	out = first[0].dathumb + second[0].dathumb;
	document.getElementById("output").value = out;
}

function petTreats() {
	var r = rng(1,100);
	if (r <= 35) {
		var a = rng(1,companions.length);
		a--;
		return "Pet treats lured a: " + "<a href=\"https://www.deviantart.com/magmatixi/art/" +
		companions[a].url + "\">" + companions[a].name + "</a>!";
	} else {
		return "Pet treats failed!";
	}
}

function catmintTea() {
	var r = rng(1,100);
	if (r <= 35) {
		var a = rng(1,cats.length);
		a--;
		return "Catmint tea lured a: " + "<a href=\"https://www.deviantart.com/magmatixi/art/" +
		cats[a].url + "\">" + cats[a].name + "</a>!";
	} else {
		return "Catmint tea failed!";
	}
}

function dowsing() { 
	var a = rng(1,drinks.length);
	a--;
	return "Dowsing Rod returns: " + "<a href=\"https://www.deviantart.com/magmatixi/art/" +
	drinks[a].url + "\">" + drinks[a].name + "</a>!";
}	

function updateList() {
	var type = document.getElementById("type").value;
	if (type == "explo") {
		document.getElementById("world").innerHTML = 
		'<option value="sxriix">Sxriix</option>\n \
		<option value="nsk">Nskanetis</option>\n \
		<option value="earth">Earth</option>\n \
		<option value="chasm">The Chasm</option>';
		document.getElementById("world").disabled = false;
	} else if (type == "hunt") {
		document.getElementById("world").innerHTML =
		'<option value="livestock">Livestock</option>\n \
		<option value="land">Land Animal</option>\n \
		<option value="plant">Plant Creature</option>\n \
		<option value="sea">Sea Creature</option>\n \
		<option value="ungulate">Ungulate</option>';
		document.getElementById("world").disabled = false;
	} else if (type == "mining") {
   		document.getElementById("world").innerHTML =
		'<option value="mine">Mining</option>';
		document.getElementById("world").disabled = true;
	} else if (type == "combat") {
		document.getElementById("world").innerHTML =
		'<option value="fightclub">Combat</option>';
		document.getElementById("world").disabled = true;
	}
}