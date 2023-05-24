import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: ' Username & Password are required!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (e) {
      return res
        .status(400)
        .json({ message: ' Username or password incorecct!' });
    }

    // Check password
    if (!user.checkPassword(password)) {
      return res
        .status(400)
        .json({ message: 'Username or Password are incorrect!' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ message: 'OK', token, userId: user.id, role: user.role });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res
        .status(400)
        .json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: 'Somenthing goes wrong!' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old Password' });
    }

    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ message: 'Password change!' });
  };

  // static forgotPassword = async (req: Request, res: Response) => {
  //   const { username } = req.body;
  //   if (!username) {
  //     return res.status(400).json({ message: 'Se requiere nombre de usuario' });
  //   }

  //   const message =
  //     'Revise su correo electrónico para obtener un enlace para restablecer su contraseña';
  //   let verificactionLink;
  //   let emailStatus = 'Ok';

  //   const userRepository = getRepository(Users);
  //   let user: Users;
  //   try {
  //     user = await userRepository.findOneOrFail({ where: { username } });
  //     const token = jwt.sign(
  //       { userId: user.id, username: user.username },
  //       config.jwtSecret,
  //       { expiresIn: '10m' }
  //     );
  //     verificactionLink = `http://localhost:3000/new-password${token}`;
  //     user.resetToken = token;
  //   } catch (error) {
  //     return res.json({ message });
  //   }

  //   //Envio de Email

  //   try {
  //   } catch (error) {
  //     emailStatus = error;
  //     return res.status(400).json({ message: '¡Algo va mal!' });
  //   }

  //   try {
  //     await userRepository.save(user);
  //   } catch (error) {
  //     emailStatus = error;
  //     return res.status(400).json({ message: '¡Algo va mal!!' });
  //   }

  //   res.json({ message, info: emailStatus });
  // };

  //New password
  //   static createNewPassword = async (req: Request, res: Response) => {
  //     const { newPassword } = req.body;
  //     const resetToken = req.headers.reset as string;
  //     if (!(resetToken && newPassword)) {
  //       res.status(400).json({ message: 'Todos los campos son obligatorios' });
  //     }

  //     const userRespository = getRepository(Users);
  //     let jwtPayload;
  //     let user: Users;

  //     try {
  //       jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
  //       user = await userRespository.findOneOrFail({ where: { resetToken } });
  //     } catch (error) {
  //       return res.status(401).json({ message: error });
  //     }
  //     user.password = newPassword;
  //     const validtionOps = { validationError: { target: false, value: false } };
  //     const errors = await validate(user, validtionOps);
  //     if (errors.length > 0) {
  //       return res.status(400).json(errors);
  //     }

  //     try {
  //       user.hashPassword();
  //       await userRespository.save(user);
  //     } catch (error) {
  //       return res.status(400).json({ message: error });
  //     }
  //     res.json({ message: 'Contraseña cambiada' });
  //   };
}
export default AuthController;
