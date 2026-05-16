let coins = Number(localStorage.getItem("coins")) || 0;
let luck = Number(localStorage.getItem("luck")) || 1;
let coinMultiplier =
    Number(localStorage.getItem("coinMultiplier")) || 1;

let totalRolls =
    Number(localStorage.getItem("totalRolls")) || 0;

// Rewards
const rewards = [

    {
        name: "Common Stone",
        rarity: "Common",
        chance: 40,
        base: 5,
        color: "#cccccc"
    },

    {
        name: "Rust Metal",
        rarity: "Uncommon",
        chance: 25,
        base: 10,
        color: "#7CFC00"
    },

    {
        name: "Magic Dust",
        rarity: "Rare",
        chance: 15,
        base: 25,
        color: "#00BFFF"
    },

    {
        name: "Ancient Relic",
        rarity: "Epic",
        chance: 10,
        base: 60,
        color: "#A020F0"
    },

    {
        name: "Dragon Core",
        rarity: "Legendary",
        chance: 6,
        base: 150,
        color: "#FF8C00"
    },

    {
        name: "Celestial Orb",
        rarity: "Mythic",
        chance: 3,
        base: 400,
        color: "#FF1493"
    },

    {
        name: "VOID ELEMENT",
        rarity: "Crystalic",
        chance: 0.9,
        base: 1000,
        color: "#00FFFF"
    },

    {
        name: "GALAXY GOD",
        rarity: "Impossible",
        chance: 0.1,
        base: 5000,
        color: "#ff0000"
    }
];

// Roll
function roll() {

    const dice = document.getElementById("dice");

    dice.classList.add("rolling");

    setTimeout(() => {
        dice.classList.remove("rolling");
    }, 400);

    let random = Math.random() * 100;

    let current = 0;
    let result = rewards[0];

    for (let item of rewards) {

        current += item.chance * luck;

        if (random <= current) {
            result = item;
            break;
        }
    }

    let earned =
        Math.floor(result.base * coinMultiplier);

    coins += earned;

    totalRolls++;

    document.getElementById("result").innerHTML = `
        You got:
        <span style="color:${result.color}">
        ${result.name} (${result.rarity})
        </span>
        <br>
        +${earned} coins
    `;

    saveGame();
    updateUI();
}

// UI
function updateUI() {

    document.getElementById("coins").innerText =
        `Coins: ${coins}`;

    document.getElementById("stats").innerText =
        `Luck: ${luck.toFixed(1)} | Coin Boost: x${coinMultiplier.toFixed(1)} | Rolls: ${totalRolls}`;
}

// Save
function saveGame() {

    localStorage.setItem("coins", coins);
    localStorage.setItem("luck", luck);
    localStorage.setItem("coinMultiplier", coinMultiplier);
    localStorage.setItem("totalRolls", totalRolls);
}

// Buy luck
function buyLuck() {

    let cost = 100;

    if (coins >= cost) {

        coins -= cost;

        luck += 0.1;

        saveGame();
        updateUI();
    }
}

// Buy multiplier
function buyCoinBoost() {

    let cost = 150;

    if (coins >= cost) {

        coins -= cost;

        coinMultiplier += 0.2;

        saveGame();
        updateUI();
    }
}

// Click dice
document
    .getElementById("dice")
    .addEventListener("click", roll);

updateUI();