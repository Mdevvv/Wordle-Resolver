const CryptoJS = require("./crypto-js.min.js");

async function apimekoGames(series, games, resultIndex="champion_name") {
    
    for (const game of games) {
        const resp = await fetch(`https://${series}.apimeko.link/games/${game}/answer?utc=2`);
        if (!resp.ok) {
            console.error('internet error');
            return;
        }
    
        const encryptedData = await resp.text();
    
        const key = "QhDZJfngdx";
    
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    
        console.log(game + " : " + JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[resultIndex]);
    }

}
async function allDle() {
    const currentDate = new Date();
    console.log(`Result for today : (${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()})`);
    
    let all = [
        {series : "loldle", games : ["classic", "quote", "ability", "emoji", "splash"]},
        {series : "pokedle", games : ["classic", "card", "flavor", "silhouette"]},
        {series : "dotadle", games : ["classic", "quote", "ability", "loadingscreen"]},
        {series : "smashdle", games : ["classic", "silhouette", "kirby", "finalSmash", "emoji"]},
        {series : "onepiecedle", games : ["classic", "devilFruit", "wanted", "laugh"]},
        {series : "narutodle", games : ["classic", "quote", "jutsu", "eye" ]},
    ];
    for (const element of all) {
        console.log('\n' + element.series + ' :\n');
        await apimekoGames(element.series, element.games);
    }
}

allDle();