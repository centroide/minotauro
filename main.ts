let MURO = 0
let lab : number[][] = []
scene.setBackgroundColor(3)
let mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . f f e e e e f 2 f . . . . 
            . . f f e e e e f 2 2 2 f . . . 
            . . f e e e f f e e e e f . . . 
            . . f f f f e e 2 2 2 2 e f . . 
            . . f e 2 2 2 f f f f e 2 f . . 
            . f f f f f f f e e e f f f . . 
            . f f e 4 4 e b f 4 4 e e f . . 
            . f e e 4 d 4 1 f d d e f . . . 
            . . f e e e e e d d d f . . . . 
            . . . . f 4 d d e 4 e f . . . . 
            . . . . f e d d e 2 2 f . . . . 
            . . . f f f e e f 5 5 f f . . . 
            . . . f f f f f f f f f f . . . 
            . . . . f f . . . f f f . . . .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setBounceOnWall(true)
tiles.setTilemap(tilemap`
    level2
`)
scene.cameraFollowSprite(mySprite)
let LADO = 8
let PASILLO = 1
function init_lab(lab: number[][]) {
    let m_o_p: number;
    for (let i = 0; i < LADO; i++) {
        lab.push([])
        for (let j = 0; j < LADO; j++) {
            m_o_p = randint(0, 1)
            if (m_o_p == 0) {
                lab[i].push(MURO)
            } else {
                lab[i].push(PASILLO)
            }
            
        }
    }
}

function pinta_mosaicos(lab: number[][]) {
    for (let k = 0; k < LADO; k++) {
        for (let l = 0; l < LADO; l++) {
            if (lab[k][l] == MURO) {
                tiles.setTileAt(tiles.getTileLocation(k, l), sprites.builtin.brick)
                tiles.setWallAt(tiles.getTileLocation(k, l), true)
            }
            
        }
    }
}

init_lab(lab)
pinta_mosaicos(lab)
