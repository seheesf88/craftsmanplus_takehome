
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
//==================//
// 		Part 1	 	//
//==================//

console.log('connected?');

// 1. When the money finishes tweening, addFromCatch is called and receives the value scored as a number.
// 2. The number should take 2 seconds to reach the new total.
// 3. If a new bill is caught while it’s increasing, it should take 2 seconds from the currently displayed balance to reach the new total.
// 4. The number should be formatted correctly.


var userBalance = 0;
// Gets called whenever the money finished tweening to the bottom.
function addFromCatch(value){
    var idVar = setTimeout(() => {
      userBalance += value
  }, 2000);
}

// Gets called every frame.
// Time elapsed since the last update is passed into the function(milliseconds)
function onUpdate({delta}){
  var newBalance = userBalance.toString().split(".");
  newBalance[0] = newBalance[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  newBalance.join('.')
  return updateBalance(newBalance)
}
//
// You have access to a function updateBalance which
// takes in a string and sets the ui to that value



//==================//
// 		Part 2	 	//
//==================//
function getScore(key, line){
  // console.log(key, line)
  var threeRow = { '1' : 5, '2' : 10, '3' : 25};
  var fourRow = { '1' : 10, '2' : 25, '3' : 50};
  var fiveRow = { '1' : 20, '2' : 50, '3' : 100};


  var total = 0
  var count = 0;
  var shape = ''


  for(let i = 0; i < line.length; i++){
    let ele = line[i].toString();


    if(ele === key){
      count += 1;
      shape = ele

    }else{
      break;
    }
  }


  if(count === 3){
    total += threeRow[shape]
  }else if(count === 4){
    total += fourRow[shape]
  }else if(count === 5){
    total += fiveRow[shape]
  }
  return total

}


function processSlots(arr){
  var totalScore = 0;
  //need to filter if there
  var ptShape = [1,2,3]

  var newArr = arr.join(',').split(',');
  console.log(newArr)
  var winningOne = [newArr[0], newArr[6], newArr[12], newArr[8], newArr[4]]
  let winningOnePoint = getScore(winningOne[0], winningOne)
      totalScore += winningOnePoint
      console.log(totalScore);
  var winningFive = [newArr[10], newArr[6], newArr[2], newArr[8], newArr[14]]
  let winningFivePoint = getScore(winningFive[0], winningFive)
      totalScore += winningFivePoint


//wining line 2,3,4
  for(let i = 0; i < arr.length; i++){
    let line = arr[i];
    var result = {};
    for(let j = 0; j < line.length; j++){
      let ele = line[j];

      if(!result[ele]){
        result[ele] = 1
      }else{
        result[ele] += 1
      }
    }

    for(let key in result){
      var value = result[key];

      if(value >= 3){
        let point = getScore(key, line);
        totalScore += point
      }
    }
  }

  console.log('(Output)totalScore', totalScore)
  return totalScore
};

// examples input
var array = [
	[1,0,0,0,1],
	[0,1,0,1,0],
	[0,0,1,0,0]
];
//Output: '1 winning line, scoring 20 points.'

var array2 = [
	[2,4,2,2,3],
	[1,1,1,4,1],
	[3,3,3,4,2]
];
//Output: '2 winning lines, scoring a tot
processSlots(array)
