var playState = 
{
    create: function()
    {
        this.enemiesArray = [];
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.spacebar;
	    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    this.escapeKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        this.ship = game.add.sprite(game.width / 2, game.height / 2 + 300, 'ship');
        this.ship.anchor.setTo(0.5, 0.5);
        this.ship.scale.setTo(0.4, 0.4);
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.enemy = game.add.sprite(game.width / 2, game.height / 2 - 300, 'alien');
        this.enemy.anchor.setTo(.5,.5);
        this.enemy.scale.setTo(0.4,0.4);
        game.time.events.loop(1000, this.spawnEnemy, this);
        game.time.events.loop(750, this.spawnEnemyBullet, this);
        
        game.physics.arcade.enable(this.ship, this.enemy, this.bullet, this.enemyBullet);
        
    },
        
    update: function()
    {
        this.enemy.x -= 2;
        if(this.cursor.left.isDown)
        {
            this.ship.x -= 7;
        }
        
        for(var a = 0; a < this.enemiesArray.length; a++)
        {
            this.enemiesArray[a].x -= 2;
        }
        
        if(this.escapeKey.isDown)
        {
            game.state.start('menu');
        }
        
        if(this.cursor.right.isDown)
        {
            this.ship.x += 7;
        }
        
        if(this.spacebar.isDown)
        {
            this.bullet = game.add.sprite(this.ship.x, this.ship.y, 'bullet');
            this.bullet.anchor.setTo(0.5,0.5);
            this.bullet.scale.setTo(0.2,0.2);
            game.physics.arcade.enable(this.bullet);
            this.bullet.body.velocity.y = -600;
            
            if(!this.bullet.inWorld)
            {
                this.bullet.kill();
            }
        }
        game.physics.arcade.overlap(this.enemyBullet,this.ship,this.gameOverOpenMenuScreen,null,this);
        game.physics.arcade.overlap(this.bullet,this.enemy,this.killenemy,null,this);
    },
    
    killenemy: function()
    {
        this.enemy.kill();
    },
    
    gameOverOpenMenuScreen: function()
    {
        game.state.start('menu');
    },
    
    spawnEnemy: function()
    {
        this.enemy = game.add.sprite(Math.random()*game.width, game.height / 2 - 300, 'alien');
        this.enemy.anchor.setTo(.5,.5);
        this.enemy.scale.setTo(0.4,0.4);
        
        this.enemiesArray.push(this.enemy);
    },
    
    spawnEnemyBullet: function()
    {
        for(var i = 0; i < this.enemiesArray.length; i++)
        {
            this.enemyBullet = game.add.sprite(this.enemiesArray[i].x, this.enemiesArray[i].y, 'bullet');
            this.enemyBullet.anchor.setTo(0.5,0.5);
            this.enemyBullet.scale.setTo(0.2,0.2);
            this.enemyBullet.angle = 180;
            game.physics.arcade.enable(this.enemyBullet);
            this.enemyBullet.body.velocity.y = 600;
        }
    }
}