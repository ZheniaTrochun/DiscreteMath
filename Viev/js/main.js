'use strict'

var vertexNum, edgesNum;
var isInfoGiven;
var edgesArr = [];

const isDigit = num => !(isNaN(num) || num == Infinity || num == undefined);

const drawGraf = () => {
  alert("0_0");
};

const arrOutput = (arr, id) => {

  var node = $('#' + id);
  node.html("");

  for(var i = 0; i < arr.length; i++){
    node.html(node.html() + "<p>");

    for(var j = 0; j < arr[0].length; j++){
      node.html(node.html() + "\t" + arr[i][j]);
    }

    node.html(node.html() + "</p>\n");
  }
};

const getEdges = () => {
  for(var i = 0; i < edgesNum; i++){
    edgesArr[i] = [];
  }

  try{
    for(var i = 0; i < edgesNum; i++){
      edgesArr[i][0] = parseInt($('#n1e' + (i+1)).val());
      edgesArr[i][1] = parseInt($('#n2e' + (i+1)).val());

      if(!isDigit(edgesArr[i][0]) || !isDigit(edgesArr[i][1])){
        throw new Error();
      }
    }
  }
  catch(e){
    alert("Not a number");
    return false;
  }

  return true;
};

const calculate = () => {

  $('#rulesP').hide();
  $('#rulesOl').hide();

  if(!getEdges()){
    alert("Error");
    return;
  }

  $.ajax({
    url: "http://localhost:8080/SI",
    type: "POST",
    crossDomain: true,
    dataType: "json",

    data: JSON.stringify({
      vertexNum: vertexNum,
      edgesNum: edgesNum,
      edgesArr: edgesArr
    }),

    success: result => {
      arrOutput(result.incindentArr, "incindentArr");
      arrOutput(result.sumizhArr, "sumizhArr");
    }
  });
};

const getStartInfo = () => {
  try{
    vertexNum = parseInt(document.getElementById('vertexNum').value);
    edgesNum = parseInt(document.getElementById('edgeNum').value);

    if(!isDigit(vertexNum) || !isDigit(edgesNum)){
      throw new Error();
    }
  }

  catch(e){
    alert("Not a number");
    return;
  };

  $('#vertexEdgeInput').hide();

  for(var i = 0; i < edgesNum; i++){
    var node = document.createElement('div');
    node.className = 'edge';
    node.innerHTML = '<input type="text" name="name" value="" placeholder="n1" id="n1e' + (i + 1) + '" oninput="setReady(n1e' + (i + 1) + ')">';
    node.innerHTML += '\n<input type="text" name="name" value="" placeholder="n2" id="n2e' + (i + 1) + '" oninput="setReady(n2e' + (i + 1) + ')">';
    document.getElementById('edgesInput').appendChild(node);
  }

  const btn = document.createElement('button');

  //btn.type = 'button';
  //btn.value = 'Порахувати';
  btn.id = 'calculate';
  btn.onclick = calculate;
  btn.innerHTML = 'Порахувати';

  $('#inputBox').append(btn);
};
