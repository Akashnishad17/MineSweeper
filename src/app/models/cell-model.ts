export class Cell{
    x: number | undefined;
    y: number | undefined;
    isOpen: boolean | undefined;
    isBomb: boolean | undefined;
    neighboringbombCount: number | undefined;
    color: Color | undefined;

    constructor(x: number, y: number, isOpen: boolean, isBomb: boolean, neighboringbombCount: number, color: Color){
        this.x = x;
        this.y = y;
        this.isOpen = isOpen;
        this.isBomb = isBomb;
        this.neighboringbombCount = neighboringbombCount;
        this.color = color;
    }
}

export enum Color{
    blue = 'blue',
    limegreen = 'limegreen',
    red = 'red',
    darkblue = 'darkblue',
    darkred = 'darkred',
    orange = 'orange',
    gold = 'gold',
    magenta = 'magenta',
    lightgrey = 'lightgrey'
}

export class BombCell{
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}