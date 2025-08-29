class LoginPage {
  usernameTxt = 'username';
  passwordTxt = 'password';
  loginSubmitBtn = '#login-submit';
  loginErrorFrm = '[data-testid="form-error"]';
  skip2FAPromoBtn = '#mfa-promote-dismiss';
}

module.exports = new LoginPage();
