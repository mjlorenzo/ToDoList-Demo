// simple utility class to define a standard structure for Page data
export default class Page
{
    constructor(num, itemsPer)
    {
        if (num < 1)
            throw new Error("Page(): 'num' argument must be an integer greater than 0");
        if (itemsPer < 1)
            throw new Error("Page(): 'itemsPer' argument must be an integer greater than 1");

        this.current = num;
        this.itemsPer = itemsPer;
        this.firstIndex = (this.current - 1) * this.itemsPer;
        this.secondIndex = (this.current * this.itemsPer) - 1;
    }
}