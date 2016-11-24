/**
 * Created by Микитенко on 23.11.2016.
 */
var matrixC = [ [1, 3, 4, 2],
                [4, 5, 8, 3],
                [2, 3, 6, 7] ];

var matrixB = [60, 80, 100];
var matrixA = [40, 60, 80, 60];
// var matrixB = [100, 250, 200];
// var matrixA = [150, 200, 100, 100];

var time = new Date;

var stopwatch = {
    "click" : function () {
        var result = (new Date).getTime() - time.getTime();
        time = new Date;
        return result;
    }
};

var timeResults = {};


function arrayDemo() {
    var arr = [];

    stopwatch.click();
    for(var i = 0; i < 1000000; i++){
        arr.push(Math.round(Math.random() * 1000000));
    }
    timeResults["creationTime"] = stopwatch.click();
    console.log(arr);

    stopwatch.click();
    arr.sort();
    timeResults["sortingTime"] = stopwatch.click();
    console.log(arr);

    stopwatch.click();
    arr.reverse();
    timeResults["reverseSortTime"] = stopwatch.click();
    console.log(arr);

    stopwatch.click();
    var sum = 0;
    for (var i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    timeResults["summingTime"] = stopwatch.click();

    console.log("time spent on creation: " + timeResults["creationTime"] + " ms");
    console.log("time spent on sort: " + timeResults["sortingTime"] + " ms");
    console.log("time spent on reverse sort: " + timeResults["reverseSortTime"] + " ms");
    console.log("time spent on summing: " + timeResults["summingTime"] + " ms");
    console.log("sum is: " + sum);

}

function nWestDemo() {
    northWest(matrixC, matrixB, matrixA);
}

function northWest(priceGrid, rowOfStock, lineOfDelivery) {
    var cost = 0;
    var plan = suggestPlan(rowOfStock, lineOfDelivery);
    for(var i = 0; i < rowOfStock.length; i++){
        for(var k = 0; k < lineOfDelivery.length; k++)
        {
            if(plan[i][k] !== "-")
            cost += priceGrid[i][k] * plan[i][k];
        }
    }
    console.log("plan is:");
    displayPlan(matrixB, matrixA, plan);
    console.log("Cost for this plan is: " + cost);
}

function displayPlan(rowOfStock, lineOfDelivery, plan) {
    console.log("     " + lineOfDelivery.map(formatArrayElement).join(" "));
    for(var i = 0; i < plan.length; i++) {
        console.log(formatArrayElement(rowOfStock[i]) +  "|"
            + plan[i].map(formatArrayElement).join(" "));
    }
}

formatArrayElement = function (element) {
    var len = element.toString().length;
 if(len === 1)
     return "   " + element;
 else if(len === 2)
     return "  " + element;
 else if(len >= 3)
     return " " + element;
};



function suggestPlan(rowOfStock, lineOfDelivery) {
    var width = lineOfDelivery.length;
    var height = rowOfStock.length;
    var plan = emptyPlan(width, height);
    var i = 0, j = 0;
    var s = rowOfStock[i];
    var d = lineOfDelivery[j];
    var count = 0;
    while (i < height && j < width){
        if(s < d){
            plan[i++][j] = s;
            d -= s;
            s = rowOfStock[i];
            count++;
        }
        else if(d < s) {
            plan[i][j++] = d;
            s -= d;
            d = lineOfDelivery[j];
            count++;
        }
        else{
            plan[i++][j++] = d;
            s = rowOfStock[i];
            d = lineOfDelivery[j];
            count++;
            if(i < height) {
                plan[i][j - 1] = 0;
                count++;
            }
            else if(j < width) {
                plan[i - 1][j] = 0;
                count++;
            }
        }
    }
    if(count === height + width - 1)
        console.log("plan is valid(passed check)");
    else    console.log("plan is not valid.");
    return plan;
}

function emptyPlan(width, height) {
    var solution = [];
    for(var i = 0; i < height; i++){
        solution[i] = [];
        for(var k = 0; k < width; k++){
            solution[i].push("-");
        }
    }
    return solution;
}