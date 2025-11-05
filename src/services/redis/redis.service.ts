import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private static readonly NO_EXPIRATION = -1;

  async onModuleInit() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_SOCKET_HOST,
        port: Number(process.env.REDIS_SOCKET_PORT),
      },
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));

    await this.client.connect();
    const pong = await this.client.ping();
    console.log(`Redis Connected: ${pong}`);
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('Redis disconnected.');
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async keys(pattern: string) {
    return await this.client.keys(pattern);
  }
  async set(
    key: string,
    value: string,
    expirationInSeconds?: number,
  ) {
    if (expirationInSeconds !== undefined) {
      return await this.client.set(key, value, { EX: expirationInSeconds });
    }

    return await this.client.set(key, value);
  }

  async del(keyOrPattern: string) {
    if (keyOrPattern.includes('*')) {
      const keys = await this.client.keys(keyOrPattern);
      const p = [];
      keys.map((key) => p.push(this.client.del(key)));
      await Promise.all(p);
    } else {
      await this.client.del(keyOrPattern);
    }
  }

  async mget(keys: string[]) {
    if (keys.length === 0) {
      return [];
    }
    return await this.client.mGet(keys);
  }

  async sadd(key: string, ...members: string[]) {
    return await this.client.sAdd(key, members);
  }

  async smembers(key: string) {
    return await this.client.sMembers(key);
  }

  async srem(key: string, ...members: string[]) {
    return await this.client.sRem(key, members);
  }

  async sismember(key: string, member: string) {
    return await this.client.sIsMember(key, member);
  }

  async sendCommand(command: string[]) {
    return await this.client.sendCommand(command);
  }

  async exists(key: string) {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async expire(key: string, seconds: number) {
    const result = await this.client.expire(key, seconds);
    return result;
  }

  async ttl(key: string) {
    return await this.client.ttl(key);
  }
}