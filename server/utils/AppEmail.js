const nodmailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
class AppEmail {
  constructor(user, url) {
    this.user = user;
    this.url = url;
  }
  createTransbort() {
    return nodmailer.createTransport({
      port: process.env.PORTS,

      host: process.env.HOST,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });
  }
  async send(temp, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${temp}.pug`, {
      firstName: this.user.name.split(' ')[0],
      url: this.url,
    });
    const mailOption = {
      from: `Gm <${process.env.GM}>`,
      to: this.user.email,
      html,
      subject,
      text: htmlToText(html),
    };
    await this.createTransbort().sendMail(mailOption);
  }
  async sendWelcom() {
    await this.send('welcom', 'Welcome to Natours, we are glad to have you');
  }
  async sendReset() {
    await this.send('resetPassword', 'forgot password will expier after 10m');
  }
}
exports.AppEmail = AppEmail;
