import UserService from './UserService.js';

class UserController {
  async create(req, res) {
    try {
      const foundUser = await UserService.findUserByName(req.body.name);

      if (foundUser.length) {
        res.json({ errorMessage: 'The user already exists' });
      } else {
        const user = await UserService.create(req.body);
        res.json(user);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getUserId(req, res) {
    try {
      const foundUser = await UserService.findUserByName(req.query.name);

      if (!foundUser.length) {
        res.json({ errorMessage: 'Incorrect user name sent' });
      } else if (foundUser[0].password !== req.query.password) {
        res.json({ errorMessage: 'Incorrect user password sent' });
      } else {
        res.json({ userId: foundUser[0]._id });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UserController();
