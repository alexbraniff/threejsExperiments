function COLOR(r, g, b)
{
    this.red = r;
    this.green = g;
    this.blue = b;

    this.toHex = function()
    {
        return "0x" + this.pad(r.toString(16)) + this.pad(g.toString(16)) + this.pad(b.toString(16));
    }

    this.toString = function()
    {
        return "#" + this.pad(r.toString(16)) + this.pad(g.toString(16)) + this.pad(b.toString(16));
    }

    this.pad = function(number)
    {
        while(number.length < 2)
        {
            number = "0" + number;
        }
        return number;
    }
}
