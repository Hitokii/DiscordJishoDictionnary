/**
 * @name Jisho
 * @author Hitokii
 * @description Use Jisho.org ang google translate into discord
 * @version 0.2.0
 */

let react = BdApi.React


module.exports = class JishoPlugin {
    start() {
        console.clear()
        const toolbar = document.querySelector(".toolbar-3_r2xA")
        const messagemenu = document.querySelectorAll("div[aria-label='Actions des messages']")
        const myButton = document.createElement("button");
        // const messagelist = document.querySelectorAll("[id*='chat-messages-']")


        BdApi.UI.createTooltip(myButton, "Jisho", { side: "bottom" })
        myButton.innerHTML = "<?xml version='1.0' encoding='UTF - 8'?><!DOCTYPE svg PUBLIC ' -//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='mdi-syllabary-hiragana' width='24' height='24' viewBox='0 0 24 24'><path d='M9 4V6H6V8H9V10C6.25 10 4 12.27 4 15.03C4 17.8 6.26 20.06 9.03 20.06C9.89 20.06 10.72 19.77 11.4 19.26C11.63 19.54 11.88 19.82 12.15 20.09L13.56 18.67C13.3 18.42 13.07 18.15 12.86 17.89L13.86 16.89C14.93 15.82 15.78 14.23 16.42 12.59C17.31 13.11 18 13.9 18 15C18 16.32 17.47 17.6 16.54 18.54L17.95 19.95C19.26 18.64 20 16.86 20 15C20 13.04 18.82 11.36 17.15 10.55L17.5 9.29L15.55 8.78L15.21 10.05C15.13 10.05 15.06 10 14.97 10H11V8H16V6H11V4M11 12H14.5C13.94 13.37 13.19 14.72 12.44 15.47L11.79 16.13C11.25 14.93 11 13.59 11 12M9 12C9 14.07 9.41 15.94 10.3 17.59C9.94 17.89 9.5 18.06 9.03 18.06C7.33 18.06 6 16.73 6 15.03C6 13.34 7.32 12 9 12Z' /></svg>"
        myButton.style.backgroundColor = "transparent"
        myButton.style.fill = "#b5bac1"
        myButton.style.transform = "translateY(2px)"
        myButton.addEventListener("mouseenter", () => {
            myButton.style.fill = "#dbdee1"
        });
        myButton.addEventListener("mouseleave", () => {
            myButton.style.fill = "#b5bac1"
        });

        const myTest = react.createElement('input', {
            placeholder: 'Entrer un Kanji',
            id: 'KanjiInputNode',
            style: {
                textAlign: "center",
                boxSizing: "border-box",
                padding: "10px",
                color: "#000",
                fontFamily: "Noto Sans Japanese",
                fontSize: "20px",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }
        });

        myButton.addEventListener("click", () => {
            BdApi.UI.showConfirmationModal("Dictionnaire", myTest, {
                onConfirm: () => {
                    let kanji_value = document.querySelector("#KanjiInputNode").value
                    let kanji_code = encodeURIComponent(kanji_value)
                    kanji_code = kanji_code.replaceAll("%", "%25", "y")
                    console.log(kanji_code)
                    let url = `https://corsproxy.io/?https://jisho.org/api/v1/search/words?keyword=${kanji_code}`

                    fetch(url).then(data => data.json()).then(data => {
                        let result = data.data[0]
                        let embed = react.createElement("div", {
                            style: {
                                boxSizing: "border-box",
                                backgroundColor: "#36393f",
                                borderRadius: "5px",
                                padding: "10px",
                                color: "#fff",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }
                        },
                            [react.createElement("p", {}, result.senses[0].english_definitions.join(", ")),
                            react.createElement("p", {}, `JLPT : ${result.jlpt.join(", ")}`)
                            ]
                        );

                        BdApi.UI.alert(
                            `resultat pour : ${result.slug}, lecture : ${result.japanese[0].reading}`,
                            embed
                        )
                    })
                }
            });
        });


        toolbar.insertBefore(myButton, toolbar.childNodes[4])





        // This part re-adds it when removed
        BdApi.DOM.onRemoved(toolbar, async () => {
            this.start()
        });
    }

    stop() {
        // Called when the plugin is deactivated
        const toolbar = document.querySelector(".toolbar-3_r2xA")
        toolbar.removeChild(toolbar.childNodes[4])
    }
}