function GRID(g, gc, size, step)
{
    this.GLOBAL = g;
    this.GLOBAL.setGrid(this);
    this.GEO_CONTROL = gc;

    // So I want to make a grid that someone can use to make things
    // Need a geom to show rollOver
    // Need objects that someone *could place
    // Need grid
    //   for i = -size to +size
    //     push vertex([+-]size, 0, i)
    //     push vertex(i, 0, [+-]size)
    //
    this.size = size;
    this.step = step;

    this.object = new THREE.Object3D();
    this.geometry = undefined;

    this.material = undefined;

    this.init = function()
    {
        if(this.GEO_CONTROL != undefined)
        {
            var planeGeometry = new THREE.PlaneBufferGeometry(2 * this.size,2*this.size, 2 * this.size);
            var planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );

            this.geometry = new THREE.Geometry();
            for (var i = -this.size; i <= this.size; i += this.step) {
                this.geometry.vertices.push(new THREE.Vector3(-this.size, 0, i));
                this.geometry.vertices.push(new THREE.Vector3(this.size, 0, i));


                /*gX1T4aK2gd*/
                this.geometry.vertices.push(new THREE.Vector3(i, 0, -this.size));
                this.geometry.vertices.push(new THREE.Vector3(i, 0, this.size));
            }
            this.material = new THREE.LineBasicMaterial( { color: 0xFFFFFF, opacity: 0.25, transparent: true } )
            var line = new THREE.Line(this.geometry, this.material, THREE.LinePieces);

            this.object.add(line)
            this.object.add(planeMesh);
            console.log("~! GRID: Attempting to be seen! (id:" + this.object.id + ")")
            this.GLOBAL.setGridID(this.object.id);
            this.GEO_CONTROL.add("_GRID_", this.object, undefined);
        }
        else
        {
            console.log("~!~! GRID: Failed to init GEO_CONTROL ");
        }
    }

    this.init();
}

GRID.prototype.getGlobal = function() // huehuehue
{
    return this.GLOBAL;
}

GRID.prototype.setGlobal = function(GLOBAL_SCOPE_GOAT) // huehuehue
{
    this.GLOBAL = GLOBAL_SCOPE_GOAT;
    this.GLOBAL.setGrid(this);
}

GRID.prototype.setGeoControl = function(geoControl)
{
    this.GEO_CONTROL = geoControl;
}
