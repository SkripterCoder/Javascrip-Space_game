//Get container and player
const gameContainer = document.getElementById('game-container')
const player = document.getElementById('player')

//Player Position
let playerX = 375
//Speed
let playerSpeed = 20
// Player left and Right Functionality
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerX > 0) {
        playerX -= playerSpeed
    }
    if (event.key === 'ArrowRight' && playerX < gameContainer.offsetWidth - player.offsetWidth) { 
        playerX += playerSpeed
    }
})

//Update the game function
function updateGame() {
    player.style.left = playerX + 'px'
    requestAnimationFrame(updateGame)
}
updateGame()