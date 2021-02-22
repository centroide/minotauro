let fantasma: Sprite;
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
            } else if (lab[i][j] == PUERTA) {
                tiles.setTileAt(tiles.getTileLocation(i, j), assets.tile`
                    puerta
                `)
            }
            
        }
    }
}

function vecinos(c: number[]): number[][] {
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

function vecinos_no_visitados(c: number[]): number[][] {
    let todos : number[][] = []
    todos = vecinos(c)
    let no_visitados : number[][] = []
    no_visitados = []
    for (let h of todos) {
        if (!visitado[h[0]][h[1]]) {
            no_visitados.push(h)
        }
        
    }
    return no_visitados
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

function aleatorio_impar(abajo: number, arriba: number): number {
    let nai = randint(abajo, arriba)
    if (nai % 2 == 1) {
        return nai
    } else if (nai == arriba) {
        return nai - 1
    } else {
        return nai + 1
    }
    
}

function crea_laberinto(lab: number[][], visitado: boolean[][]) {
    let actual: number[];
    let vecinitos: number[][];
    let n: number;
    let sig: number[];
    let muro: number[];
    let pila : number[][] = []
    pila.push([aleatorio_impar(0, LADO - 1), aleatorio_impar(0, LADO - 1)])
    while (pila.length != 0) {
        actual = pila[pila.length - 1]
        visitado[actual[0]][actual[1]] = true
        vecinitos = vecinos_no_visitados(actual)
        if (vecinitos.length == 0) {
            pila.pop()
        } else {
            n = randint(0, vecinitos.length - 1)
            sig = vecinitos[n]
            muro = celda_enmedio(actual, sig)
            lab[muro[0]][muro[1]] = PASILLO
            pila.push(sig)
        }
        
    }
}

function crea_puerta(lab: number[][]) {
    let y: number;
    let x: number;
    if (borde == 0) {
        //  arriba
        y = 0
        x = aleatorio_impar(0, LADO - 1)
    } else if (borde == 1) {
        //  abajo
        y = LADO - 1
        x = aleatorio_impar(0, LADO - 1)
    } else if (borde == 2) {
        //  izquierda
        y = aleatorio_impar(0, LADO - 1)
        x = 0
    } else {
        //  derecha
        y = aleatorio_impar(0, LADO - 1)
        x = LADO - 1
    }
    
    lab[x][y] = PUERTA
}

function crea_cruz(lab: number[][], visitado: boolean[][]) {
    let muro: number[];
    let xmuro: number;
    let ymuro: number;
    let celda = [3, 3]
    let vecinitos : number[][] = []
    vecinitos = vecinos(celda)
    for (let v of vecinitos) {
        muro = celda_enmedio(celda, v)
        xmuro = muro[0]
        ymuro = muro[1]
        lab[xmuro][ymuro] = PASILLO
    }
}

namespace SpriteKind {
    export const fantasma = SpriteKind.create()
}

//  LADO impar máximo de 255
let LADO = 11
let MURO = 0
let PASILLO = 1
let PUERTA = 2
let NUM_FANTASMAS = 2
let borde = randint(0, 3)
let lab : number[][] = []
let visitado : boolean[][] = []
sprites.onOverlap(SpriteKind.Player, SpriteKind.fantasma, function choca_chup(s1: Sprite, s2: Sprite) {
    game.over()
})
scene.setBackgroundColor(3)
let teseo = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . f f f f f f . . . . .
    . . . f f e e e e f 2 f . . . .
    . . f f e e e e f 2 2 2 f . . .
    . . f e e e f f e e e e f . . .
    . . f f f f e e 2 2 2 2 e f . .
    . . f e 2 2 2 f f f f e 2 f . .
    . f f f f f f f e e e f f f . .
    . f f e 4 4 e b f 4 4 e e f . .
    . f e e 4 d 4 1 f d d e f f . .
    . . f e e e 4 d d d d f d d f .
    . . . . f e e 4 e e e f b b f .
    . . . . f 2 2 2 4 d d e b b f .
    . . . f f 4 4 4 e d d e b f . .
    . . . f f f f f f e e f f . . .
    . . . . f f . . . f f f . . . .
`, SpriteKind.Player)
for (let i = 0; i < NUM_FANTASMAS; i++) {
    fantasma = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
    `, SpriteKind.fantasma)
    fantasma.setPosition(aleatorio_impar(0, LADO - 1) * 16 + 8, aleatorio_impar(0, LADO - 1) * 16 + 8)
    fantasma.follow(teseo, 40)
}
teseo.setPosition(aleatorio_impar(0, LADO - 1) * 16 + 8, aleatorio_impar(0, LADO - 1) * 16 + 8)
controller.moveSprite(teseo)
teseo.setBounceOnWall(true)
//  mapa del tamaño máximo: 255x255
tiles.setTilemap(tilemap`level2`)
scene.cameraFollowSprite(teseo)
init_lab(lab, visitado)
crea_laberinto(lab, visitado)
crea_puerta(lab)
pinta_mosaicos(lab)
