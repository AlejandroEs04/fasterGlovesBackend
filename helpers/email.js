import nodemailer from "nodemailer";

export const emailRegistro = async(datos) => {
  const { email, name, token } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "2004.estrada.lopez@gmail.com",
      pass: "rQ9PwsIb3cNGvYA4"
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
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "2004.estrada.lopez@gmail.com",
      pass: "rQ9PwsIb3cNGvYA4"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: email, 
    subject: 'Restablece tu contraseña',
    text: "Restablece tu contraseña",
    html: `
    <div style="width: 100%; display: flex; justify-content: center;">
      <div 
          style="
              padding: 12px 25px; 
              background: rgb(236,235,240); 
              border-radius: 10px;
          "
      >
          <div style="display: flex; justify-content: center; margin: 5px;">
              <img src="https://res.cloudinary.com/dmap6p5wl/image/upload/v1710427606/virwisquntihlcqpi7zu.png" alt="" style="width: 120px;">
          </div>
          
          <p style="margin: 20px 0 5px 0;">Hola: ${name} Has solicitado restablecer tu contraseña en FazterShop</p>
          <p style="margin: 5px 0;">Ingresa al siguiente enlace para poder restablecer tu contraseña:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password/${token}" style="text-decoration: none; color: #0284c7; font-weight: 800;">Restablecer Password</a>

          <br>
          <p>Si tu no solicitaste restablecer tu password, ignora este mensaje</p>
      </div>
    </div>
     `
  });
};

export const emailBuyComplete = async(datos) => {
  const { name, email, address, buyID } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "2004.estrada.lopez@gmail.com",
      pass: "rQ9PwsIb3cNGvYA4"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: email, 
    subject: 'Tu compra se ha realizado con exito',
    text: "Tu compra se ha realizado con exito, tu pedido ha sido recivido y será enviado en las proximas 24 horas",
    html: `
      <div style="width: 100%; display: flex; justify-content: center;">
        <div 
            style="
                padding: 12px 25px; 
                background: rgb(236,235,240); 
                border-radius: 10px;
            "
        >
            <div style="display: flex; justify-content: center; margin: 5px;">
                <img src="https://res.cloudinary.com/dmap6p5wl/image/upload/v1710427606/virwisquntihlcqpi7zu.png" alt="" style="width: 120px;">
            </div>
            
            <p style="margin: 20px 0 5px 0;">Hola: <span style="font-weight: 800; color: #0284c7;">${name}</span> Tu pedido con el id ${buyID} se ha realizado con exito</p>
            <p style="margin: 5px 0;">El pedido se enviara a la sigueinte direccion: ${address}</p>
            <p style="margin: 5px 0;">Si quieres saber más informacion de tu pedido, ingrese <a href="${process.env.FRONTEND_URL}/buy/${buyID}" style="text-decoration: none; color: #0284c7; font-weight: 800;">Aqui</a></p>
            <br>
            <p style="margin: 5px 0;">Tu pedido deberia llegar en las siguientes 24 horas mientras pertenezcas al Area metropoliana de Monterrey</p>
            <p style="margin: 5px 0;">Cualquier duda o aclaración, ingrese <a href="${process.env.FRONTEND_URL}/support" style="text-decoration: none; color: #0284c7; font-weight: 800;">Atención a clientes</a></p>
        </div>
      </div>
     `
  });
}

export const emailBuyCompleteAdmin = async(datos) => {
  const { name, email, phone, address, buyID, date } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "2004.estrada.lopez@gmail.com",
      pass: "rQ9PwsIb3cNGvYA4"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: 'c.estrada.80.mtz@gmail.com', 
    subject: 'Nueva Compra',
    text: "Se ha realizado una nueva compra",
    html: `
      <div style="width: 100%; display: flex; justify-content: center;">
        <div 
            style="
                padding: 12px 25px; 
                background: rgb(236,235,240); 
                border-radius: 10px;
            "
        >
            <div style="display: flex; justify-content: center; margin: 5px;">
                <img src="https://res.cloudinary.com/dmap6p5wl/image/upload/v1710427606/virwisquntihlcqpi7zu.png" alt="" style="width: 120px;">
            </div>
            
            <p style="margin: 20px 0 5px 0;">Una nueva compra se realizo el: ${date}</p>
            <p style="margin: 5px 0;">Direccion del envio: ${address}</p>
            <p style="margin: 5px 0;">Nombre del usuario: ${name}</p>
            <p style="margin: 5px 0;">Correo del usuario: ${email}</p>
            <p style="margin: 5px 0;">Numero del usuario: ${phone}</p>
            <p style="margin: 5px 0;">Más informacion de la compra: <a href="${process.env.FRONTEND_URL}/buy/${buyID}" style="text-decoration: none; color: #0284c7; font-weight: 800;">Ingrese aquí</a></p>
        </div>
      </div>
     `
  });
}

