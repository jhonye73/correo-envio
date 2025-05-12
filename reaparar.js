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


app.post("/enviar-correo", async (req, res) => {
  const { correos } = req.body;

  const mailOptions = {
    from: '"SIP PILGRIM" <sippilgrim@gmail.com>',
    to: correos.join(","),
    subject: "revisa ya",
    text: "Hola, este es un correo masivo con Nodemailer usando import.",
    html: "<p><strong>Hola</strong>, este es un <em>correo masivo</em> con Nodemailer usando <code>import</code>.</p>",
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

