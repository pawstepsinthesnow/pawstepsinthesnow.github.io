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
	trophy: false,
	successchance: 0,
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
		case ("chasmhunt"):
			rolldata.world = chasmhunt;
			break;
		case ("avian"):
			rolldata.world = avian;
			break;
		case ("mine"):
			rolldata.world = mining;
			break;
		case ("fightclub"):
			rolldata.world = combat;
			break;
		case ("legendary"):
			rolldata.world = legend;
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
	if (document.getElementById("skydrake").checked == true) {
		speed += 100;
		if(speed > 400) {
			speed = 400;
		}
	}
	if (document.getElementById("grandrooter").checked == true) {
		if (rolldata.rolltype == "explo") {
			speed += 100;
			if(speed > 400) {
				speed = 400;
			}
		}
		if (rolldata.rolltype == "hunt" || rolldata.rolltype == "legend") {
			defense += 100;
			if(defense > 400) {
				defense = 400;
			}
		}
	}
	if (document.getElementById("caverndrake").checked == true) {
		if (rolldata.rolltype == "hunt" || rolldata.rolltype == "mining" || rolldata.rolltype == "legend") {
			defense += 100;
			if(defense > 400) {
				defense = 400;
			}
		}
	}
	if (document.getElementById("tooth").checked == true) {
		attack += 50;
		if(attack > 400) {
			attack = 400;
		}
		if (rolldata.rolltype == "hunt" || rolldata.rolltype == "legend") {
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
	} else if (rolldata.rolltype == "legend") {
		var partysize = parseInt(document.getElementById("partysize").value);
		switch (partysize) {
			case(1):
				rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
				var s = Math.floor((speed + special) / 200);
				rolldata.successchance = 50 + s;
				break;
			case(2):
				attack += parseInt(document.getElementById("atk2").value);
				defense += parseInt(document.getElementById("def2").value);
				if (attack >= 1500) { attack = 1500; }
				if (defense >= 1500) { defense = 1500; }
				rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
				speed += parseInt(document.getElementById("spd2").value);
				special += parseInt(document.getElementById("spc2").value);
				if (speed >= 1500) { speed = 1500; }
				if (special >= 1500) { special = 1500; }
				var s = Math.floor((speed + special) / 200);
				rolldata.successchance = 55 + s;
				break;
			case(3):
				attack += parseInt(document.getElementById("atk2").value);
				defense += parseInt(document.getElementById("def2").value);
				attack += parseInt(document.getElementById("atk3").value);
				defense += parseInt(document.getElementById("def3").value);
				if (attack >= 1500) { attack = 1500; }
				if (defense >= 1500) { defense = 1500; }
				rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
				speed += parseInt(document.getElementById("spd2").value);
				special += parseInt(document.getElementById("spc2").value);
				speed += parseInt(document.getElementById("spd3").value);
				special += parseInt(document.getElementById("spc3").value);
				if (speed >= 1500) { speed = 1500; }
				if (special >= 1500) { special = 1500; }
				var s = Math.floor((speed + special) / 200);
				rolldata.successchance = 60 + s;
				break;
			case(4):
				attack += parseInt(document.getElementById("atk2").value);
				defense += parseInt(document.getElementById("def2").value);
				attack += parseInt(document.getElementById("atk3").value);
				defense += parseInt(document.getElementById("def3").value);
				attack += parseInt(document.getElementById("atk4").value);
				defense += parseInt(document.getElementById("def4").value);
				if (attack >= 1500) { attack = 1500; }
				if (defense >= 1500) { defense = 1500; }
				rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
				speed += parseInt(document.getElementById("spd2").value);
				special += parseInt(document.getElementById("spc2").value);
				speed += parseInt(document.getElementById("spd3").value);
				special += parseInt(document.getElementById("spc3").value);
				speed += parseInt(document.getElementById("spd4").value);
				special += parseInt(document.getElementById("spc4").value);
				if (speed >= 1500) { speed = 1500; }
				if (special >= 1500) { special = 1500; }
				var s = Math.floor((speed + special) / 200);
				rolldata.successchance = 65 + s;
				break;
			default:
				rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
				var s = Math.floor((speed + special) / 200);
				rolldata.successchance = 50 + s;
				break;
		}
		if (document.getElementById("skydrake").checked == true) {
			rolldata.successchance += 15;
		}
		if (document.getElementById("caverndrake").checked == true) {
			rolldata.successchance += 15;
		}
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
	
	if (rolldata.rolltype == "legend") {
		var r = rng(1, 100);
		if (r >= rolldata.successchance) {
			out = out + "Legendary hunting failed.";
			out = out + rollTempCondition("legfail");
			return out;
		}
	}

	var espresso = rolldata.yvanon; //get boost value for main roll
	if (rolldata.beans != "none") {
		espresso = true;
	} //if yvanon is off but beans are on, main roll is boosted
	
	if (rolldata.trophy == true) {
		var a = roll(rolldata.qr, rolldata.streetwise, espresso, 2);
	} else {
		var a = roll(rolldata.qr, rolldata.streetwise, espresso);
	}
	if (document.getElementById("warscythe").checked == true && (rolldata.rolltype == "hunt" || rolldata.rolltype == "legend") ){
		a = slaughterhouse(a);
	}
	out = out + formatItems(a);
	if (rolldata.chasmjump == "none") {
		out = out + rollSeasonal(rolldata.seasonmain, espresso);
	}
	
	if (document.getElementById("tbags").checked == true) {
		a = roll(0);
		out = out + "\nTail Bags returns:\n";
		out = out + formatItems(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasonmain);
		}
	}
	if (document.getElementById("packcat").checked == true) {
		a = roll(0);
		out = out + "\nPack Cat returns:\n";
		out = out + formatItems(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasoncompanion);
		}
	}
	if (document.getElementById("birb").checked == true) {
		a = roll(0);
		out = out + "\nSpring Messengerbird returns:\n";
		out = out + formatItems(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasoncompanion);
		}
	}
	
	if (document.getElementById("swc").checked == true) {
		a = roll(rolldata.qr, true); //override: streetwise
		out = out + "\nStreetwise Companion returns:\n";
		out = out + formatItems(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasonnpc);
		}
	}
	
	if (document.getElementById("holo").checked == true) {
		a = roll(0, true); //override: streetwise
		out = out + "\nHolo Helper/Hacker returns:\n";
		out = out + formatItems(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal(rolldata.seasoncompanion);
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
		if (document.getElementById("skydrake").checked == true) {
			a[1] *= 2;
		}
		out = out + "\nTunneldrake returns:\n"
		out = out + formatBonusItem(a);
	}
	if(document.getElementById("rooter").checked == true) {
		if(rng(1,100) % 2 == 1) {
			a = rollSpecificRarity(0, "rare");
			out = out + "\nRooter returns:\n"
			out = out + formatBonusItem(a);
		} else {
			a = [{name: "Root Vegetables", dathumb: ":thumb732352346:", url: "Root-Vegetables-732352346", quantity: "low", contraband: false}, 1]
			out = out + "\nRooter returns:\n"
			out = out + formatBonusItem(a);
		}
	}
	if(document.getElementById("rootette").checked == true) {
		if(rng(1,100) <= 80) {
			a = rollSpecificRarity(0, "uncommon");
			out = out + "\nMini Rooter returns:\n"
			out = out + formatBonusItem(a);
		} else {
			a = [{name: "Root Vegetables", dathumb: ":thumb732352346:", url: "Root-Vegetables-732352346", quantity: "low", contraband: false}, 1]
			out = out + "\nMini Rooter returns:\n"
			out = out + formatBonusItem(a);
		}
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
	
	if(document.getElementById("treats").checked == true || (document.getElementById("caverndrake").checked == true && rolldata.rolltype == "legend")) {
		a = petTreats();
		out = out + "\n" + a;
	}
	
	if(document.getElementById("catmint").checked == true) {
		a = catmintTea("tea");
		out = out + "\n" + a;
	}
	
	if(document.getElementById("catcollar").checked == true) {
		a = catmintTea("collar");
		out = out + "\n" + a;
	}
	
	if(document.getElementById("knife").checked == true) {
		a = huntingKnife();
		out = out + "\n" + a;
	}
	
	if(document.getElementById("luckycharm").checked == true && rolldata.rolltype == "mining") {
		a = dowsing();
		out = out + "\n" + a;
	}
	
	if (document.getElementById("warscythe").checked == true && rolldata.rolltype == "explo") {
		a = rollSpecificItem(rolldata.qr, grains);
		a = formatBonusItem(a);
		out = out + "Warscythe returns:\n" + a;
	}
	
	out = out + rollTempCondition(rolldata.rolltype);
	
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
		} else if (q == "low" ) {
			num = qlow(qr, boost);
		} else {
			num = 1;
		}
		if (rolldata.deepearth == true && q != "unique") {
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
	var out = "They also find (seasonal):\n" + fest[0].name + " x" + q;
	if (extra == true) {
		if (rolldata.deepearth == true && rolldata.cider == true) {
			out = out + " and " + fest[1].name + " x4!\n"
		}
		else if (rolldata.deepearth == true || rolldata.cider == true) {
			out = out + " and " + fest[1].name + " x2!\n"
		}
		else {
			out = out + " and a " + fest[1].name + "!\n";
		}
	} else {
		out = out + "!\n";
	}
	//for june
	/*
	var a = rng(1,100);
	var extra = false;
	if(a <= 25) {
		extra = true;
	}
	if (extra == true) {
		if (rolldata.deepearth == true && rolldata.cider == true) {
			out = out + "As well as a <a href=\"https://www.deviantart.com/magmatixi/art/" +
			fest[2].url + "\">" + fest[2].name + "</a> x4!\n"
		}
		else if (rolldata.deepearth == true || rolldata.cider == true) {
			out = out + "As well as <a href=\"https://www.deviantart.com/magmatixi/art/" +
			fest[2].url + "\">" + fest[2].name + "</a> x2!\n"
		}
		else {
			out = out + "As well as <a href=\"https://www.deviantart.com/magmatixi/art/" +
			fest[2].url + "\">" + fest[2].name + "</a>!\n";
		}
	} else {
		out = out + "\n";
	}*/
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
		} else if (q == "low" ) {
			num = qlow(qr, boost);
		} else {
			num = 1;
		}
		if (rolldata.deepearth == true&& q != "unique") {
			num = num * 2;
		}
		
		var item = [list[a], num];
		return item;
}

