function NAVIGATION(ele)
{
    this.element = ele || document.createElement("div");
    this.visible = true;

    this.isVisible = function()
    {
        return this.visible;
    }

    this.resize = function(nWidth, nHeight)
    {
        this.element.style.width = nWidth;
        this.element.style.height = nHeight;
    }
}

NAVIGATION.prototype.getWidth = function()
{
    return parseInt(this.element.offsetWidth, 10);
}

NAVIGATION.prototype.getHeight = function()
{
    return parseInt(this.element.offsetHeight, 10);
}
