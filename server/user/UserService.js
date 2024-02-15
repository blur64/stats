import User from './User.js';
import SessionService from '../session/SessionService.js';
import TableService from '../table/TableService.js';
import bcrypt from 'bcrypt';

class UserService {
  async create(user) {
    const hash = await bcrypt.hash(user.password, 4);
    return await User.create({ name: user.name, password: hash });
  }

  async findUserByName(userName) {
    return await User.find({ name: userName });
  }

  async getUserId(name) {
    return (await User.findOne({ name }))._id;
  }

  async areCredentialsValid(name, password) {
    const user = await User.findOne({ name });
    if (!user || !(await bcrypt.compare(password, user.password))) {
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

  async checkUserOwnsTable(userId, tableId) {
    return (await TableService.getTable(tableId)).user !== userId;
  }
}

export default new UserService();
