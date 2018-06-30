var grid;
var l = 4;
var h = 4;
var prev;
var score;

function setup()
{
    score = 0;
    var canvas = createCanvas(400, 500);
    height = 400;
    canvas.parent('sketch-holder');

    /*for (var i = 0; i < l; i++)
    {
        for (var j = 0; j < h; j++)
        {
            grid[i][j] = 0;
        }
    }*/
    grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]];

    //console.table(grid);
    prev = {
        x:-1,
        y:-1
    }
    addNumber();
    addNumber();
}

function draw()
{
    //translate(y, height/2);
    background(255);

    for (var i = 0; i <4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            var x = map(j, 0, 4, 0, width);
            var y = map(i, 0, 4, 0, height);
            fill(grid[i][j] * 20, 255 - 20 * grid[i][j], 0)
            if (grid[i][j] == 0)
                fill(255);
            rect(x, y, width/4, height/4);
            fill(0);
            textAlign(CENTER);
            textSize(30);
            stroke(2);
            if (grid[i][j] != 0)
            {
                //text(grid[i][j], x + width/10, y + width/10, width/4, height/4);
                text(Math.pow(2, grid[i][j]), x, y + height/10, width/4, height/4);
            }
            //fill(0);
        }
    }

    textSize(30);
    text("score: " + score, 200, 450);
    /*fill(255, 255, 255, 80);
    stroke(0);
    var x = map(prev.y, 0, 4, 0, width) + width/8;
    var y = map(prev.x, 0, 4, 0, height) + width/8;
    ellipse(x,y, 50, 50);*/

}
function keyPressed()
{
    if (key == 's' || key == 'S')
    {
        down();
    }
    else if (key == 'a' || key == 'A')
    {
        left();
    }
    else if (key == 'd' || key == 'D')
    {
        right();
    }
    else if (key == 'w' || key == 'W')
    {
        up();
    }
    /*else if (key == 'q' || key == 'Q')
    {
        console.log("before");
        console.table(grid);
        rotate90();
        console.log("after");
        console.table(grid);
    }*/
    /*else if (key == 'p' || key == 'P')
    {
        modify();
        console.table(grid);
    }*/
}
/*function modify()
{
    grid[0][0] = 10;
}*/
function rotate90()
{
    //grid[0][0] = 10;
    //return;
    var temp = new Array(4);
    for (var i = 0; i < 4; i++)
        temp[i] = new Array(4);
    for (var i = 0; i < 4; i++)
    {
        for (var j = 0; j < 4; j++)
        {
            temp[i][j] = grid[3-j][i];
        }
    }
    for (var i = 0; i < 4; i++)
    {
        for (var j = 0; j < 4; j++)
        {
            grid[i][j] = temp[i][j];
        }
    }
}
function right()
{
    rotate90();
    down();
    rotate90();
    rotate90();
    rotate90();
}
function up()
{
    rotate90();
    rotate90();
    down();
    rotate90();
    rotate90();
}
function left()
{
    rotate90();
    rotate90();
    rotate90();
    down();
    rotate90();
}
function down()
{
    var count = 0;
    var move = false;
    for (var j = 0; j < 4; j++)
    {
        for (var i = 3; i >= 0; i--)
        {
            var num = grid[i][j];
            count++;
            //console.log (i + " " + j + " " + num)
            if (count > 50)
                return;
            if (num != 0)
            {
                for (k = i - 1; k >= 0; k--)
                {
                    if (grid[k][j] == num)
                    {
                        grid[i][j]++;
                        score += Math.pow(2,grid[i][j]);
                        grid[k][j] = 0;
                        move = true;
                        i = k;
                        break;
                    }
                    else if (grid[k][j] != 0)
                    {
                        break;
                    }
                }
            }
        }
    }
    for (var j = 0; j < 4; j++)
    {
        for (var i = 3; i >= 0; i--)
        {
            if (grid[i][j] == 0)
            {
                for (var k = i; k >= 0; k--)
                {
                    if (grid[k][j] != 0)
                    {
                        grid[i][j] = grid[k][j];
                        grid[k][j] = 0;
                        move = true;
                        break;
                    }
                }
            }
        }
    }
    if (move)
        addNumber();
}

function addNumber()
{
    var empty = [];
    for (var i = 0; i < 4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            if (grid[i][j] == 0)
            {
                empty.push({
                    x: i,
                    y: j
                    })
            }
        }
    }

    let spot = random(empty);
    grid[spot.x][spot.y] = 1;
    prev = spot;

}
/*function mousePressed()
{
    addNumber();
    console.table(grid);
}*/
