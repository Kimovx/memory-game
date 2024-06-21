// Select The Big Container
let bigContainer = document.querySelector(".container");

// Select Game blocks Element
let gameBlockEle = document.querySelector(".memory-game-container");

// Select List of Backs
let backList = Array.from(document.querySelectorAll(".back"));

// Select name Span
let nameSpan = document.querySelector(".name");

// get Audio Elements 
let startVoice = document.getElementById("start");
let musicVoice = document.getElementById("music");
let rightVoice = document.getElementById("right");
let wrongVoice = document.getElementById("wrong");
let completeVoice = document.getElementById("complete");

// Remove with fade fnuction
function removeWithFade(ele1, ele2, time){
    ele1.classList.add("fade-out");
    ele2.classList.add("fade-out");
    setTimeout(()=>{
        ele1.remove();
        ele2.remove();
    },time);
}

let user={
    name:undefined,
    triesCount: 0,
};


// Set Name Function 
function nameTakerPopUp(){
    let messegeContainer = document.createElement("div");
    let nameInput  =  document.createElement("form");
    let enterText  = document.createElement("h2");
    let inputValue = document.createElement("input");
    let submitBtn  = document.createElement("button");
    submitBtn.innerHTML = "Enter";
    
    // Black Screen To Hide Backgrounnd 
    let blackScreen = document.createElement("div");
    blackScreen.className = "black-screen";
    bigContainer.before((blackScreen));

    messegeContainer.classList.add("messege-container") ;
    enterText.appendChild(document.createTextNode("Enter your First Name"));
    nameInput.appendChild(enterText);
    nameInput.appendChild(inputValue);
    nameInput.appendChild(submitBtn);
    messegeContainer.appendChild(nameInput);
    bigContainer.before((messegeContainer));
    bigContainer.classList.add("low-opacity");

        submitBtn.onclick = function(){
            if(inputValue.value.length > 0 ){
                nameSpan.innerHTML = inputValue.value;
                user.name = inputValue.value;
                
                removeWithFade(messegeContainer,blackScreen,500);
                bigContainer.style.opacity =`1`;      
                
                setTimeout(()=>{showAll();},500);
                startVoice.play();
                setTimeout(()=>{musicVoice.play()},700);
            } else {
                inputValue.classList.add("wrong-shake");
                setTimeout(()=>{inputValue.classList.remove("wrong-shake");},400);
                wrongVoice.play();
            }
            nameInput.onsubmit = ()=>{return false};
        }
}
nameTakerPopUp();

// Select Game Block Element
let gameBlockArr = Array.from(document.querySelectorAll(".game-block"));

// Make Start Function 
function showAll() {
    gameBlockArr.forEach((ele)=>{
        ele.classList.add("rotated");
    })
    setTimeout(()=>{
        gameBlockArr.forEach((ele)=>{
            ele.classList.remove("rotated");
        });
    },1000)
};

// Create Arr Have a Lenght of game Blocks
let randomRange = Array.from(Array(gameBlockArr.length).keys());


function shuffleRange(arr){
    let currnentIndex = arr.length;
    
    while (currnentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * currnentIndex),
        temp;
        currnentIndex-- ;  
        temp = arr[currnentIndex];
        arr[currnentIndex] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
};

function shuffleElements(arr){
    arr.forEach((ele, index)=>{
        ele.style.order = randomRange[index];
    });
};
shuffleRange(randomRange);
shuffleElements(gameBlockArr);

// Show back For Block function
function showBack(element) {
    element.classList.add("rotated");
};

// Hide back For Block function
function removeRotated(element) {
    element.classList.remove("rotated");
};

// Add Match Class
function addMatch(element){
    element.classList.add("match");
}

let matches= 0;
// Flipped if clicked
gameBlockArr.forEach((block)=>{
    block.addEventListener("click", ()=>{
        showBack(block);
        Cheker();
    });
});

let triesCounter = 0;
let triesEle = document.querySelector(".tries-number");
triesEle.innerHTML= 0

function Cheker(){
    let flippedBlocks = Array.from(document.querySelectorAll(".rotated"));

    if (flippedBlocks.length === 2){
        gameBlockEle.classList.add("no-click");    
        setTimeout(()=>{
            gameBlockEle.classList.remove("no-click");
        },1000);

        if (flippedBlocks[0].dataset.type === flippedBlocks[1].dataset.type ){
            removeRotated(flippedBlocks[0]);
            removeRotated(flippedBlocks[1]);
            
            addMatch(flippedBlocks[0]);
            addMatch(flippedBlocks[1]);
            rightVoice.play();
            matches++;
            if (matches === 10){
                completeVoice.play();
                musicVoice.pause()
            }
        } else {
            setTimeout(()=>{
                removeRotated(flippedBlocks[0]);
                removeRotated(flippedBlocks[1]);
                triesEle.innerHTML= +(triesEle.innerHTML)+ 1; 
                wrongVoice.play();
            },1000)
            user.triesCount = triesEle.innerHTML ;
            localStorage.setItem(`${user.name}`,JSON.stringify(user));
        };  
    };
}