



function createPlayers() {
    const player1 = { sum: 0, currentScore: 0 }
    const player2 = { sum: 0, currentScore: 0 }
    return [player1, player2]
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
    let turnplayer = ""
    let turnplayer1 = true
    let turnplayer2 = false
    let game = true
    let counthands = 0
    let turn = true
    divplayer1.classList.add("blue")
    divplayer2.classList.remove("blue")
    const roll = document.getElementById("roll")
    roll.addEventListener("click", () => {
        if (turnplayer1) {
            if (turn) {
                if (!hand(player1)) {
                    turn = false
                }
                const text2 = document.createTextNode(String(player1.currentScore))
                const divScoreP1 = document.getElementById("scoreP1")
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
                }
                if (counthands === 5) {
                    player1.sum += player1.currentScore
                    turn = false
                    localStorage.setItem("player1", String(player1.sum))
                    const divSunP1 = document.getElementById("sumP1")
                    const text1 = document.createTextNode(String(player1.sum))
                    divSunP1.innerHTML = ""
                    divSunP1.appendChild(text1)
                }

            }

        } else {
            if (turn) {
                if (!hand(player2)) {
                    turn = false
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
                }
                if (counthands === 5) {
                    player2.sum += player2.currentScore
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
            divplayer2.classList.add("blue")
            divplayer1.classList.remove("blue")
            turnplayer1 = false
            turnplayer2 = true
            turn = true
            counthands = 0
        }
        else if (turnplayer2) {
            divplayer1.classList.add("blue")
            divplayer2.classList.remove("blue")
            turnplayer2 = false
            turnplayer1 = true
            turn = true
            counthands = 0
        }
    })


}
game()










