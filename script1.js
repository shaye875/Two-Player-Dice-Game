function saveMaxScore() {
    
    const input = document.getElementById("inputMax")
    const button = document.querySelector("#buttonMax")
    console.log(button);
    
    button.addEventListener("click", () => {
        localStorage.setItem("max", input.value)
        
    })
}
saveMaxScore()