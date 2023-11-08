/**
 * @name Ruby
 * @author Hitoki
 * @description Translate kanji to hiragana. Made for japanese learner !
 * @version 0.1.5
 * @website https://Hitoki.dev/
 */

module.exports = class Ruby {
    start() {

        for (const i in document.querySelectorAll("[id*='message-content-']")) {
            const element = document.querySelectorAll("[id*='message-content-']")[i];
            var message = String(element.innerText);
            var regex = /[\p{Script=Han}]+/gu;

            if (!message.match(regex) || message.includes("ruby")) continue; // skip if no kanji or already translated

            let kanjis = Array.from(message.matchAll(regex), match => match[0])
            let furigana = [];
            kanjis.forEach(kanji => {
                var message = String(element.innerText);
                fetch(`https://corsproxy.io/?https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(kanji).replaceAll("%", "%25", "y")}`).then(data => data.json()).then(data => {
                    furigana.push(data.data[0].japanese[0].reading)
                    if (furigana.length == kanjis.length) {
                        furigana.forEach((f, x) => {
                            message = message.replace(kanjis[x], `<ruby>${kanjis[x]}<rt>${f}</rt></ruby>`)
                            if (x == furigana.length - 1)
                                element.innerHTML = message
                        })
                    }
                })
            })




        }
    }

    stop() {
        // Called when the plugin is deactivated
    }
}