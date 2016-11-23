/**
 * Created by Микитенко on 23.11.2016.
 */
var matrixC = [ [1, 3, 4, 2],
                [4, 5, 8, 3],
                [2, 3, 6, 7] ];

var matrixB = [60, 80, 100];
var matrixA = [40, 60, 80, 60];

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
        cost += priceGrid[i][k] * plan[i][k];
    }
    console.log("plan is:");
    for(var i = 0; i < plan.length; i++) {
        console.log(plan[i].join("              "));
    }
    console.log("Cost for this plan is: " + cost);
}

function suggestPlan(rowOfStock, lineOfDelivery) {
    var plan = emptyPlan(lineOfDelivery.length, rowOfStock.length);
    var i = 0, j = 0;
    var s = rowOfStock[i];
    var d = lineOfDelivery[j];
    while (i < rowOfStock.length && j < lineOfDelivery.length){
        if(s < d){
            plan[i][j] = s;
            i++;
            d -= s;
            s = rowOfStock[i];
        }
        else if(d < s) {
            plan[i][j] = d;
            j++;
            s -= d;
            d = lineOfDelivery[j];
        }
        else{
            plan[i][j] = d;
            j++;
            i++;
            s = rowOfStock[i];
            d = lineOfDelivery[j];
        }
    }
    console.log(plan);
    return plan;
}

function emptyPlan(width, height) {
    var solution = [];
    for(var i = 0; i < height; i++){
        solution[i] = [];
        for(var k = 0; k < width; k++){
            solution[i].push(0);
        }
    }
    return solution;
}