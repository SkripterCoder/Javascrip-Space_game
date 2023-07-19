// Get container and player
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');

// Player Position
let playerX = 375;
// Speed
let playerSpeed = 20;

// Player left and Right Functionality
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (event.key === 'ArrowRight' && playerX < gameContainer.offsetWidth - player.offsetWidth) {
        playerX += playerSpeed;
    }
    if (event.key === ' ') { 
        event.preventDefault;
        shootBullet();
    }
});

// Create Random Enemy
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';

    const enemyX = Math.random() * (gameContainer.offsetWidth - 50);
    const enemyY = -50; // Start from the top

    enemy.style.left = enemyX + 'px';
    enemy.style.top = enemyY + 'px';

    gameContainer.appendChild(enemy);

    animateEnemy(enemy);
}

// Animate Enemy
function animateEnemy(enemy) {
    const targetY = gameContainer.offsetHeight;
    const speed = Math.random() * 2 + 1;

    function update() {
        const posY = enemy.offsetTop;
        const newY = posY + speed;

        if (newY < targetY) {
            enemy.style.top = newY + 'px';
            requestAnimationFrame(update);

            // Check collision with bullet
            const bullets = document.getElementsByClassName('bullet');
            for (let i = 0; i < bullets.length; i++) {
                const bullet = bullets[i];
                if (isCollision(bullet, enemy)) {
                    enemy.remove();
                    bullet.remove();
                    break;
                }
            }
        } else {
            enemy.remove();
        }
    }

    requestAnimationFrame(update);
}


//Shoot bullet 
function shootBullet() { 
    const bullet = document.createElement('div')
    bullet.className = 'bullet'
    bullet.style.left = player.offsetLeft + player.offsetWidth / 2 + 'px';
    bullet.style.top = player.offsetTop - 10 + 'px';

    gameContainer.appendChild(bullet)

    animateBullet(bullet)
}

// Animate bullet
function animateBullet(bullet) { 
    const speed = 5;
    function update() {
        const posY = bullet.offsetTop;
        const newY = posY - speed;

        if (newY > 0) {
            bullet.style.top = newY + 'px'
            requestAnimationFrame(update)
        } else { 
            bullet.remove()
        }
    }

    requestAnimationFrame(update)
}

//Collision

function isCollision(obj1,obj2) { 
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right 
    );
}


// Interval to Create Random Enemies
setInterval(createEnemy, 2000); // Adjust the interval duration as desired (in milliseconds)

// Update the game function
function updateGame() {
    player.style.left = playerX + 'px';
    requestAnimationFrame(updateGame);
}
updateGame();
