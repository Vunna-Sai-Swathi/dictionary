
/*const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result=document.getElementById("result");
const sound=document.getElementById("sound");
const btn=document.getElementById("search-btn");
btn.addEventListener("click",()=>{
    let inpword=document.getElementById("inp-word").value;
    fetch(`${url}${inpword}`).then((response)=>response.json()).then((data)=>{
        console.log(data);
        result.innerHTML=`
         <div class="word">
                <h3>${inpword}</h3>
                <button onclick="playSound()" >
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example"> 
            ${data[0].meanings[0].definitions[0].example || ""}
            </p>
      `;
      sound.setAttribute("src",`https:${data[0].phonetics[0].audio}`);
      
    })
    .catch(()=>{
        result.innerHTML=`<h4>couldn't find word</h4>`
    });
});
function playSound(){
    sound.play();
}*/
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpword = document.getElementById("inp-word").value;
    fetch(`${url}${inpword}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const phonetics = data[0].phonetics.find(p => p.audio); // Find a phonetic object that has audio

            result.innerHTML = `
                <div class="word">
                    <h3>${inpword}</h3>
                    <button onclick="playSound()" ${phonetics ? '' : 'disabled'}>
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ''}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>
            `;

            if (phonetics && phonetics.audio) {
                sound.setAttribute("src", phonetics.audio); // Set audio source
            } else {
                sound.setAttribute("src", ""); // Clear the audio source if not available
            }
        })
        .catch(() => {
            result.innerHTML = `<h4>Couldn't find word</h4>`;
        });
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play(); // Play the audio if the source is set
    }
}
