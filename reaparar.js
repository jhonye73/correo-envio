// enviarCorreos.js
import nodemailer from "nodemailer";

// backend/sendEmail.js
import express from "express";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sippilgrim@gmail.com",
    pass: "nvoo gqvf rarv adqj", // contraseña de aplicación
  },
});

app.get('/', (req, res) => {
  res.send('Servidor de envío de correos activo.');
});
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https: data:; script-src 'self'; style-src 'self' 'unsafe-inline';");
  next();
});


app.post("/", async (req, res) => {
  const { correos, subject, text, html } = req.body;

   const mailOptions = {
    from: '"SIP PILGRIM" <sippilgrim@gmail.com>',
    to: correos.join(","),
    subject: subject || "Sin asunto",
    text: text || "Sin mensaje",
    html:`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.5;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #666;
      }
      .emphasis {
        font-weight: bold;
        color: #005b96;
      }
    </style>
  </head>
  <body>
    <h2>Infocenter</h2>
    <p class="emphasis">PILGRIM Security Ltda.</p>

    <p>
      Carrera 13 No 94ª 26 Oficina 302<br />
      Bogotá, Colombia<br />
      <strong>Pbx:</strong> +60 (1) 7560730 Ext. 111<br />
      <strong>Cel:</strong> +57 316 3696420 - 315 5449993<br />
      <strong>Línea de emergencia fijo:</strong> 7560903<br />
      <strong>Email:</strong>
      <a href="mailto:centrodeoperaciones@pilgrimsecurity.net">
        centrodeoperaciones@pilgrimsecurity.net
      </a>
    </p>

    <p><em>No ofrecemos servicios, brindamos soluciones a nuestros clientes.</em></p>
    <p><em>We don't offer services, we provide solutions to our clients.</em></p>

    <div class="footer">
      <p><strong>PRIVACIDAD DE DATOS:</strong> Te informamos que tus datos personales serán tratados por Pilgrim Security Ltda. conforme a lo previsto en la Ley 1581 de 2012. El tipo de tratamiento, la finalidad de este y los derechos que te asisten pueden ser consultados en nuestra política de tratamiento de datos personales disponible en <a href="https://www.pilgrimsecurity.net">www.pilgrimsecurity.net</a>.</p>

      <p><strong>AVISO DE CONFIDENCIALIDAD:</strong> Este mensaje es privado y confidencial. Si lo recibiste por error, por favor notifícanos y elimínalo de tu sistema.</p>
    </div>
  </body>
</html>
`
,
     };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, response: info.response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});