function rollSpecificItem(qr, specifiedItem, boost = rolldata.yvanon)
{ //please note that this function expects an item in object format
//reccomend, if you don't wish to hardcode a lengthy object
//preassigning it to a variable in itemlists.js
	var num = 0;
	var q = specifiedItem.quantity; //roll quantity
	if (q == "high") {
		num = qhigh(qr, boost);
	} else if (q == "low" ) {
		num = qlow(qr, boost);
	} else {
		num = 1;
	}
	if (rolldata.deepearth == true && q != "unique") {
		num = num * 2;
	}
	
	var item = [specifiedItem, num];
	return item;
}

function rollSpecificRarity(qr, rarity, sw = rolldata.streetwise, boost = rolldata.yvanon) { //rolls single item at specified rarity
	var list = rolldata.world;
	if (rarity == "common") {
			list = list.common;
		} else if (rarity == "uncommon") {
			list = list.uncommon;
		} else { 
			list = list.rare;
		}
		
		var a = rng(1,list.length); //roll item
		a = a - 1; //decrement to get the index
		
		var num = 0;
		var q = list[a].quantity; //roll quantity
		if (q == "high") {
			num = qhigh(qr, boost);
		} else if (q == "low" ) {
			num = qlow(qr, boost);
		} else {
			num = 1;
		}
		if (rolldata.deepearth == true && q != "unique") {
			num = num * 2;
		}
		
		var item = [list[a], num];
		return item;
}

