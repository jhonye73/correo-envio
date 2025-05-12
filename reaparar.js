const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/enviar-correo", async (req, res) => {
  const { correos } = req.body;

  try {
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sippilgrim@gmail.com",
    pass: "nvoo gqvf rarv adqj", // contraseña de aplicación
  },
});

    for (const correo of correos) {
      await transporter.sendMail({
        from: '"Sistema" <tucorreo@gmail.com>',
        to: correo,
        subject: "Correo masivo desde Node.js",
        text: "¡Este es un correo enviado automáticamente!",
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error al enviar:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

