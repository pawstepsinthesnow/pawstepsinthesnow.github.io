var rolldata = {
	ggenes: [],
	gmutes: [],
	rgenes: [],
	rmutes: []
}

function setUp() {
	var giver = document.getElementById("giver").value
	giver = giver.trim()
	var giverSplit = giver.split("+")
	var ggenes = giverSplit[0]
	var gmutations = giverSplit[1]
	//console.log(gmutations)
	ggenes = ggenes.split("/")
	if(gmutations === undefined) {
		var gmutations = "None"
	}
	gmutations = gmutations.split("/")
	console.log("Genes:")
	for (let i = 0; i < ggenes.length; i++) {
		console.log(ggenes[i])
	}
	console.log("Mutations:")
	for (let i = 0; i < gmutations.length; i++) {
		console.log(gmutations[i])
	}
	var reciever = document.getElementById("reciever").value
	reciever = reciever.trim();
	var recieverSplit = reciever.split("+")
	var rgenes = recieverSplit[0]
	var rmutations = recieverSplit[1]
	if(rmutations === undefined) {
		var rmutations = "None"
	}
	rgenes = rgenes.split("/")
	rmutations = rmutations.split("/")
	//now that we're done compiling, set global vars
	rolldata.ggenes = ggenes;
	rolldata.gmutes = gmutations;
	rolldata.rgenes = rgenes;
	rolldata.rmutes = rmutations;
	
	console.log("Genes:")
	for (let i = 0; i < rgenes.length; i++) {
		console.log(rgenes[i])
	}
	console.log("Mutations:")
	for (let i = 0; i < rmutations.length; i++) {
		console.log(rmutations[i])
	}
	document.getElementById("output").value = createOutput();
}

function createOutput() {
	var a = rng(2,5);
	out = ""
	for (let i = 0; i < a; i++) {
		cub = rollCub();
		out = out + formatCub(cub);
	}
	return out;
}

function rng(min, max) {
	return Math.floor((Math.random() * ((max + 1)-min)) + min);
}

function rollCub() {
	//local copies of neccessary variables to not modify the global version
	let ggenes = Array.from(rolldata.ggenes);
	let gmutes = Array.from(rolldata.gmutes);
	let rgenes = Array.from(rolldata.rgenes);
	let rmutes = Array.from(rolldata.rmutes);
	
	var gbase = [];
	for (let i = 0; i < 4; i++) {
		//move the first four elements into a new array
		gbase.push(ggenes.shift())
	}
	var rbase = [];
	for (let i = 0; i < 4; i++) {
		//move the first four elements into a new array
		rbase.push(rgenes.shift())
	}
	console.log(gbase);
	console.log(rbase);
	var basecoat = []
	var a = rng(1,100)
	//because the first four elements are fixed (base coat string)
	//let's do them in sequence
	for(let i = 0; i < 4; i++) {
		var a = rng(1,100)
		var dom;
		var het;
		var nah;
		switch(i) {
			case 0:
			dom = "AA";
			het = "Aa";
			nah = "aa";
			break;
			case 1:
			dom = "BB";
			het = "Bb";
			nah = "bb";
			break;
			case 2:
			dom = "DD";
			het = "Dd";
			nah = "dd";
			break;
			case 3:
			dom = "OO";
			het = "Oo";
			nah = "oo";
		}
		if((gbase[i] == dom) && (rbase[i] == dom)) {
			if(a <= 90) {
				basecoat.push(dom);
			} else {
				basecoat.push(het);
			}
			console.log("Case 1: both dom");
		} else if(((gbase[i] == het) && (rbase[i] == dom)) || ((gbase[i] == dom) && (rbase[i] == het))) {
			if(a <= 60) {
				basecoat.push(dom);
			} else {
				basecoat.push(het);
			}
			console.log("Case 2: Dom vs. recessive");
		} else if(((gbase[i] == nah) && (rbase[i] == dom)) || ((gbase[i] == dom) && (rbase[i] == nah))) {
			if(a <= 40) {
				basecoat.push(dom);
			} else {
				basecoat.push(het);
			}
			console.log("Case 3: Dom vs. nah");
		} else if((gbase[i] == het) && (rbase[i] == het)) {
			if(a <= 20) {
				basecoat.push(dom);
			} else if (a <= 75) {
				basecoat.push(het)
			} else {
				basecoat.push(nah)
			}
			console.log("Case 4: Both recessive");
		} else if (((gbase[i] == nah) && (rbase[i] == het)) || ((gbase[i] == het) && (rbase[i] == nah))) {
			if(a <= 50) {
				basecoat.push(het);
			} else {
				basecoat.push(nah);
			}
			console.log("Case 5: Recessive vs. nah");
		} else {
			basecoat.push(nah);
			console.log("Case 6: Nah vs. nah.");
		}
	}
	return basecoat;
}

function formatCub(cub) {
	//stub function for now
	out = "";
	for (let i = 0; i < cub.length; i++) {
		out = out + cub[i];
		out = out + "/";
	}
	out = out + "\n";
	return out;
}
