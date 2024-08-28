const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d') 

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height) //sets the canvas differenly //(0,0 is a coordinate)

const gravity = 0.5 //for falling

class Sprite { //this creates an object
    
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.jumpCount = 0
        this.maxJump = 3  
        this.isAttacking
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100, 
            height: 50 

         
        }
        this.color = color

    }

    draw() { //colors the character red 
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height) 
        
        if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
}

    update() { 
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= 576) {
            this.velocity.y = 0
            this.jumpCount = 0 
        } else {
        this.velocity.y += gravity
                
        }}

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
            }, 100)
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
    },
    
    offset: {
    x:0,
    y:0
    }
})


const enemy = new Sprite ({
    position:{
    x: 100, 
    y: 0,
},
    velocity:{
    x:0, 
    y: 0,
    },
    color: 'blue',
    
    offset: {
    x:-50,
    y:0
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


function rectangularCollision({
    rectangle1, rectangle2
}) {
    return (player.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
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
        player.velocity.x = -3
    } if (playerKeys.d.pressed && playerlastKey === 'd') {
        player.velocity.x = 3
    } 
    
    if (enemyKeys.ArrowLeft.pressed && enemylastKey === "ArrowLeft") {
        enemy.velocity.x = -3
    } if (enemyKeys.ArrowRight.pressed && enemylastKey === "ArrowRight") {
        enemy.velocity.x = 3
    }

    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy  
    }) &&   
        player.isAttacking) {
        player.isAttacking = false
        console.log("player attack")
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player  
    }) &&   
        enemy.isAttacking) {
        enemy.isAttacking = false
        console.log("enemy attack")
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
        case ' ':
            player.attack ()   
            break
        case 'ArrowDown': 
            enemy.attack ()
            break

    }

    
   
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
        //lol this is hard
        
    }

    

}) 