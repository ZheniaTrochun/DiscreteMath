"use strict"

class BaseInfo{
  static getHalfPowers(vertexNum, edgesNum, edgesArr) {
    const halfPowers = {
      in: [],
      out: []
    };

    for(let i = 0; i < vertexNum; i++) {
      halfPowers.in[i] = 0;
      halfPowers.out[i] = 0;
    }

    for(let i = 0; i < edgesNum; i++) {
      halfPowers.in[edgesArr[i][1]]++;
      halfPowers.out[edgesArr[i][0]]++;
    }

    return halfPowers;
  }

  static getEccentricities(vertexNum, edgesNum, edgesArr) {
    const eccentricityArr = [];
    //TODO
  }

  static getFullInfo(request, response) {
    if(request.method == 'POST') {
      let reqBody = '';

      request.on('data', (data) => reqBody += data);

      request.on('end', () => {
        const reqData = JSON.parse(reqBody);

        const halfPowers = BaseInfo.getHalfPowers(reqData.vertexNum, reqData.edgesNum, reqData.edgesArr);
        const eccentricityArr = BaseInfo.getEccentricities(reqData.vertexNum, reqData.edgesNum, reqData.edgesArr);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(JSON.stringify({
          inHalfPowers: halfPowers.in,
          outHalfPowers: halfPowers.out,
          eccentricityArr: eccentricityArr
        }));
        response.end();
      });
    } else {
      console.log('incorrect method');
      response.writeHead(500, {'Content-Type': 'text/html'});
      response.end();
    }
  }
}
