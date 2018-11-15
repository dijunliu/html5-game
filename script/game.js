var game = {
    init:function (id) {
        game.canvas = document.getElementById(id);
        game.context = game.canvas.getContext('2d');
        //mouse.init(canvasid);
        loader.init();
        game.img = loader.loadImage('image/apple.png');
        box2d.init(id);
        box2d.createBox(game.canvas.width/2,game.canvas.height-15,700,30,true);
        box2d.createBox(100,100,100,120,false);
        box2d.createBox(80,100,100,120,false);
        box2d.createBox(90,10,10,120,false);
        box2d.createBox(100,110,100,120,false);
        game.sound = loader.loadSound('audio/bounce');
        loader.onload =  game.animate();
    },
    animate:function () {
        box2d.world.Step(1/60,8,3);
        box2d.world.ClearForces();
        box2d.world.DrawDebugData();
        game.draw();
        window.requestAnimationFrame(game.animate);
    },
    draw:function () {
        var body = box2d.world.GetBodyList();
        var x = body.GetPosition().x;
        var y = body.GetPosition().y;
        game.context.drawImage(game.img,x*box2d.scale-game.img.width/2,
                                y*box2d.scale-game.img.height/2);
    }
}