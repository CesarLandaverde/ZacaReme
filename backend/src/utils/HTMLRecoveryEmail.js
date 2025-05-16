const HTMLRecoveryEmail = (code) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Código de recuperación de contraseña</h2>
    <p>Tu código de verificación es:</p>
    <div style="font-size: 2em; font-weight: bold; color: #2d89ef; margin: 20px 0;">
      ${code}
    </div>
    <p>Este código es válido por 10 minutos.</p>
    <p>Si no solicitaste este código, puedes ignorar este correo.</p>
    <br>
    <small>Equipo ZacaReme</small>
  </div>
`;

export default HTMLRecoveryEmail;