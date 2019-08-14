function GEO_CONTROL(GLOBAL)
{
    this.GLOBAL = GLOBAL;
    this.GLOBAL.setGeoControl(this);

    this.visible = [];
    this.visibleObjects = [];
    this.hidden = [];
    this.VIEWPORT = this.GLOBAL.getViewport();

    this.idDump = [];

    this.add = function(nm, obj, phys_mods)
    {
        if(this.idDump.indexOf(obj.id) == -1)
        {
            this.visible[obj.id] =
            {
                name:nm,
                object:obj,
                physMods:phys_mods
            };
            this.visibleObjects.push(this.visible[obj.id].object);
            this.idDump.push(obj.id);
            this.VIEWPORT.addToScene(obj);
        }
        else
        {
            // This name is already in use
            // Idk what to do...
        }
    }

    this.request = function(id)
    {
        var index = this.idDump.indexOf(id)
        if(index != -1)
        {
            return this.visible[id];
        }
        else
        {
            return -1;
        }
    }

    this.applyPhysics = function()
    {
        for(object in this.visible)
        {
            if(object.physMods != undefined)
                for(mod in object.physMods.getMods())
                {
                    // Apply phys mods
                }
        }
    }

    this.remove = function(id)
    {
        var index = this.idDump.indexOf(id)
        if(index != -1)
        {
            this.visible[id] = {};
            this.idDump.splice(index, 1);
        }
    }

    this.getVisible = function()
    {
        return this.visibleObjects;
    }
}
