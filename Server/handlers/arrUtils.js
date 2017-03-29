'use strict'

class ArrUtils {
  static getSumizhMatrix(vertexNum, edgesNum, edgesArr) {
    let sumizhArr = [];
    
    for(let i = 0; i < vertexNum; i++) {
      sumizhArr[i] = [];

      for(let j = 0; j < vertexNum; j++) {
        sumizhArr[i][j] = 0;
      }
    }

    for(let j = 0; j < edgesNum; j++){
      sumizhArr[edgesArr[j][0] - 1][edgesArr[j][1] - 1] = 1;
    }

    return sumizhArr;
  }

  static getIncindentMatrix(vertexNum, edgesNum, edgesArr) {
    let incindentArr = [];

    for(let i = 0; i < vertexNum; i++) {
      incindentArr[i] = [];

      for(let j = 0; j < edgesNum; j++) {
        incindentArr[i][j] = 0;
      }
    }

    for(let j = 0; j < edgesNum; j++) {
      if(edgesArr[j][0] == edgesArr[j][1]) {
        incindentArr[edgesArr[j][0] - 1][j] = 2;
      } else {
        incindentArr[edgesArr[j][0] - 1][j] = -1;
        incindentArr[edgesArr[j][1] - 1][j] = 1;
      }
    }

    return incindentArr;
  }

  static getSI(request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', true); // If needed

    console.log('0_0');

    if(request.method == 'POST') {

      let jsonStr = '';

      let incindentArr, sumizhArr;

      request.on('data', (data) => jsonStr += data);

      request.on('end', () => {
          const reqData = JSON.parse(jsonStr);

          incindentArr = ArrUtils.getIncindentMatrix(reqData.vertexNum, reqData.edgesNum, reqData.edgesArr);
          sumizhArr = ArrUtils.getSumizhMatrix(reqData.vertexNum, reqData.edgesNum, reqData.edgesArr);

          response.writeHead(200, { 'Content-Type': 'text/html'});
          response.write(JSON.stringify({
            sumizhArr: sumizhArr,
            incindentArr: incindentArr
          }));
          response.end();
      });
    } else {
      console.log('incorrect method');
      response.writeHead(500, { 'Content-Type': 'text/html'});
      response.end();
    }
  }
}

module.exports = ArrUtils;
