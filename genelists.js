let common = [
	{name: "Accents", genecode: "Ac", standard: "nAc", dominant: "AcAc", position: "after"},
	{name: "Cloak", genecode: "Clk", standard: "nClk", dominant: "ClkClk", position: "after"},
	{name: "Clownfish", genecode: "Clw", standard: "nClw", dominant: "ClwClw", position: "after"},
	{name: "Dapple", genecode: "Dpl", standard: "nDpl", dominant: "DplDpl", position: "after"}
	];
let uncommon = [
	{name: "Blaze", genecode: "Blz", standard: "nBlz", dominant: "BlzBlz", position: "after"},
	{name: "Bloom", genecode: "Blm", standard: "nBlm", dominant: "BlmBlm", position: "after"},
	{name: "Blur", genecode: "Blr", standard: "nBlr", dominant: "BlrBlr", position: "after"},
	{name: "Boar", genecode: "Boa", standard: "nBoa", dominant: "BoaBoa", position: "after"}
	];
let rare = [
	{name: "Bioluminescent", genecode: "Lum", standard: "nLum", dominant: "LumLum", position: "before"},
	{name: "Caldera", genecode: "Cal", standard: "nCal", dominant: "CalCal", position: "after"},
	{name: "Cenote", genecode: "Cen", standard: "nCen", dominant: "CenCen", position: "after"},
	{name: "Chameleon", genecode: "Cham", standard: "nCham", dominant: "ChamCham", position: "after"}
	];
let colormut = [
	{name: "E.Porphyria", genecode: "EryPor", rarity: "common"},
	{name: "Albinism", genecode: "Al", rarity: "uncommon"}
];
let volatilemut = [
	{name: "Beak", genecode: "Bek", rarity: "uncommon"},
	{name: "Fanged", genecode: "Fan", rarity: "uncommon"}
	];
let combatmut = [
	{name: "Vestigial Wings", genecode: "Vwing", rarity: "uncommon"}
	];
let xnommut = [
	{name: "Bird Limbs", genecode: "X-Bird", rarity: "common"},
	{name: "Bushy Tail", genecode: "X-BushT", rarity: "common"},
	{name: "Wing Arms", genecode: "X-WingA", rarity: "uncommon"}
	];
let combo = [
	{name: "Feathered Wings", genecode: "FtWing", components: ["Vwing, X-WingA"]},
	{name: "Wings", genecode: "Wing", components: ["Vwing, Vwing"]}
	];