
scene.set_background_color(3)
mySprite = sprites.create(img("""
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
"""),
    SpriteKind.player)
mySprite.set_position(24, 24)
controller.move_sprite(mySprite)
mySprite.set_bounce_on_wall(True)
tiles.set_tilemap(tilemap("""
    level2
"""))
scene.camera_follow_sprite(mySprite)

LADO=37
MURO=0
PASILLO=1
lab: List[List[number]] = []
visitado: List[List[bool]] = []

def init_lab (lab:List[List[number]], visitado:List[List[bool]]):
    for i in range(LADO):
        lab.append([])
        visitado.append([])
        for j in range(LADO):
            if i%2==0 or j%2==0:
                lab[i].append(MURO)
                visitado[i].append(True)
            else:
                lab[i].append(PASILLO)
                visitado[i].append(False)

def pinta_mosaicos(lab:List[List[number]]):
    for i in range(LADO):
        for j in range(LADO):
            if lab[i][j]==MURO:
                tiles.set_tile_at(tiles.get_tile_location(i, j), sprites.builtin.brick)
                tiles.set_wall_at(tiles.get_tile_location(i, j), True)
            elif lab[i][j]==PASILLO:
                tiles.set_tile_at(tiles.get_tile_location(i, j), sprites.dungeon.dark_ground_center)

def vecinos(c):
    v=[]
    x=c[0]
    y=c[1]
    if x-2>0:
        v.append((x-2,y))
    if y+2<LADO:
        v.append((x,y+2))
    if x+2<LADO:
        v.append((x+2,y))
    if y-2>0:
        v.append((x,y-2))
    return v

def celda_enmedio(c1,c2):
    x1= c1[0]
    y1= c1[1]
    x2= c2[0]
    y2= c2[1]
    if y1==y2:
        y=y1
        if x2<x1:
            x=x1-1
        else:
            x=x1+1
    else:
        x=x1
        if y2<y1:
            y=y1-1
        else:
            y=y1+1
    return (x,y)

def crea_laberinto(lab:List[List[number]], visitado:List[List[bool]]):
    celda=(3,3)
    vecinitos=vecinos(celda)
    for v in vecinitos:
        muro=celda_enmedio(celda,v)
        xmuro= muro[0]
        ymuro= muro[1]
        lab[xmuro][ymuro]=PASILLO


init_lab(lab, visitado)
crea_laberinto(lab, visitado)
pinta_mosaicos(lab)
