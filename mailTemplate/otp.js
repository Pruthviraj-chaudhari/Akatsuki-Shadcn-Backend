const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Akatsuki Connect</title>
      <style>
        /* Reset CSS */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
          background-color: #000000; /* Background color */
          color: #ffffff; /* Text color */
        }
        /* Main container */
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        /* Header */
        .header {
          padding-top: 20px;
          text-align: center;
        }
        .header img {
          width: 100px;
          margin: 5px;
          margin-bottom: 0;
        }
        .header h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 10px;
        }
        /* Main content */
        .content {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #000000; /* Card background color */
          padding: 20px;
          max-width: 90vw;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          overflow: hidden;
        }
        .card-title {
          font-size: 2rem;
          font-weight: bold;
          margin: 10px 0;
        }
        .card-subtitle {
          font-size: 1.5rem;
          font-weight: bold;
          color: #9b9b9b;
          margin: 10px 0;
          margin-bottom: 50px;
          text-align: center;
        }
        .card-description {
          text-align: center;
          margin-bottom: 20px;
        }
        p {
          color: #666;
          font-weight: 500;
        }
        .otp {
          font-size: 2.4rem;
          letter-spacing: 5px;
          font-weight: bold;
          margin-top: 30px;
        }
        .name {
          font-size: 1.1rem;
        }
        /* Footer */
        .footer {
          text-align: center;
          padding: 20px 0;
        }
        .footer a {
          text-decoration: none;
        }
        span {
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img class="" src="https://i.ibb.co/mb0W3LS/pngegg.png" alt="" />
          <img
            class=""
            src="https://www.rcpit.ac.in/uploads/1599837268.png"
            alt=""
          />
          <h1 class="card-title">Akatsuki Coding Club</h1>
  
          <div class="content">
            <div class="card-subtitle">Email Verification</div>
            <div class="card-description">
              <p>Dear User,</span></p>
              <br />
              <p>Thank you for signing up for Akatsuki Connect!</p>
              <br />
              <p>
                Please use the following OTP (One-Time Password) to verify your
                account:
              </p>
              <br />
              <div class="otp">${otp}</div>
              <br />
              <br />
              <p>
                If you did not sign up for Akatsuki Connect, please ignore this
                email.
              </p>
            </div>
          </div>
          <div class="footer">
            <p>
              Best Regards,<br /><br /><a
                href="https://akatsuki-official.onrender.com/"
                ><span>The Akatsuki Coding Club</span></a
              >
            </p>
          </div>
        </div>
       
      </div>
    </body>
  </html>
  `
}
module.exports = otpTemplate;