let coins = 0;
let luck = 1;
let coinMultiplier = 1;

// Rewards
const rewards = [
    {
        name: "Common Stone",
        rarity: "Common",
        weight: 60,
        base: 5,
        color: "#cccccc"
    },

    {
        name: "Rust Metal",
        rarity: "Uncommon",
        weight: 45,
        base: 10,
        color: "#7CFC00"
    },

    {
        name: "Magic Dust",
        rarity: "Rare",
        weight: 30,
        base: 20,
        color: "#00BFFF"
    },

    {
        name: "Ancient Relic",
        rarity: "Epic",
        weight: 15,
        base: 50,
        color: "#A020F0"
    },

    {
        name: "Dragon Core",
        rarity: "Legendary",
        weight: 6,
        base: 120,
        color: "#FF8C00"
    },

    {
        name: "Celestial Orb",
        rarity: "Mythic",
        weight: 2,
        base: 300,
        color: "#FF1493"
    },

    {
        name: "VOID ELEMENT",
        rarity: "Crystalic",
        weight: 1,
        base: 800,
        color: "#00FFFF"
    }
];

// Roll system
function roll() {

    let pool = [];

    rewards.forEach(item => {

        let adjustedWeight = Math.max(
            1,
            Math.floor(item.weight / luck)
        );

        for (let i = 0; i < adjustedWeight; i++) {
            pool.push(item);
        }
    });

    let result =
        pool[Math.floor(Math.random() * pool.length)];

    let earned =
        Math.floor(result.base * coinMultiplier);

    coins += earned;

    updateUI();

    document.getElementById("result").innerHTML = `
        You got:
        <span style="color:${result.color}">
        ${result.name} (${result.rarity})
        </span>
        <br>
        +${earned} coins
    `;
}

// Update UI
function updateUI() {
    document.getElementById("coins").innerText =
        "Coins: " + coins;
}

// Buy luck
function buyLuck() {

    if (coins >= 100) {

        coins -= 100;

        luck += 0.5;

        updateUI();

        alert("Luck increased!");
    }
}

// Buy coin multiplier
function buyCoinBoost() {

    if (coins >= 150) {

        coins -= 150;

        coinMultiplier += 0.5;

        updateUI();

        alert("Coin boost upgraded!");
    }
}

// Dice click
document
    .getElementById("dice")
    .addEventListener("click", roll);