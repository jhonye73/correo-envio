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
  const firmaHtml = `
  <hr />
  <p><strong>PILGRIM Security Ltda.</strong><br />
  Carrera 13 No 94ª 26 Oficina 302, Bogotá, Colombia<br />
  Pbx: +60 (1) 7560730 Ext. 111<br />
  Cel: +57 3163696420 - 3155449993<br />
  Línea de emergencia fijo: 7560903<br />
  E-mail: <a href="mailto:centrodeoperaciones@pilgrimsecurity.net">centrodeoperaciones@pilgrimsecurity.net</a>
  </p>
  <p><em>No ofrecemos servicios, brindamos soluciones a nuestros clientes.</em><br />
  <em>We don't offer services, we provide solutions to our clients.</em></p>
  <p><strong>Privacidad:</strong> Tus datos serán tratados según la Ley 1581 de 2012. Más info en <a href="https://www.pilgrimsecurity.net">www.pilgrimsecurity.net</a>.</p>
  <p><strong>Confidencialidad:</strong> Este mensaje es privado. Si lo recibiste por error, notifícanos y elimínalo.</p>
`;

const htmlFinal = `
  <html>
    <head>
      <meta charset="UTF-8" />
    </head>
    <body>
      ${html}
      ${firmaHtml}
    </body>
  </html>
`;


   const mailOptions = {
    from: '"SIP PILGRIM" <sippilgrim@gmail.com>',
    to: correos.join(","),
    subject: subject || "Sin asunto",
    text: text || "Sin mensaje",
    html:htmlFinal,
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