export const emailOnTheWay = async(datos) => {
  const { name, email, address, buyID } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "2004.estrada.lopez@gmail.com",
      pass: "rQ9PwsIb3cNGvYA4"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: email, 
    subject: 'Tu pedido esta en camino',
    text: "Tu pedido actualmente esta en reparto",
    html: `
      <div style="width: 100%; display: flex; justify-content: center;">
        <div 
            style="
                padding: 12px 25px; 
                background: rgb(236,235,240); 
                border-radius: 10px;
            "
        >
            <div style="display: flex; justify-content: center; margin: 5px;">
                <img src="https://res.cloudinary.com/dmap6p5wl/image/upload/v1710427606/virwisquntihlcqpi7zu.png" alt="" style="width: 120px;">
            </div>
            
            <p style="margin: 20px 0 5px 0;">Hola: ${name} Tu pedido con el id ${buyID} </p>
            <p style="margin: 5px 0;">Esta siendo enviado a la siguiente direccion: ${address}</p>
            <p style="margin: 5px 0;">Si quieres saber más informacion de tu pedido, ingrese <a href="${process.env.FRONTEND_URL}/buy/${buyID}" style="text-decoration: none; color: #0284c7; font-weight: 800;">Aqui</a></p>
            <br>
            <p style="margin: 5px 0;">Tu pedido deberia llegar en un horario de 10:00am a 8:00pm</p>
            <br>
            <p style="margin: 5px 0;">Cualquier duda o aclaración, ingrese <a href="${process.env.FRONTEND_URL}/support" style="text-decoration: none; color: #0284c7; font-weight: 800;">Atención a clientes</a></p>
        </div>
      </div>
     `
  });
}

export const emailDelivered = async(datos) => {
  const { name, email, address, buyID } = datos;

  // TODO: PASAR LOS DATOS A VARIABLES DE ENTORNO
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "2004.estrada.lopez@gmail.com",
      pass: "rQ9PwsIb3cNGvYA4"
    }
  });

  // Email info
  await transport.sendMail({
    from: '"Faster-Guantes" <cuentas@faztershop.com>',
    to: email, 
    subject: 'Tu pedido fue entregado',
    text: "Tu pedido se ha entregado correctamente",
    html: `
      <div style="width: 100%; display: flex; justify-content: center;">
        <div 
            style="
                padding: 12px 25px; 
                background: rgb(236,235,240); 
                border-radius: 10px;
            "
        >
            <div style="display: flex; justify-content: center; margin: 5px;">
                <img src="https://res.cloudinary.com/dmap6p5wl/image/upload/v1710427606/virwisquntihlcqpi7zu.png" alt="" style="width: 120px;">
            </div>
            
            <p style="margin: 20px 0 5px 0;">Hola: <span style="font-weight: 800; color: #0284c7;">${name}</span> Tu pedido con el id ${buyID} </p>
            <p style="margin: 5px 0;">Ha sido entregado a la direccion: ${address}</p>
            <p style="margin: 5px 0;">Si quieres saber más informacion de tu pedido, ingrese <a href="${process.env.FRONTEND_URL}/buy/${buyID}" style="text-decoration: none; color: #0284c7; font-weight: 800;">Aqui</a></p>
            <br>
            <p style="margin: 5px 0;">Cualquier duda o aclaración, ingrese <a href="${process.env.FRONTEND_URL}/support" style="text-decoration: none; color: #0284c7; font-weight: 800;">Atención a clientes</a></p>
        </div>
      </div>
     `
  });
}