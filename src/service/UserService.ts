class UserService {
  public createUserWithEmail(user: {email: string, password: string}): void {
    console.log('CREATE USER: ', user);
  }
}

export default new UserService();
