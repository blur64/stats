import User from './User.js';

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  async findUserByName(userName) {
    const foundUser = await User.find({ name: userName });
    return foundUser;
  }
}

export default new UserService();
