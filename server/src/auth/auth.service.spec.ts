import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('LOGIN', () => {
    it('should have property access_token', async () => {
      expect(await service.login({
        email: 'foo@bar.com', 
        password: 'test'
      })).toHaveProperty("access_token");
    })
  })
});
