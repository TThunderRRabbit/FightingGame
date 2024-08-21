const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d') 

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) //sets the canvas differenly //(0,0 is a coordinate)

const gravity = 0.2 //for falling

class Sprite { //this creates an object
    
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.jumpCount = 0
        this.maxJump = 3  
    
    }

    draw() { //colors the character red 
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() { 
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= 576) {
            this.velocity.y = 0
            this.jumpCount = 0 
        } else {
        this.velocity.y += gravity
                
        }

    }
}


const player = new Sprite ({
    position:{
    x:0, 
    y: 0
},
    velocity:{
    x:0,
    y: 0,
    }})


const enemy = new Sprite ({
    position:{
    x: 100, 
    y: 0,
},
    velocity:{
    x:0,
    y: 0,
    }})


console.log(player)
let playerlastKey;
let enemylastKey; 

const playerKeys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

const enemyKeys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animate () {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0 
    if (playerKeys.a.pressed && playerlastKey === "a") {
        player.velocity.x = -1
    } if (playerKeys.d.pressed && playerlastKey === 'd') {
        player.velocity.x = 1
    } 
    
    if (enemyKeys.ArrowLeft.pressed && enemylastKey === "ArrowLeft") {
        enemy.velocity.x = -1
    } if (enemyKeys.ArrowRight.pressed && enemylastKey === "ArrowRight") {
        enemy.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
            playerKeys.d.pressed = true
            playerlastKey = 'd' 
            break
        case 'a':
            playerKeys.a.pressed = true
            playerlastKey = 'a' 
            break
        case 'w':
            if (player.jumpCount < player.maxJump) {
                player.velocity.y = -10; 
                player.jumpCount ++; 
            }
            break
        case 'ArrowRight':
            enemyKeys.ArrowRight.pressed = true
            enemylastKey = 'ArrowRight' 
            break
        case 'ArrowLeft':
            enemyKeys.ArrowLeft.pressed = true
            enemylastKey = 'ArrowLeft' 
            break
        case 'ArrowUp':
            if (enemy.jumpCount < enemy.maxJump) {
                enemy.velocity.y = -10
                enemy.jumpCount ++;
            }
            break
        
        

    }

    
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            playerKeys.d.pressed = false 
            break
        case 'a':
            playerKeys.a.pressed = false  
            break
        case 'w':
            playerKeys.w.pressed = false  
            break
        case 'ArrowLeft':
            enemyKeys.ArrowLeft.pressed = false 
            break
        case 'ArrowRight':
            enemyKeys.ArrowRight.pressed = false  
            break
        case 'ArrowUp':
            enemyKeys.ArrowUp.pressed = false  
            break
        
        
    }

    
    console.log(event.key)
}) 