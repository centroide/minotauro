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
mySprite.setPosition(56, 56)
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
let visitado : boolean[][] = []
function init_lab(lab: number[][], visitado: boolean[][]) {
    for (let i = 0; i < LADO; i++) {
        lab.push([])
        visitado.push([])
        for (let j = 0; j < LADO; j++) {
            if (i % 2 == 0 || j % 2 == 0) {
                lab[i].push(MURO)
                visitado[i].push(true)
            } else {
                lab[i].push(PASILLO)
                visitado[i].push(false)
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
            } else if (lab[i][j] == PASILLO) {
                tiles.setTileAt(tiles.getTileLocation(i, j), sprites.dungeon.darkGroundCenter)
            }
            
        }
    }
}

function vecinos(c: number[]) {
    let v = []
    let x = c[0]
    let y = c[1]
    if (x - 2 > 0) {
        v.push([x - 2, y])
    }
    
    if (y + 2 < LADO) {
        v.push([x, y + 2])
    }
    
    if (x + 2 < LADO) {
        v.push([x + 2, y])
    }
    
    if (y - 2 > 0) {
        v.push([x, y - 2])
    }
    
    return v
}

function celda_enmedio(c1: number[], c2: number[]): number[] {
    let y: number;
    let x: number;
    let x1 = c1[0]
    let y1 = c1[1]
    let x2 = c2[0]
    let y2 = c2[1]
    if (y1 == y2) {
        y = y1
        if (x2 < x1) {
            x = x1 - 1
        } else {
            x = x1 + 1
        }
        
    } else {
        x = x1
        if (y2 < y1) {
            y = y1 - 1
        } else {
            y = y1 + 1
        }
        
    }
    
    return [x, y]
}

function crea_laberinto(lab: number[][], visitado: boolean[][]) {
    let muro: number[];
    let xmuro: number;
    let ymuro: number;
    let celda = [3, 3]
    let vecinitos = []
    vecinitos = vecinos(celda)
    for (let v of vecinitos) {
        muro = celda_enmedio(celda, v)
        xmuro = muro[0]
        ymuro = muro[1]
        lab[xmuro][ymuro] = PASILLO
    }
}

init_lab(lab, visitado)
crea_laberinto(lab, visitado)
pinta_mosaicos(lab)
