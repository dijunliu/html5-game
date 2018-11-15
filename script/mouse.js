var mouse = {
    x:0,
    y:0,
    down:false,
    init:function(canvasId){
        $('#'+canvasId).mousemove(mouse.mousemovehandler);
        $('#'+canvasId).mousedown(mouse.mousedownhandler);
        $('#'+canvasId).mouseup(mouse.mouseuphandler);
        $('#'+canvasId).mouseout(mouse.mouseuphandler);
        mouse.offset =   $('#'+canvasId).offset();
    },
    mousemovehandler:function(ev){
        mouse.x = ev.pageX - mouse.offset.left;
        mouse.y = ev.pageY - mouse.offset.top;

        if (mouse.down) {
            mouse.dragging = true;
        }
    },
    mousedownhandler:function(ev){
        mouse.down = true;
        mouse.downX = mouse.x;
        mouse.downY = mouse.y;
        ev.originalEvent.preventDefault();

    },
    mouseuphandler:function(ev){
        mouse.down = false;
        mouse.dragging = false;
    }
}