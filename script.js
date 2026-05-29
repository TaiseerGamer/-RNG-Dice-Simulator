let coins =
Number(localStorage.getItem("coins")) || 0;

let luck =
Number(localStorage.getItem("luck")) || 1;

let coinBoost =
Number(localStorage.getItem("coinBoost")) || 1;

let rolls =
Number(localStorage.getItem("rolls")) || 0;

let totalCoins =
Number(localStorage.getItem("totalCoins")) || 0;

let inventory =
JSON.parse(
localStorage.getItem("inventory")
) || [];

let highestRarity =
localStorage.getItem("highestRarity")
|| "None";

const rarityValue = {

"Common":1,

"Uncommon":2,

"Rare":3,

"Epic":4,

"Legendary":5,

"Mythic":6,

"Crystalic":7,

"Impossible":8,

"Divine":9,

"Transcendent":10,

"Secret":11

};

const rewards = [

{
name:"Stone",
rarity:"Common",
chance:35,
reward:5,
color:"#ccc"
},

{
name:"Metal",
rarity:"Uncommon",
chance:25,
reward:10,
color:"lime"
},

{
name:"Dust",
rarity:"Rare",
chance:15,
reward:25,
color:"cyan"
},

{
name:"Relic",
rarity:"Epic",
chance:10,
reward:60,
color:"violet"
},

{
name:"Dragon Core",
rarity:"Legendary",
chance:6,
reward:150,
color:"orange"
},

{
name:"Celestial Orb",
rarity:"Mythic",
chance:4,
reward:300,
color:"hotpink"
},

{
name:"Void Element",
rarity:"Crystalic",
chance:2,
reward:700,
color:"aqua"
},

{
name:"Galaxy God",
rarity:"Impossible",
chance:1,
reward:2000,
color:"red"
},

{
name:"Divine Flame",
rarity:"Divine",
chance:.5,
reward:6000,
color:"gold"
},

{
name:"Universe Core",
rarity:"Transcendent",
chance:.2,
reward:15000,
color:"#ff44ff"
},

{
name:"???",
rarity:"Secret",
chance:.05,
reward:100000,
color:"#ffffff"
}

];

function roll(){

const dice =
document.getElementById("dice");

dice.classList.add("rolling");

setTimeout(()=>{

dice.classList.remove("rolling");

},400);

let totalWeight=0;

rewards.forEach(r=>{

totalWeight +=
r.chance * luck;

});

let random =
Math.random()*totalWeight;

let current=0;

let result;

for(let item of rewards){

current +=
item.chance * luck;

if(random<=current){

result=item;

break;

}

}

let earned =
Math.floor(
result.reward * coinBoost
);

coins += earned;

totalCoins += earned;

rolls++;

inventory.unshift(

`${result.name} (${result.rarity})`

);

if(

rarityValue[result.rarity] >

rarityValue[highestRarity]

||

highestRarity==="None"

){

highestRarity =
result.rarity;

}

save();

updateUI();

document.getElementById(

"result"

).innerHTML=

`
<span style="color:${result.color}">

${result.name}

(${result.rarity})

</span>

<br>

+${earned} coins

`;

}

function updateUI(){

document.getElementById(

"coins"

).innerText=

`Coins: ${coins}`;

document.getElementById(

"stats"

).innerText=

`Rolls: ${rolls} | Highest: ${highestRarity} | Total Coins: ${totalCoins}`;

document.getElementById(

"inventoryList"

).innerHTML=

inventory

.slice(0,50)

.map(

x=>`<div>${x}</div>`

)

.join("");

}

function buyLuck(){

let cost =
Math.floor(

100*luck

);

if(coins>=cost){

coins-=cost;

luck += .1;

save();

updateUI();

}

}

function buyCoinBoost(){

let cost =
Math.floor(

150*coinBoost

);

if(coins>=cost){

coins-=cost;

coinBoost += .2;

save();

updateUI();

}

}

function save(){

localStorage.setItem(

"coins",

coins

);

localStorage.setItem(

"luck",

luck

);

localStorage.setItem(

"coinBoost",

coinBoost

);

localStorage.setItem(

"rolls",

rolls

);

localStorage.setItem(

"totalCoins",

totalCoins

);

localStorage.setItem(

"inventory",

JSON.stringify(

inventory

)

);

localStorage.setItem(

"highestRarity",

highestRarity

);

}

document

.getElementById(

"dice"

)

.addEventListener(

"click",

roll

);

updateUI();