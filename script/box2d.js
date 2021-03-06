var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var box2d = {
    scale:30,
    init:function (Id) {
        var gravity = new b2Vec2(0,9.8);
        var allowSleep = true;
        box2d.world = new b2World(gravity,allowSleep);

        var debugContext = document.getElementById(Id).getContext('2d');
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(box2d.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);

        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.PostSolve = function(contact,impulse){
            var body1 = contact.GetFixtureA().GetBody();
            var body2 = contact.GetFixtureB().GetBody();
            var impulseAlongNormal = Math.abs(impulse.normalImpulses[0]);
            if(impulseAlongNormal>5){
                game.sound.play();
            }
        };
        box2d.world.SetContactListener(listener);
    },
    createCirce:function(x,y,r,isStatic){
        var bodyDef = new b2BodyDef();
        if(isStatic){
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }
        bodyDef.position.x = x/box2d.scale;
        bodyDef.position.y = y/box2d.scale;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 1;
        fixtureDef.restitution = 0.5;

        fixtureDef.shape = new b2CircleShape(r/box2d.scale);

        var body = box2d.world.CreateBody(bodyDef);
        //body.SetUserData();
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    },
    createBox:function (x,y,w,h,isStatic) {
        var bodyDef = new b2BodyDef();
        if(isStatic){
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }
        bodyDef.position.x = x/box2d.scale;
        bodyDef.position.y = y/box2d.scale;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1;
        fixtureDef.friction = 1;
        fixtureDef.restitution = 0.5;

        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(w/2/box2d.scale,h/2/box2d.scale);

        var body = box2d.world.CreateBody(bodyDef);
        //body.SetUserData();
        var fixture = body.CreateFixture(fixtureDef);
        return body;
    }
}