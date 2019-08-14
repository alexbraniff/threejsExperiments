function GLOBAL()
{
    // Keep track of window size; update in this.windowResize()
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    // For easy color reference GLOBAL/this.<color>
    this.WHITE = new COLOR(0xff, 0xff, 0xff);
    this.LIGHT_GREY = new COLOR(0xc3, 0xc3, 0xc3);
    this.DARK_GREY = new COLOR(0x3c, 0x3c, 0x3c);
    this.YELLOW = new COLOR(0xe8, 0xf0, 0x07);
    this.GREEN = new COLOR(0x5b, 0xb1, 0x2f);
    this.PURPLE = new COLOR(0x9b, 0x53, 0x9c);
    this.PINK = new COLOR(0xeb, 0x65, 0xa0);
    this.BLUE = new COLOR(0x73, 0xc5, 0xe1);

    // These act as my constants
    this.STD =
    {
        COLOR:
        {
            TEXT:
            {
                DEFAULT:this.DARK_GREY,
                WHITE:this.WHITE,
                LIGHT_GREY:this.LIGHT_GREY,
                DARK_GREY:this.DARK_GREY,
                YELLOW:this.YELLOW,
                GREEN:this.GREEN,
                PURPLE:this.PURPLE,
                PINK:this.PINK,
                BLUE:this.BLUE
            },
            BACKGROUND:
            {
                DEFAULT:this.WHITE,
                WHITE:this.WHITE,
                LIGHT_GREY:this.LIGHT_GREY,
                DARK_GREY:this.DARK_GREY,
                YELLOW:this.YELLOW,
                GREEN:this.GREEN,
                PURPLE:this.PURPLE,
                PINK:this.PINK,
                BLUE:this.BLUE
            },
            MOUSE:
            {
                OVER:this.PINK
            }
        },
        SIZE:
        {
            // true values are 100%
            // so it should be calculated
            // in the function that needs dimensions
            NAVIGATION:
            {
                width:true,
                height:75
            },
            CONTEXT_MENU:
            {
                width:200,
                height:true
            },
            VIEWPORT:
            {
                width:true,
                height:true
            }
        },
        DIRECTION:
        {
            UP:new MOUSE_DIRECTION("UP", -1),
            DOWN:new MOUSE_DIRECTION("DOWN", 1),
            LEFT:new MOUSE_DIRECTION("LEFT", -2),
            RIGHT:new MOUSE_DIRECTION("RIGHT", 2)
        },
        TICK:
        {
            MILLISECONDS:10
        }
    }

    this.NAVIGATION = new NAVIGATION();
    this.CONTEXT_MENU = new CONTEXT_MENU();
    this.VIEWPORT = new VIEWPORT();
    this.VIEWPORT.setGlobal(this);

    this.GRID = undefined;
    this.GEO_CONTROL = undefined;

    this.TIMER =
    {
        start:new Date(),
        elapsed:function()
        {
            var time = new Date();
            return (time.getTime() - this.start.getTime());
        }
    }

    this.setGrid = function(g)
    {
        this.GRID = g;
        if(this.GRID.getGlobal() == undefined)
        {
            this.GRID.setGlobal(this);
        }

        if(this.GEO_CONTROL != undefined)
        {
            this.GRID.setGeoControl()
        }
    }

    this.getGrid = function()
    {
        return this.GRID;
    }

    this.setGeoControl = function(gc)
    {
        this.GEO_CONTROL = gc;
        this.VIEWPORT.setGeoControl(this.GEO_CONTROL);
        if(this.GRID != undefined)
        {
            console.log(this.GRID);
            this.GRID.setGeoControl(this.GEO_CONTROL);
        }
    }

    this.getGeoControl = function()
    {
        return this.GEO_CONTROL;
    }

    this.init = function()
    {
        // So I want to set up the UI
        // There will be a top navigation, a left-side context menu, and a right-side viewport

        // Set up nav bar
        var navigation = document.createElement("div");
            navigation.id = "_NAVIGATION";
            navigation.style.background = this.STD.COLOR.BACKGROUND.BLUE.toString();
            navigation.style.width = this.WIDTH;
            navigation.style.height = this.STD.SIZE.NAVIGATION.height;
            navigation.style.position = "absolute";
            navigation.style.left = 0;
            navigation.style.top = 0;
        this.setNavigation(navigation);

        // Set up context menu
        var contextMenu = document.createElement("div");
            contextMenu.id = "_CONTEXT_MENU";
            contextMenu.style.background = this.STD.COLOR.BACKGROUND.PINK.toString();
            contextMenu.style.width = this.STD.SIZE.CONTEXT_MENU.width;
            contextMenu.style.height = this.HEIGHT - navigation.offsetHeight;
            contextMenu.style.position = "absolute";
            contextMenu.style.left = 0;
            contextMenu.style.top = navigation.offsetHeight;
        this.setContextMenu(contextMenu);

        // Set up viewport
        var viewport = document.createElement("div");
            viewport.id = "_VIEWPORT";
            viewport.style.background = this.STD.COLOR.BACKGROUND.GREEN.toString();
            viewport.style.width = this.WIDTH - contextMenu.offsetWidth;
            viewport.style.height = this.HEIGHT - navigation.offsetHeight;
            viewport.style.position = "absolute";
            viewport.style.left = contextMenu.offsetWidth;
            viewport.style.top = navigation.offsetHeight;
            viewport.style.outline = "1px #FFFFFF solid";
        this.setViewport(viewport);

    }

    this.setGridID = function(idno)
    {
        this.GRID_ID = idno;
    }

    this.getGridID = function()
    {
        return this.GRID_ID;
    }

    this.setNavigation = function(element)
    {
        this.NAVIGATION.element = element;
        document.body.appendChild(this.NAVIGATION.element);
    }

    this.setContextMenu = function(element)
    {
        this.CONTEXT_MENU.element = element;
        document.body.appendChild(this.CONTEXT_MENU.element);
    }

    this.setViewport = function(element)
    {
        this.VIEWPORT.element = element;
        document.body.appendChild(this.VIEWPORT.element);
    }

    this.getViewport = function()
    {
        return this.VIEWPORT;
    }

    this.windowResize = function(event)
    {

        /*
        FOR THE RESIZE

        navigation.style.width = G.WIDTH;
        navigation.style.height = 75;

        contextMenu.style.width = 200;
        contextMenu.style.height = G.HEIGHT - navigation.offsetHeight;

        viewport.style.width = G.WIDTH - contextMenu.offsetWidth;
        viewport.style.height = G.HEIGHT - navigation.offsetHeight;
        */

        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;


        this.NAVIGATION.resize(this.WIDTH, 75);
        this.CONTEXT_MENU.resize(200, this.HEIGHT - parseInt(this.NAVIGATION.element.offsetHeight, 10));
        this.VIEWPORT.resize(this.WIDTH - parseInt(this.CONTEXT_MENU.element.offsetWidth, 10), this.HEIGHT - parseInt(this.NAVIGATION.element.offsetHeight, 10));
    }

    this.selected = function()
    {

    }

    this.scrollTopOld = undefined;
    this.scrollTopFresh = document.body.scrollTop;
    this.scrollDiff = 0;
    this.scrollDirection = undefined;
    this.scroll = function(event)
    {
        this.scrollDiff = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if(this.scrollDiff < 0)
        {
            this.scrollDirection = this.STD.DIRECTION.DOWN;
            //console.log("~! GLOBAL: SCROLL down");
        }
        else if(this.scrollDiff > 0 && this.scrollDiff != 0)
        {
            this.scrollDirection = this.STD.DIRECTION.UP;
            //console.log("~! GLOBAL: SCROLL up");
        }
        else
        {
            this.scrollDirection = undefined;
        }

        if(this.scrollDirection != undefined)
        {
            this.VIEWPORT.camScroll(this.scrollDirection);
        }
    }

    this.getMousePos = function(event)
    {
        var mx = event.clientX;
        var my = event.clientY;
        var mouse2d = new THREE.Vector2(2 * ((parseInt(mx, 10) - this.CONTEXT_MENU.getWidth()) / this.VIEWPORT.getWidth()) - 1, 1 - 2 * ((parseInt(my, 10) - this.NAVIGATION.getHeight()) / this.VIEWPORT.getHeight()));
        //console.log("~!~!~! MOUSE: pos:" + mouse2d.x + "," + mouse2d.y)
        return mouse2d;
    }

    this.getMousePosition = function()
    {
        return this.mousePositionFresh;
    }

    this.mouseOnViewport = function(event)
    {
        var xFlag = (this.mousePositionFresh.x >= -1 && this.mousePositionFresh.x <= 1);
        var yFlag = (this.mousePositionFresh.y >= -1 && this.mousePositionFresh.y <= 1);
        //console.log(xFlag && yFlag);
        return xFlag && yFlag;
    }



	this.rollOverGeo = new THREE.BoxGeometry( 12, 12, 12 );
	this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: this.STD.COLOR.BACKGROUND.LIGHT_GREY, opacity: 0.5, transparent: true } );
	this.rollOverMesh = new THREE.Mesh( this.rollOverGeo, this.rollOverMaterial );
