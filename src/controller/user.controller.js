import User from '../models/user.model.js';
import { catchError } from '../utils/error-response.js';
import { encode, decode } from '../utils/bcrypt-encrypt.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generate-token.js';
import jwt from 'jsonwebtoken';
import { transporter } from '../utils/mailer.js';
import { otpGenerator } from '../utils/otp-generator.js';
import { getCache, setCache } from '../utils/cache.js';
import { userValidator } from '../validators/user.valitadator.js';

export class userController {
  async createSuperAdmin(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const { name, email, password } = value;
      const checkSuperAdmin = await User.findOne({ role: 'superadmin' });
      if (checkSuperAdmin) {
        catchError(res, 409, "Super admin already exists");
      }

      const hashedPassword = await decode(password, 7);
      const user = await User.create({
        name,
        email,
        hashedPassword,
        role: "superadmin",
      });
      return res.status(201).json({
        statusCode: 201,
        message: "succes",
        data: user,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async createUser(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const { name, email, password } = value;
      const existUsername = await User.findOne({ email });
      if (existUsername) {
        catchError(res, 409, "User already exists");
      }

      const hashedPassword = await decode(password, 7);
      const user = await User.create({
        name,
        email,
        hashedPassword,
        role: "student",
      });
      return res.status(201).json({
        statusCode: 201,
        message: "succes",
        data: user,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllUser(_, res) {
    try {
      const users = await User.find();
      return res.status(200).json({
        statusCode: 200,
        message: "succes",
        data: users,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
  
  async getUserById(req, res) {
      try {
          const user = await User.findById(req.params.id);
          return res.status(200).json({
              statusCode: 200,
              message: 'success',
              data: user
          });
      } catch (error) {
          catchError(res, 500, error.message);
      }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      await User.findById(id);
      
      const updateUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: updateUser
      });
    } catch (error) {
      catchError(res, 500, error.message)
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user.role === 'superadmin') {
        return catchError(res, 400, 'Super admin cannot be delete');
      }
      await User.findByIdAndDelete(id);
      return res.status(200).json({
        statusCode: 200,
        message: 'Succes',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}