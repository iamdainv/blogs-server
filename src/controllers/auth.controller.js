const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, phoneService } = require('../services');

// const createSpecToken = async () => {
//   const user = await authService.loginUserWithPhoneNumber('0123456789');
//   const tokens = await tokenService.generateAuthTokens(user);

//   console.log(tokens);
// };

// createSpecToken();

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);

  res.send({ user, tokens });
});

const createVerifyCode = catchAsync(async (req, res) => {
  const { fromNumberPhone } = req.query;
  const code = await phoneService.createVerityPhoneNumber(`+${fromNumberPhone}`, 'sms');

  res.send({ code });
});

const verifyCode = catchAsync(async (req, res) => {
  const { toPhoneNumber, code } = req.body;
  try {
    const result = await phoneService.verityPhoneNumber(`+${toPhoneNumber}`, code);

    if (result.status === 'approved') {
      const user = await authService.loginUserWithPhoneNumber(toPhoneNumber);
      const tokens = await tokenService.generateAuthTokens(user);

      return res.send({ tokens, user });
    }
  } catch (error) {
    return res.send({ message: error, code: httpStatus[401] });
  }
  return res.send({ message: 'Invalid Code', code: httpStatus[401] });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const loginToken = catchAsync(async (req, res) => {
  return res.status(200).send({ result: { user: req.user } });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  createVerifyCode,
  verifyCode,
  loginToken,
};
