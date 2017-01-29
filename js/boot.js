var bootState = 
{
    preload: function()
    {
        game.stage.backgroundColor = "#474747";
        game.load.image('alien', 'images/alien.png');
        game.load.image('ship', 'images/ship.png');
        game.load.image('bullet', 'images/bullet.png');
    },
    
    create: function()
    {
        game.state.start('load');
    }
}