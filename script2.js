function maxscore(){
    const div = document.getElementById("max")
    const p = document.createElement("p")
    console.log(localStorage.getItem("max"));
    const text = document.createTextNode("the max score is: "+localStorage.getItem("max"))
    p.appendChild(text)
    div.appendChild(p)
}

function inStr(text, str) {
    for (let j = 0; j < str.length; j++) {
        let count = j
        let count2 = 0
        if (text[0] === str[j] && (str.length - j) >= text.length) {
            for (let t of text) {
                if (t === str[count]) {
                    count2++
                }
                count++
            }
            if (count2 === text.length) {
                return true
            }
        }
    }
    return false
}

function createPlayers() {
    const player1 = { sum: 0, currentScore: 0 }
    const player2 = { sum: 0, currentScore: 0 }
    return [player1, player2]
}

function stylePlayersPlay(texts,score){
     const collection = texts
     console.log(collection);
     collection.forEach((t)=>{
        t.classList.add("with")
     })
     console.log(score);
     score.classList.add("scoreBackround")
}

function stylePlayersNotPlay(texts,score){
     const collection = texts
     collection.forEach((t)=>{
        t.classList.remove("with")
     })
     score.classList.remove("scoreBackround")
}

function hand(player) {
    const images = ["pictures/dice1.png", "pictures/dice2.png", "pictures/dice3.png", "pictures/dice4.png", "pictures/dice5.png", "pictures/dice6.png"]
    const dice1 = document.querySelector("#dice1")
    const dice2 = document.querySelector("#dice2")
    const result1 = Math.floor(Math.random() * 6) + 1
    const result2 = Math.floor(Math.random() * 6) + 1
    const img1 = document.createElement("img")
    img1.src = images[result1 - 1]
    const img2 = document.createElement("img")
    img2.src = images[result2 - 1]
    img1.classList.add("font")
    img2.classList.add("font")
    dice1.innerHTML = ""
    dice1.appendChild(img1)
    dice2.innerHTML = ""
    dice2.appendChild(img2)
    if (result1 === result2) {
        return false
    }
    player.currentScore += result1 + result2

    return true
}

function checkifEnd(player) {
    if (player.sum+player.currentScore >= Number(localStorage.getItem("max"))) {
        return true
    }
}

function game() {
    const players = createPlayers()
    const player1 = players[0]
    const player2 = players[1]
    const divplayer1 = document.getElementById("player1")
    const divplayer2 = document.getElementById("player2")
    const isTurn = Math.floor(Math.random()*2)
    let turnplayer1
    let turnplayer2
    const tit1 = document.getElementById("tit1")
    const scu1 = document.getElementById("scu1")
    const divScoreP1 = document.getElementById("scoreP1")
    const divSunP1 = document.getElementById("sumP1")
    const tit2 = document.getElementById("tit2")
    const scu2 = document.getElementById("scu2")
    const divScoreP2 = document.getElementById("scoreP2")
    const divSunP2 = document.getElementById("sumP2")
    const scoreplayer1 = document.getElementById("scoreplayer1")
    const scoreplayer2 = document.getElementById("scoreplayer2")
    if(isTurn === 0){
        turnplayer1 = true
        turnplayer2 = false
        stylePlayersPlay([tit1,scu1,divScoreP1,divSunP1],scoreplayer1)
        divplayer1.classList.add("blue")
        divplayer2.classList.remove("blue")
    }else{
        turnplayer1 = false
        turnplayer2 = true
        stylePlayersPlay([tit2,scu2,divScoreP2,divSunP2],scoreplayer2)
        divplayer2.classList.add("blue")
        divplayer1.classList.remove("blue")
    }
    let game = true
    let counthands = 0
    let turn = true
    const roll = document.getElementById("roll")
    roll.addEventListener("click", () => {
        if (turnplayer1) {

            if (turn) {
                if (!hand(player1)) {
                    turn = false
                    player1.currentScore = 0
                }
                const text2 = document.createTextNode(String(player1.currentScore))
            
                
               
                divScoreP1.innerHTML = ""
                divScoreP1.appendChild(text2)
                counthands += 1
                if (checkifEnd(player1)) {
                    turnplayer1 = false
                    turnplayer2 = false
                    turn = false
                    const h1 = document.getElementById("end")
                    const text6 = document.createTextNode("player 1 is win!!")
                    h1.appendChild(text6)
                    divplayer1.classList.add("green")
                }
                if (counthands === 5) {
                    player1.sum += player1.currentScore
                    player1.currentScore = 0
                    turn = false
                    localStorage.setItem("player1", String(player1.sum))
                  
                    const text1 = document.createTextNode(String(player1.sum))
                    divSunP1.innerHTML = ""
                    divSunP1.appendChild(text1)
                }

            }

        } else {
            if (turn) {
                if (!hand(player2)) {
                    turn = false
                    player2.currentScore = 0
                }
                const text4 = document.createTextNode(String(player2.currentScore))
                const divScoreP2 = document.getElementById("scoreP2")
                divScoreP2.innerHTML = ""
                divScoreP2.appendChild(text4)
                counthands += 1
                if (checkifEnd(player2)) {
                    turnplayer1 = false
                    turnplayer2 = false
                    turn = false
                    const h1 = document.getElementById("end")
                    const text5 = document.createTextNode("player 2 is win!!")
                    h1.appendChild(text5)
                    divplayer2.classList.add("green")
                }
                if (counthands === 5) {
                    player2.sum += player2.currentScore
                    player2.currentScore = 0
                    turn = false
                    localStorage.setItem("player2", String(player2.sum))
                    const divSunP2 = document.getElementById("sumP2")
                    const text3 = document.createTextNode(String(player2.sum))
                    divSunP2.innerHTML = ""
                    divSunP2.appendChild(text3)
                }
            }

        }
    })
    const hold = document.getElementById("hold")
    hold.addEventListener("click", () => {
        if (turnplayer1) {
            stylePlayersNotPlay([tit1,scu1,divScoreP1,divSunP1],scoreplayer1)
            stylePlayersPlay([tit2,scu2,divScoreP2,divSunP2],scoreplayer2)
            divplayer2.classList.add("blue")
            divplayer1.classList.remove("blue")
            turnplayer1 = false
            turnplayer2 = true
            turn = true
            counthands = 0
        }
        else if (turnplayer2) {
            stylePlayersPlay([tit1,scu1,divScoreP1,divSunP1],scoreplayer1)
            stylePlayersNotPlay([tit2,scu2,divScoreP2,divSunP2],scoreplayer2)
            divplayer1.classList.add("blue")
            divplayer2.classList.remove("blue")
            turnplayer2 = false
            turnplayer1 = true
            turn = true
            counthands = 0
        }
    })


}
maxscore()
game()










