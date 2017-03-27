'use strict'

class ArrUtils {
  static getSI(request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    response.setHeader('Access-Control-Allow-Credentials', true); // If needed

    console.log('0_0');

    if(request.method == 'POST') {

      let jsonStr = '';

      let incindentArr = [],
          sumizhArr = [];

      request.on('data', (data) => jsonStr += data);

      request.on('end', () => {
          const reqData = JSON.parse(jsonStr);

          for(let i = 0; i < reqData.vertexNum; i++){
            incindentArr[i] = [];
            sumizhArr[i] = [];

            for(let j = 0; j < reqData.vertexNum; j++){
              sumizhArr[i][j] = 0;
            }

            for(let j = 0; j < reqData.edgesNum; j++){
              incindentArr[i][j] = 0;
            }
          }

          for(let j = 0; j < reqData.edgesNum; j++){
            sumizhArr[reqData.edgesArr[j][0] - 1][reqData.edgesArr[j][1] - 1] = 1;

            if(reqData.edgesArr[j][0] == reqData.edgesArr[j][1]){
              incindentArr[reqData.edgesArr[j][0] - 1][j] = 2;
            }
            else{
              incindentArr[reqData.edgesArr[j][0] - 1][j] = -1;
              incindentArr[reqData.edgesArr[j][1] - 1][j] = 1;
            }
          }

          response.writeHead(200, { 'Content-Type': 'text/html'});
          response.write(JSON.stringify({
            sumizhArr: sumizhArr,
            incindentArr: incindentArr
          }));
          response.end();
      });
    }
    if(request.method == 'GET') {
      console.log('incorrect method');
      response.writeHead(500, { 'Content-Type': 'text/html'});
      response.end();
    }
  }
}

module.exports = ArrUtils;
