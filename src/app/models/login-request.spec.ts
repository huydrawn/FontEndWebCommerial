import { LoginRequest } from './login-request';

describe('LoginRequest', () => {
  it('should create an instance', () => {
    expect(new LoginRequest("ád","ád")).toBeTruthy();
  });
});
