MURO = 0
lab: List[List[number]] = []
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
controller.move_sprite(mySprite)
mySprite.set_bounce_on_wall(True)
tiles.set_tilemap(tilemap("""
    level2
"""))
scene.camera_follow_sprite(mySprite)
LADO = 8
PASILLO = 1
def init_lab(lab: List[List[number]]):
    for i in range(LADO):
        lab.append([])
        for j in range(LADO):
            m_o_p = randint(0, 1)
            if m_o_p == 0:
                lab[i].append(MURO)
            else:
                lab[i].append(PASILLO)
def pinta_mosaicos(lab: List[List[number]]):
    for k in range(LADO):
        for l in range(LADO):
            if lab[k][l] == MURO:
                tiles.set_tile_at(tiles.get_tile_location(k, l), sprites.builtin.brick)
                tiles.set_wall_at(tiles.get_tile_location(k, l), True)
init_lab(lab)
pinta_mosaicos(lab)