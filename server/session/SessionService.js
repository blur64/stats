import Session from "./Session.js";

class SessionService {
  durationInDays = 3;

  // Replace using userId instead userName
  async start(userName) {
    const expiringDate = new Date();
    expiringDate.setDate(expiringDate.getDate() + this.durationInDays);
    return await Session.create({ userName, expires: expiringDate });
  }

  async finish(sessionId) {
    return await Session.deleteOne({ _id: sessionId });
  }

  async exists(sessionId) {
    return Boolean(await Session.exists({ _id: sessionId }));
  }

  async find(sessionId) {
    return await Session.findById(sessionId);
  }
}

export default new SessionService();