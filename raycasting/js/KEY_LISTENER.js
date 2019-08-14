function KEY_LISTENER(g)
{
    this.global = g;
    this.init = function()
    {
        window.onkeydown = function(event)
        {
            this.global.processKey(event);
        };

        window.onkeyup = function(event)
        {
            this.global.processKey(event);
        };
    }

    this.init();
}
