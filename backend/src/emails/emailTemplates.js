export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AlphaChatter</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;}
      .hero { background: linear-gradient(to right, #36D1DC, #5B86E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; color: white;}
      .card { background-color: #fff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
      .button { background: linear-gradient(to right, #36D1DC, #5B86E5); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; display:inline-block; }
    </style>
  </head>
  <body>
    <div class="hero">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg" alt="Logo" style="width:80px;height:80px;border-radius:50%;background:white;padding:8px;display:block;margin:0 auto 12px;">
      <h1 style="margin:0;font-size:28px;">Welcome to AlphaChatter!</h1>
    </div>

    <div class="card">
      <p style="font-size:16px;margin-top:0;"><strong>Hello ${name},</strong></p>
      <p>We're excited to have you join AlphaChatter. Get started by visiting your dashboard.</p>

      <div style="text-align:center;margin:24px 0;">
        <a class="button" href="${clientURL}" target="_blank" rel="noreferrer">Open AlphaChatter</a>
      </div>

      <p style="color:#666;margin:0;">If you need help, reply to this email.</p>
      <p style="color:#666;margin-top:18px;">— The AlphaChatter Team</p>
    </div>

    <footer style="text-align:center;padding:16px;color:#999;font-size:12px;">
      © ${new Date().getFullYear()} AlphaChatter. All rights reserved.
    </footer>
  </body>
  </html>
  `;
}