import UserService from './UserService.js';

class UserController {
  async login(req, res) {
    try {
      const { name, password } = req.query;
      const session = await UserService.startSession(name, password);

      if (session) {
        res.cookie('sessionId', session._id, {
          httpOnly: true,
          expires: session.expires
        });
        res.json({});
        res.end();
      } else {
        res.status(401).json({ errorMessage: 'Incorrect credentials have been sent' });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async isUserLogined(req, res) {
    if (await UserService.isUserLogined(req.cookies.sessionId)) {
      res.status(200);
    } else {
      res.status(401);
    }
    res.end();
  }

  async logout(req, res) {
    await UserService.finishSession(req.cookies.sessionId);
    res.cookie('sessionId', '', { expires: new Date(0) });
    res.end();
  }

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
}

export default new UserController();
