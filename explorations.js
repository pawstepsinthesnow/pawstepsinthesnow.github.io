var rolldata = {
	rolltype: "explo",
	world: nskanetis,
	yvanon: false,
	qr: 0,
	seasonal: false,
	streetwise: false,
	minboost: false,
	deepearth: false,
	chasmjump: "none",
};

function qhigh(q) {
	var first;
	if (rolldata.yvanon == true) {
		first = 5;
	} else {
		first = rng(1,5);
	}
	var rolls = [first]
	for (i = 0; i < q; i++) {
		if (rolldata.yvanon == true) {
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

function qlow(q) {
	var first = 1;
	var rolls = [first]
	for (i = 0; i < q; i++) {
		if (rolldata.yvanon == true) {
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
function setUp() {
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
		
	if(rolldata.rolltype == "explo") {
		rolldata.qr = Math.floor(speed / 50) + Math.floor(special / 50);
	} else if (rolldata.rolltype == "hunt") {
		rolldata.qr = Math.floor(attack / 50) + Math.floor(defense / 50);
	} else if (rolldata.rolltype == "mining") {
		rolldata.qr = Math.floor(defense / 50) + Math.floor(speed / 50);
	} else if (rolldata.rolltype == "combat") {
		rolldata.qr = 0;
	}
	if (document.getElementById("nom").checked == true) {
		rolldata.seasonal = true;
	} else {
		rolldata.seasonal = false;
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
	if (document.getElementById("windrink").checked == true) {
		rolldata.deepearth = true;
	} else {
		rolldata.deepearth = false;
	}
	if (document.getElementById("minboost").checked == true ||
		document.getElementById("drake").checked == true) {
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
	
	document.getElementById("output").value = createOutput();
}

function createOutput() {
	var out = "Main return:\n";
	var a = roll(rolldata.qr, rolldata.streetwise, false);
	out = out + formatThumbs(a);
	if (rolldata.chasmjump == "none") {
		out = out + rollSeasonal();
	}
	
	//Full roll returns (Pack Cat, Tail Bags, Streetwise Companion);
	
	if (document.getElementById("packcat").checked == true) {
		a = roll(0, rolldata.streetwise, false);
		out = out + "\nPack Cat returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal();
		}
	}
	if (document.getElementById("tbags").checked == true) {
		a = roll(0, rolldata.streetwise, false);
		out = out + "\nTail Bags returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal();
		}
	}
	if (document.getElementById("swc").checked == true) {
		a = roll(0, true, false);
		out = out + "\nStreetwise Companion returns:\n";
		out = out + formatLinks(a);
		if (rolldata.chasmjump == "none") {
			out = out + rollSeasonal();
		}
	}
	
	//Bonus item returns 
	if(document.getElementById("myrk").checked == true) {
		if(rng(1,100) % 2 == 1) {
			a = roll(0, rolldata.streetwise, true);
			out = out + "\nMerchant's Eye returns:\n"
			out = out + formatLinks(a);
		} else {
			out = out + "\nMerchant's Eye fails.\n"
		}
	}
	if(document.getElementById("coffee").checked == true) {
		if(rng(1,100) % 2 == 1) {
			a = roll(0, rolldata.streetwise, true);
			out = out + "\nCoffee returns:\n"
			out = out + formatLinks(a);
		} else {
			out = out + "\nCoffee fails.\n"
		}
	}
	if(document.getElementById("drake").checked == true) {
		a = roll(0, rolldata.streetwise, true);
		out = out + "\nTunneldrake returns:\n"
		out = out + formatLinks(a);
	}
	if(document.getElementById("sumdrink").checked == true) {
		a = roll(0, rolldata.streetwise, true);
		out = out + "\nBlue Raspberry Lemonade returns:\n"
		out = out + formatLinks(a);
	}
	if(document.getElementById("rumorbonus").checked == true) {
		a = roll(rolldata.qr, rolldata.streetwise, true);
		out = out + "\nInvestigate/Waste Nothing returns:\n"
		out = out + formatLinks(a);
	}
	if(document.getElementById("miscbonus").checked == true) {
		a = roll(0, rolldata.streetwise, true);
		out = out + "\nGeneric bonus item returns:\n"
		out = out + formatLinks(a);
	}
	
	return out;
}	

function roll(qr, sw, bonus) {
	
	var countRoll = rng(1, 20);
	console.log("Item count roll:" + countRoll);
	var itemCount = 0; //roll total number of items
	//piggybacking on this for bonus items: if the bonus item variable is true
	//this function will always return one item
	if (countRoll <= 3 || bonus == true) { 
		itemCount = 1;
		if (rolldata.minboost == true && bonus == false) {
			itemCount = 2;
		} //if minimum is boosted to 2, set to 2, but not if we're in bonus item mode
	} else if (countRoll <= 13) {
		itemCount = 2;
	} else if (countRoll <= 17) {
		itemCount = 3;
	} else {
		itemCount = 4;
	}
	if (rolldata.yvanon == true && bonus == false) {
		itemCount = 4;
	}
	items = [];
	while (itemCount > 0) {
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
			num = qhigh(qr);
		} else {
			num = qlow(qr);
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
			items.push([list[a], num]);
			itemCount--
		}
	//roll returns are a two-dimensional array. 
	//outer array index: each induvidual item.
	//inner array index: [0] is the item object. [1] is the quantity.
	} //end while
	
	return items;
}	

function rollSeasonal() {
	var q = 0;
	if (rolldata.seasonal == true) {
		q = rng(4,20);
		if (rolldata.yvanon == true) {
			q = 20;
		}
	} else {
		q = rng(2,10);
		if (rolldata.yvanon == true) {
			q = 10;
		}
	}
	if (rolldata.deepearth == true) {
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
		out = out + " and a <a href=\"https://www.deviantart.com/magmatixi/art/" +
		fest[1].url + "\">" + fest[1].name + "</a>!\n";
	} else {
		out = out + "!\n";
	}
	return out;
}


function rollSingleItem() {
	var item = roll(rolldata.qr, rolldata.streetwise, true);
	//man these array references are ugly but.
	//roll returns are a two-dimensional array. 
	//outer array index: each induvidual item.
	//inner array index: [0] is the item object. [1] is the quantity.
	//here, only one item = index 0
	var out = item[0][0].dathumb + "\n" + item[0][0].name + " x" + item[0][1] +
		      "\n\n <a href=\"https://www.deviantart.com/magmatixi/art/" + item[0][0].url +
			  "\"> " + item[0][0].name + "</a>" + " x" + item[0][1] + "\n";
	document.getElementById("output").value = out;
}

function formatThumbs(items) {
	var out = "";
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