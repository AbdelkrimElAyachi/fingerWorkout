
// Function to shuffle an array using Fisher-Yates shuffle algorithm
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export async function getPhrases(qunatity, title, language = "eng") {

    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=${qunatity}&exlimit=1&titles=${title}&explaintext=1&format=json&formatversion=2&origin=*`)
    const data = await res.json();
    const text = data.query.pages[0].extract;
    const words = text.match(/[A-Za-z0-9\u0600-\u06FF]+/g);

    const shuffledWords = shuffleArray(words);

    let phrases = [];
    let i = 0;
    while (i < shuffledWords.length) {
        i = i + 12
        phrases.push(shuffledWords.slice(i, i + 12).join(" "));
    }

    return phrases;
}
