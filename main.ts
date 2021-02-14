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
mySprite.setPosition(24, 24)
controller.moveSprite(mySprite)
mySprite.setBounceOnWall(true)
tiles.setTilemap(tilemap`
    level2
`)
scene.cameraFollowSprite(mySprite)
let LADO = 37
let MURO = 0
let PASILLO = 1
let lab : number[][] = []
function init_lab(lab: number[][]) {
    for (let i = 0; i < LADO; i++) {
        lab.push([])
        for (let j = 0; j < LADO; j++) {
            if (i % 2 == 0 || j % 2 == 0) {
                lab[i].push(MURO)
            } else {
                lab[i].push(PASILLO)
            }
            
        }
    }
}

function pinta_mosaicos(lab: number[][]) {
    for (let i = 0; i < LADO; i++) {
        for (let j = 0; j < LADO; j++) {
            if (lab[i][j] == MURO) {
                tiles.setTileAt(tiles.getTileLocation(i, j), sprites.builtin.brick)
                tiles.setWallAt(tiles.getTileLocation(i, j), true)
            }
            
        }
    }
}

init_lab(lab)
pinta_mosaicos(lab)