//	this.display("_ROLLOVER_GHOST_", this.rollOverMesh, undefined);

    this.mouseObject = undefined;

    this.mousePositionOld = {x:undefined,y:undefined};
    this.mousePositionFresh = {x:undefined,y:undefined};
    this.mouseDirectionOld = undefined;
    this.mouseDirectionFresh = undefined;
    this.mouseDragFlag = false;
    this.mousemove = function(event)
    {
        this.mousePositionOld = this.mousePositionFresh;
        this.mousePositionFresh = this.getMousePos(event);

        if(this.mouseDragFlag)
        {
            if(this.VIEWPORT.camIsDragging())
            {
                //console.log("~! MOUSE: DRAGGING");

                var horizFlag = false;
                var xDiff = this.mousePositionFresh.x - this.mousePositionOld.x;
                var yDiff = this.mousePositionFresh.y - this.mousePositionOld.y;
                if(this.mousePositionOld != undefined)
                {
                    if(Math.abs(xDiff) > Math.abs(yDiff))
                    {
                        horizFlag = true;
                        //console.log("~! MOUSE: horizontal")
                        if(xDiff > 0)
                        {
                            this.mouseDirectionFresh = this.STD.DIRECTION.RIGHT;
                        }
                        else if(xDiff != 0)
                        {
                            this.mouseDirectionFresh = this.STD.DIRECTION.LEFT;
                        }
                        this.VIEWPORT.camDrag(this.mouseDirectionFresh);
                    }
                    else
                    {
                        //console.log("~! MOUSE: vertical")
                        if(yDiff > 0)
                        {
                            this.mouseDirectionFresh = this.STD.DIRECTION.UP;
                        }
                        else if(yDiff != 0)
                        {
                            this.mouseDirectionFresh = this.STD.DIRECTION.DOWN;
                        }
                        this.VIEWPORT.camDrag(this.mouseDirectionFresh);
                    }
                }
            }
        }
        else // User is not dragging
        {

        }
    }

    this.mousedown = function(event)
    {
        //console.log("Mouse " + event.which)
        switch(event.which)
        {
            case 1: // Left mouse button
                event.preventDefault()
                this.mousePositionFresh = this.getMousePosition(event);
                //console.log("~! GLOBAL: MOUSE is down");
                this.mouseDragFlag = true;
                if(this.mouseOnViewport())
                {
                    // Clicked in VIEWPORT
                    this.VIEWPORT.camDragStart()
                }
                break;
            case 2: // Middle mouse button
                event.preventDefault()
                break;
            case 3: // Right mouse button

                break;
            default: // Not a mouse button
                event.preventDefault()
                break;
        }
    }

    this.mouseup = function(event)
    {
        //console.log("~! GLOBAL: MOUSE is up");
        this.mouseDragFlag = false;
        this.VIEWPORT.camDragStop();

        switch(event.which)
        {
            case 1: // Left mouse button
                if(this.mouseOnViewport())
                {
                    console.log("CAm has been moved: " + this.VIEWPORT.camHasBeenMoved)
                    if(!this.VIEWPORT.camHasBeenMoved)
                    {
                        // Clicked in VIEWPORT
                        var thing = this.VIEWPORT.getMouseTarget();
                        if(thing != undefined)
                        {
                            this.mouseObject = thing;
                            this.selected();
                        }
                        else
                        {
                            this.mouseObject = undefined;
                        }
                    }
                }
                break;
            case 2: // Middle mouse button
                event.preventDefault()
                break;
            case 3: // Right mouse button

                break;
            default: // Not a mouse button
                event.preventDefault()
                break;
        }
        console.log("Mouse Object: " + this.mouseObject)
    }

    this.shiftFlag = false;
    this.altFlag = false;
    this.ctrlFlag = false;

    this.keys = []; // INTs for all keys down

    this.processKey = function(event)
    {
        // Check for special keys
        if(event.shiftKey || event.altKey || event.ctrlKey)
        {
            if(!this.shiftFlag && event.shiftKey)
            {
                this.shiftFlag = true;
                this.keys[this.keys.length] = "SHIFT";
            }
            else if(this.shiftFlag && !event.shiftKey)
            {
                this.shiftFlag = false;
                for(var i = 0; i < this.keys.length; i++)
                {
                    this.shiftFlag = false;
                    if(this.keys[i] == "SHIFT")
                    {
                        this.keys.splice(i, 1);
                    }
                }
            }

            if(!this.altFlag && event.altKey)
            {
                this.altFlag = true;
                this.keys[this.keys.length] = "ALT";
            }
            else if(this.altFlag && !event.altKey)
            {
                this.altFlag = false;
                for(var i = 0; i < this.keys.length; i++)
                {
                    if(this.keys[i] == "ALT")
                    {
                        this.keys.splice(i, 1);
                    }
                }
            }

            if(!this.ctrlFlag && event.ctrlKey)
            {
                this.ctrlFlag = true;
                this.keys[this.keys.length] = "CTRL";
            }
            else if(this.ctrlFlag && !event.ctrlKey)
            {
                this.ctrlFlag = false;
                for(var i = 0; i < this.keys.length; i++)
                {
                    if(this.keys[i] == "CTRL")
                    {
                        this.keys.splice(i, 1);
                    }
                }
            }
        }
        else // No special keys were pressed, process normally
        {
            var key = event.which || event.keyCode;
            var index = this.keys.indexOf(key)
            if(index == -1 && event.type == "keydown")
            {
                this.keys[this.keys.length] = key;
            }
            else if(event.type == "keyup")
            {
                this.keys.splice(index, 1);
            }
        }

        this.keyProcess()
    }

    this.keyCombos =
    [
        {
            name:"copy",
            keys:["CTRL", "c"],
            sensitive:false,
            func:function()
            {
                console.log("COPIED");
            }
        },
        {
            name:"paste",
            keys:["CTRL", "v"],
            sensitive:false,
            func:function()
            {
                console.log("PASTED");
            }
        }
    ]

    this.keyProcess = function()
    {
        for(var i = 0; i < this.keyCombos.length; i++)
        {
            var keysThatNeedToBePressed = [];
            for(var j = 0; j < this.keyCombos[i].keys.length; j++)
            {
                keysThatNeedToBePressed[keysThatNeedToBePressed.length] = this.keyCombos[i].keys[j];
            }
            var str = "";
            for(var o = 0; o < this.keys.length; o++)
            {
                if(this.keys[o] == "SHIFT")
                    str += "SHIFT";
                else if(this.keys[o] == "ALT")
                    str += "ALT";
                else if(this.keys[o] == "CTRL")
                    str += "CTRL";
                else
                    str += String.fromCharCode(this.keys[o]);
            }
            console.log(str);
            for(var k = 0; k < this.keyCombos[i].keys.length; k++)
            {
                switch(this.keyCombos[i].keys[k])
                {
                    case "SHIFT":
                        if(!shiftFlag)
                        {
                            break;
                        }
                        else // Shift is down
                        {
                            continue;
                        }
                    case "ALT":
                        if(!altFlag)
                        {
                            break;
                        }
                        else // Alt is down
                        {
                            continue;
                        }
                    case "17":
                        if(!ctrlFlag)
                        {
                            break;
                        }
                        else // Ctrl is down
                        {
                            continue;
                        }
                }
                if(this.keys.indexOf(this.keyCombos[i].keys[k]) == -1)
                {
                    break;
                }

                // Successful combo

                // ...
            }
        }
    }

    this.display = function(nm, obj, pm)
    {
        this.GEO_CONTROL.add(nm, obj, pm);
    }

    this.init();
}
