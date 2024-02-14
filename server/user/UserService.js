import User from './User.js';
import SessionService from '../session/SessionService.js';

class UserService {
  async create(user) {
    const createdUser = await User.create(user);
    return createdUser;
  }

  async findUserByName(userName) {
    const foundUser = await User.find({ name: userName });
    return foundUser;
  }

  async getUserId(name) {
    return (await User.findOne({ name }))._id;
  }

  async areCredentialsValid(name, password) {
    const user = await User.findOne({ name });
    if (!user || user.password !== password) {
      return false;
    }
    return true;
  }

  async startSession(userName, userPassword) {
    return await this.areCredentialsValid(userName, userPassword) ?
      await SessionService.start(userName) :
      null;
  }

  async finishSession(sessionId) {
    return await SessionService.finish(sessionId);
  }

  async isUserLogined(sessionId) {
    return await SessionService.exists(sessionId);
  }
}

export default new UserService();
