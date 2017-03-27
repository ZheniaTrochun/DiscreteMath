'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');

const Router = require('./router');

class Server {
  static start(port) {
    this.getRoutes(port).then(this.createServer);
  }

  static getRoutes(port) {
    return new Promise(function(resolve) {
      fs.readFile('routes.json', { encoding: 'utf8' }, (error, routes) => {
        if(!error) {
          resolve({
            port: port,
            routes: JSON.parse(routes)
          });
        }
      });
    });
  }

  static createServer(settings) {
    http.createServer((request, response) => {
      const path = url.parse(request.url).pathname;
      console.log(path);
      const route = Router.find(path, settings.routes);

      try {
        const handler = require('./handlers/' + route.handler);

        console.log(route.handler);
        console.log(route.action);
        console.log(handler);

        handler[route.action](request, response);
      } catch (e) {
        response.writeHead(500);
        response.end();
      }
    }).listen(settings.port);
    console.log('listening port: ' + settings.port);
  }
}

Server.start(8080);
