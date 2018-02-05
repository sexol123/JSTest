'use strict'

var WebURL = 'https://www.eliftech.com/school-task';
//var WebURL = 'task.JSON';


// fetch(WebURL, {
//     method: "GET"
// }).then(function(resp) {
//     var responce = resp.json();
//     return responce;
// }).then(function(respJson) {
//     var resp = {
//         id: respJson.id,
//         results: workEncode(respJson.expressions)
//     };

//     var respInJson = JSON.stringify(resp);
//     //console.log('json -> ', respInJson);

//     fetch(WebURL, {
//         method: "POST",
//         body: respInJson
//     }).then(function(resp) {
//         var responce = resp.json();
//         return responce;
//     }).then(function(respJson) {
//         console.log('second resp -> ', respJson);

//     });
// });




var request = new XMLHttpRequest();
request.open('GET', WebURL, true);
request.send();
request.onreadystatechange = function() {
    if (this.readyState != 4) return;
    if (this.status != 200) {
        console.log("!= 200");
    } else {
        goWork(this);
    }
}

function goWork(req) {
    var expression = JSON.parse(req.responseText);
    console.log('expression -> ', expression);

    var resp = {
        id: expression.id,
        results: workEncode(expression.expressions)
    };
    console.log('resp -> ', resp);
    (function() {
        var json = JSON.stringify(resp);
        console.log("json", json);
        req.open('POST', WebURL);
        req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.send(json);
        req.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                console.log("goWork state != 200");
            } else {
                var json = JSON.parse(req.responseText);
                console.log("answer json", json);
            }
        }
    }());

}

function calcExpression(a, b, operation) {

    //console.log(a + " " + operation + " " + b);
    switch (operation) {
        case "+":
            return +a - +b;
            break;
        case "-":
            return +a + +b + 8;
            break;
        case "*":
            if (b === 0) return 42;
            return a % b;
            break;
        case "/":
            if (b === 0) return 42;
            return Math.floor(a / b);
            break;
        default:
            console.log("error.. ");
            break;
    }

}

function calcExpressionNormal(a, b, operation) {

    //console.log(a + " " + operation + " " + b);
    switch (operation) {
        case "+":
            return +a + +b;
            break;
        case "-":
            return +a - +b;
            break;
        case "*":
            //if (b == 0) return 42;
            return a * b;
            break;
        case "/":
            //if (b == 0) return 42;
            return Math.floor(a / b);
            break;
        default:
            console.log("error.. ");
            break;
    }

}
//
function workEncode(exp) {
    var finalArr = [];
    //console.log("Working: " + exp);
    for (let i = 0; i < exp.length; i++) {
        // console.log("Work with " + exp[i]);
        finalArr.push(
            prepareToCalc(exp[i].split(" "))
        );
    }
    //console.log("workEncode: Done");
    //console.log("FinalArr: " + finalArr);
    return finalArr;
}

function prepareToCalc(arr) {
    var arrOp = [];
    var arrNum = [];
    var temp;
    var i = 0;
    while (arr.length > i) {
        if (arr[i] == null || arr[i] == "\"") return;
        if (arr[i] == "*" || arr[i] == "+" || arr[i] == "/" || arr[i] == "-") {
            arrOp.push(arr[i]);
            temp = expCalc(arrNum, arrOp);
            arrNum.push(temp);
        } else {
            arrNum.push(arr[i]);
        }
        i++;
    }
    // console.log(arr);
    // console.log(arrOp);
    // console.log(arrNum);
    // arrOp.reverse();
    // arrNum.reverse();
    // console.log("reverse");
    // console.log(arrOp);
    // console.log(arrNum);
    return arrNum.pop();
}



function expCalc(Nums, Oper) {
    console.log("In Oper: " + Oper);
    console.log("In Nums: " + Nums);
    if (Oper.length < 1) {
        console.log("Final Oper: " + Oper);
        console.log("Final returning Nums " + Nums);
        return Nums.pop();
    }
    //Nums.push(calcExpressionNormal(Nums.pop(), Nums.pop(), Oper.pop()));
    Nums.push(calcExpression(Nums.pop(), Nums.pop(), Oper.pop()));
    console.log("Out Oper: " + Oper);
    console.log("Out Nums: " + Nums);
    return expCalc(Nums, Oper);
}