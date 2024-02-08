import nodemailer from "nodemailer";

export const emailRegistro = async(datos) => {
  const { email, name, token } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3b338730057713",
      pass: "ea1bf9fbc64406"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: email, 
    subject: 'Confirmar cuenta',
    text: "Comprueba tu cuenta en FazterShop-Guantes",
    html: `
      <p>Hola: ${name} comprueba tu cuenta en FazterShop</p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Comprobar cuenta</a>

      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
     `
  });
};

export const emailForgetPassword = async(datos) => {
  const { email, name, token } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3b338730057713",
      pass: "ea1bf9fbc64406"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: email, 
    subject: 'Restablece tu contraseña',
    text: "Restablece tu contraseña",
    html: `
      <p>Hola: ${name} Has solicitado restablecer tu contraseña en FazterShop</p>
      <p>Ingres al siguiente enlace para poder restablecer tu contraseña:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Restablecer Password</a>

      <p>Si tu no solicitaste restablecer tu password, ignora este mensaje</p>
     `
  });
};