function formatSingleItem() {
	//simplified the format here, so item shouldn't need double array refs anymore
	var item = rollSingleItem(rolldata.qr, rolldata.streetwise);
	var out = item[0].name + " x" + item[1] + "\n";
	document.getElementById("output").value = out;
}

function formatThumbs(items) {
	//depreciated, DO NOT USE
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

function formatItems(items) {
	var out = "";
	for (i = 0; i < items.length; i++) {
		out = out + items[i][0].name + " x" + items[i][1] + "\n";
	}
	return out; 
}

function formatLinks(items) {
	//depreciated, DO NOT USE
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
	out = out + item[0].name + " x" + item[1] + "\n";
	return out;
}
	

function crackGeode() {
	rolldata.world = geode; //override item list
	var first = rollSingleItem(0, true); //roll two single items
	var second = rollSingleItem(0, true); //output their names only
	out = first[0].name + "\n" + second[0].name;
	document.getElementById("output").value = out;
}

function petTreats() {
	var r = rng(1,100);
	if (r <= 35) {
		var a = rng(1,companions.length);
		a--;
		return "Pet treats lured a: " + companions[a].name + "\n";
	} else {
		return "Pet treats failed!";
	}
}

function catmintTea(type) {
	var r = rng(1,100);
	var msg = "Glitch cat"; //this should be overriden
	if (type == "tea") {
		msg = "Catmint tea";
	}
	else if (type == "collar") {
		msg = "Catmint collar";
	}
	if (r <= 35) {
		var a = rng(1,cats.length);
		a--;
		return msg + " lured a: " + cats[a].name + "!\n";
	} else {
		return msg + " failed!";
	}
}

function dowsing() { 
	var a = rng(1,drinks.length);
	a--;
	return "Dowsing Rod returns: " + drinks[a].name + "!\n";
}	

function huntingKnife() { 
	var a = rng(1,pelts.length);
	a--;
	return "Hunting Knife returns: " + pelts[a].name + "!\n";
}

function slaughterhouse(items) {
	for (i = 0; i < items.length; i++) {
		for (j = 0; j < pelts.length; j++) {
			if (items[i][0].dathumb == pelts[j].dathumb) {
				console.log("Item matched");
				items[i][1] *= 2;
			}
		}
		for (j = 0; j < meats.length; j++) {
			if (items[i][0].dathumb == meats[j].dathumb) {
				console.log("Item matched");
				items[i][1] *= 2;
			}
		}
	}
	return items;
}

function rollTempCondition(type) {
	var list
	if (type == "explo") {
		list = explo;
	} else if (type == "hunt") {
		list = hunt;
	} else if (type == "mining") {
		list = mine;
	} else if (type == "combat") {
		list = fight;
	} else if (type == "legendary") {
		list = legendary;
	} else {
		list = legfail;
	}
	var rarity = rng (1, 100);
	if (rarity <= 50) {
			return "No condition rolled.";
		} else if (rarity <= 85) {
			list = list.uncommon;
		} else {
			list = list.rare;			
		}
	var a = rng(1,list.length); //roll item
		a = a - 1; //decrement to get the index
	resist = isResisted(list[a].immunity);
	if (resist == true) {
		console.log(list[a].name + " resisted!");
		return "";
	}
	if (resist == false) {
		return list[a].name + " rolled!";
	}
}

function isResisted(immunity) {
	var l = 0 //levelup resist value
	var level = document.getElementById("level").value;
	switch(level) {
		case("newfound"):
			break;
		case("active"):
			l = 30;
			break;
		case("irradiated"):
			l = 70;
			break;
		case("omnipotent"):
			l = 100;
			break;
		default:
			break;
	}
	if(document.getElementById("placeholder").checked) {
		//Works on everything immunity
		l += 0; //Change this to desired value
	}
		
	switch(immunity) {
		case("mechhalf"):
			var a = rng(1,100);
			a = a - l;
			if (a <= 50 && document.getElementById("mechanix").checked) {
				return true;
			} else if (a <= 0) {
				return true;
			} else {
				return false;
			} 
			break;
		case("mechfull"):
			if (document.getElementById("mechanix").checked) {
				return true;
			} else {
				return false;
			}
			break;
		case("valve"):
			var a = rng(1,100);
			a = a - l;
			if (a <= 30 && document.getElementById("heart").checked) {
				return true;
			} else if (a <= 0) {
				return true;
			} else {
				return false;
			} 
			break;
		case("chasm"):
			//this is special cased to hell and back
			if((document.getElementById("jump").checked == true || rolldata.chasmjump != "none"))
			{ //CONDITION 1: If this roll is a chasmjump (checking both the "is a jump" box
			//and the Teleportation boxes, roll mymber heart valve.
				return (isResisted("valve") || (document.getElementById("mechanix").checked));
			} //Negate roll if ixi is a Mechanix.
			else if((rolldata.world == chasm || rolldata.world == chasmhunt || rolldata.world == mining))
			{ //CONDITION 2: Is the roll list is set to the Chasm, Chasm Creature, or Mining?
			//If yes, then roll as above.
				return (isResisted("valve") || (document.getElementById("mechanix").checked));
			} else {
				return true; //If neither of the above conditions come up true, it is always resisted.
			}
			break;
		case("none"):
			var a = rng(1,100);
			a = a - l;
			if (a <= 0) {
				return true;
			} else {
				return false; //This case only considers level related resists.
			} 
			break;
		case("always"):
			return true; //This case always resists. 
			break;
		default:
			return true; //Always resist undefined immunities.
			break;
	}
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
		<option value="ungulate">Ungulate</option>\n \
		<option value="avian">Avian</option>\n \
		<option value="chasmhunt">Chasm</option>';
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
	else if (type == "legend") {
		document.getElementById("world").innerHTML =
		'<option value="legendary">L. Hunting</option>';
		document.getElementById("world").disabled = true;
	}
}
function hideParty() {
	var size = document.getElementById("partysize").value;
	if (size == "1") {
		document.getElementById("ixi2").innerHTML = "";
		document.getElementById("ixi3").innerHTML = "";
		document.getElementById("ixi4").innerHTML = "";
	} else if (size == "2") {
		document.getElementById("ixi2").innerHTML = 'Ixi 2 Atk: <input type="text" name="atk2" id="atk2" size="4" value="10"> \
		Def: <input type="text" name="def2" id="def2" size="4" value="10"> \
		Spc: <input type="text" name="spc2" id="spc2" size="4" value="10"> \
		Spd: <input type="text" name="spd2" id="spd2" size="4" value="10"><br>';
		document.getElementById("ixi3").innerHTML = "";
		document.getElementById("ixi4").innerHTML = "";
	} else if (size == "3") {
		document.getElementById("ixi2").innerHTML = 'Ixi 2 Atk: <input type="text" name="atk2" id="atk2" size="4" value="10"> \
		Def: <input type="text" name="def2" id="def2" size="4" value="10"> \
		Spc: <input type="text" name="spc2" id="spc2" size="4" value="10"> \
		Spd: <input type="text" name="spd2" id="spd2" size="4" value="10"><br>';
		document.getElementById("ixi3").innerHTML = 'Ixi 3 Atk: <input type="text" name="atk3"  id="atk3" size="4" value="10"> \
	Def: <input type="text" name="def3" id="def3" size="4" value="10"> \
	Spc: <input type="text" name="spc3" id="spc3" size="4" value="10"> \
	Spd: <input type="text" name="spd3" id="spd3" size="4" value="10"><br> ';
		document.getElementById("ixi4").innerHTML = "";
	} else {
		document.getElementById("ixi2").innerHTML = 'Ixi 2 Atk: <input type="text" name="atk2" id="atk2" size="4" value="10"> \
		Def: <input type="text" name="def2" id="def2" size="4" value="10"> \
		Spc: <input type="text" name="spc2" id="spc2" size="4" value="10"> \
		Spd: <input type="text" name="spd2" id="spd2" size="4" value="10"><br>';
		document.getElementById("ixi3").innerHTML = 'Ixi 3 Atk: <input type="text" name="atk3"  id="atk3" size="4" value="10"> \
	Def: <input type="text" name="def3" id="def3" size="4" value="10"> \
	Spc: <input type="text" name="spc3" id="spc3" size="4" value="10"> \
	Spd: <input type="text" name="spd3" id="spd3" size="4" value="10"><br> ';
		document.getElementById("ixi4").innerHTML = 'Ixi 4 Atk: <input type="text" name="atk4" id="atk4" size="4" value="10"> \
	Def: <input type="text" name="def4" id="def4" size="4" value="10"> \
	Spc: <input type="text" name="spc4" id="spc4" size="4" value="10"> \
	Spd: <input type="text" name="spd4" id="spd4" size="4" value="10"><br>';
	}
}