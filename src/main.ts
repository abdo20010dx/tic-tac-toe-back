import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
class MyIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*', // Allow all origins
        // methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      },
    });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new MyIoAdapter(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
