function CONTEXT_MENU(ele)
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

CONTEXT_MENU.prototype.getWidth = function()
{
    return parseInt(this.element.offsetWidth, 10);
}

CONTEXT_MENU.prototype.getHeight = function()
{
    return parseInt(this.element.offsetHeight, 10);
}
