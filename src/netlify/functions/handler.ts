// netlify/functions/handler.js
const { createServer } = require('http');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../../dist/app.module');

let server;

exports.handler = async (event, context) => {
    if (!server) {
        const app = await NestFactory.create(AppModule);
        await app.init();

        server = createServer((req, res) => {
            app.getHttpAdapter().getHttpServer().emit('request', req, res);
        });
    }

    return new Promise((resolve, reject) => {
        server.listen(0, () => {
            server.once('request', (req, res) => {
                const { statusCode, headers, body } = res;
                resolve({
                    statusCode,
                    headers,
                    body: body.toString('utf8'),
                });
            });

            server.emit('request', event, context);
        });
    });
};
