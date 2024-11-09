import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async validateAdmin(username: string, password: string) {
    const admin = await this.prisma.admin.findFirst({
      where: { username }
    });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(admin: { id: string; username: string }) {
    const payload = { sub: admin.id, username: admin.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
