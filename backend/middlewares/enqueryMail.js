// const multer = require("multer");
// const sharp = require("sharp");
// const path = require("path");
// const fs = require("fs");
var nodemailer = require('nodemailer');
const enqueryPropertyMail =  async (req, res) => {
  const { name, email,phone,budget, message,propertyname,buildername,builderemail } = req.body;

  try {
    // 1. Create transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // or use host, port for custom SMTP
    //   auth: {
    //     user: 'devakoode@gmail.com',
    //     pass: 'dqixhlddcbwsbgjx',
    //   },
    // });
// const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,            // use SSL
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    //   logger: true,            // log to console
    //   debug: true,             // include SMTP traffic in logs
    // });
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 2525,
        secure: false, // TLS will be used automatically
        auth: {
          user: "smtp@wegrowinfraventures.com",
          pass: "DXK!s+c",
        }
      });
let messagehtml =`<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<style>
    *{ margin: 0; padding: 0;}
   
.coin-bal-table th, .coin-bal-table td{
    text-align: left;
    font-size: 14px;
    padding: 10px;
}
</style>
</head>
<body>
    <table width="100%" bgcolor="#fefefe" align="center" style=" background: #fefefe; width: 100%; text-align: center; font-size: 10pt; font-family: Arial, Helvetica, sans-serif;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="border: 1px solid #eee">
                   <tr>
                    <td colspan="3" height="20">&nbsp;</td>
                   </tr>
                    <tr>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                        <td width="50%" style="width: 80px;" align="center">
                            <a href="${process.env.SITE_URL}" target="_blank">
                                <img src="https://wegrowinfraventures.com/assets/images/header-logo2.png" alt="WEGROW INFRAVENTURES PRIVATE LIMITED" style="max-width: 100%;height: auto;display: block;">
                            </a>
                        </td>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="background: #000000; height: 60px;border: 1px solid #eee">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                        <td align="right" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="25">&nbsp;</td>
        </tr>
        
        <tr>
            <td align="center">
                <table width="1000" cellspacing="15" cellpaddig="0">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 20px; font-weight: 700;">
                            Dear WEGROW INFRAVENTURES PRIVATE LIMITED
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="2" border="1" style="border-color: #ccc;" class="coin-bal-table">
                                <tr>
                                    <th>Name</th>
                                    <td>${name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>${email}</td>
                                </tr>
<tr>
                                    <th>Phone</th>
                                    <td>${phone}</td>
                                </tr>
<tr>
                                    <th>Budget</th>
                                    <td>${budget}</td>
                                </tr>
                                <tr>
                                    <th>Property Name</th>
                                    <td>${propertyname}</td>
                                </tr>
                                 <tr>
                                    <th>Saller Name</th>
                                    <td>${buildername}</td>
                                </tr>

                                
                                 <tr>
                                    <th>Message</th>
                                    <td>${message}
                                    </td>
                                </tr>
                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                   
                    
                   
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 28px; font-weight: 700;">
                         Buying a property is more than a transaction
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`
    // 2. Setup email data
    // const mailOptions = {
    //   from: `"${name}" <${email}>`,
    //   to: 'eati@akoode.in', // Your business or support email
    //   subject: 'New Enquiry Form Submission',
    //   html: `
    //     <h3>New Enquiry</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // };
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'eati@akoode.in', // Your business or support email
      subject: 'New Enquiry Form property',
      html: `${messagehtml}`,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
    console.log('Enquiry sent successfully!' )

    res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });
  } catch (error) {
    console.error('Error sending enquiry email:', error);
    res.status(500).json({ success: false, message: 'Failed to send enquiry.' });
  }
 
};
const enqueryPropertyMailSeller =  async (req, res) => {
  const { name, email,phone,budget, message,propertyname,buildername,builderemail } = req.body;

  try {
    // 1. Create transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // or use host, port for custom SMTP
    //   auth: {
    //     user: 'devakoode@gmail.com',
    //     pass: 'dqixhlddcbwsbgjx',
    //   },
    // });
     let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 2525,
        secure: false, // TLS will be used automatically
        auth: {
          user: "smtp@wegrowinfraventures.com",
          pass: "DXK!s+c",
        }
      });

    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,            // use SSL
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    //   logger: true,            // log to console
    //   debug: true,             // include SMTP traffic in logs
    // });
let messagehtml =`<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<style>
    *{ margin: 0; padding: 0;}
   
.coin-bal-table th, .coin-bal-table td{
    text-align: left;
    font-size: 14px;
    padding: 10px;
}
</style>
</head>
<body>
    <table width="100%" bgcolor="#fefefe" align="center" style=" background: #fefefe; width: 100%; text-align: center; font-size: 10pt; font-family: Arial, Helvetica, sans-serif;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="border: 1px solid #eee">
                   <tr>
                    <td colspan="3" height="20">&nbsp;</td>
                   </tr>
                    <tr>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                        <td width="50%" style="width: 80px;" align="center">
                            <a href="${process.env.SITE_URL}" target="_blank">
                                <img src="https://wegrowinfraventures.com/assets/images/header-logo2.png" alt="WEGROW INFRAVENTURES PRIVATE LIMITED" style="max-width: 100%;height: auto;display: block;">
                            </a>
                        </td>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="background: #000000; height: 60px;border: 1px solid #eee">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                        <td align="right" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="25">&nbsp;</td>
        </tr>
        
        <tr>
            <td align="center">
                <table width="1000" cellspacing="15" cellpaddig="0">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 20px; font-weight: 700;">
                            Dear ${buildername}
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="2" border="1" style="border-color: #ccc;" class="coin-bal-table">
                                <tr>
                                    <th>Name</th>
                                    <td>${name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>${email}</td>
                                </tr>
<tr>
                                    <th>Phone</th>
                                    <td>${phone}</td>
                                </tr>
<tr>
                                    <th>Budget</th>
                                    <td>${budget}</td>
                                </tr>
                                <tr>
                                    <th>Property Name</th>
                                    <td>${propertyname}</td>
                                </tr>

                                
                                 <tr>
                                    <th>Message</th>
                                    <td>${message}
                                    </td>
                                </tr>
                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                   
                    
                   
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 28px; font-weight: 700;">
                         Buying a property is more than a transaction
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`
    // 2. Setup email data
    // const mailOptions = {
    //   from: `"${name}" <${email}>`,
    //   to: 'eati@akoode.in', // Your business or support email
    //   subject: 'New Enquiry Form Submission',
    //   html: `
    //     <h3>New Enquiry</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // };
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: `${builderemail}`, // Your business or support email
      // to: `eati@akoode.in`, // Your business or support email
      subject: 'New Enquiry Form WEGROW INFRAVENTURES property',
      html: `${messagehtml}`,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
    console.log('Enquiry sent successfully!' )

    res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });
  } catch (error) {
    console.error('Error sending enquiry email:', error);
    res.status(500).json({ success: false, message: 'Failed to send enquiry.' });
  }
 
};
const enqueryContactMail = async (req, res) => {
  console.log("📧 Enquiry mail triggered");

  const { name, email, phone, message, date } = req.body;
  console.log("Received Enquiry:", { name, email, phone, message, date });

  try {
    // 1. Setup transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 2525,
        secure: false, // TLS will be used automatically
        auth: {
          user: "smtp@wegrowinfraventures.com",
          pass: "DXK!s+c",
        }
      });

    // 2. Prepare email content
    // const mailOptions = {
    //   from: `"${name}" <${email}>`,
    //   to: 'eati@akoode.in',
    //   subject: 'New Enquiry Form Submission',
    //   html: `
    //     <h3>New Enquiry</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Meeting Date:</strong> ${date}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // };

    let messagehtml =`<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<style>
    *{ margin: 0; padding: 0;}
   
.coin-bal-table th, .coin-bal-table td{
    text-align: left;
    font-size: 14px;
    padding: 10px;
}
</style>
</head>
<body>
    <table width="100%" bgcolor="#fefefe" align="center" style=" background: #fefefe; width: 100%; text-align: center; font-size: 10pt; font-family: Arial, Helvetica, sans-serif;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="border: 1px solid #eee">
                   <tr>
                    <td colspan="3" height="20">&nbsp;</td>
                   </tr>
                    <tr>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                        <td width="50%" style="width: 80px;" align="center">
                            <a href="${process.env.SITE_URL}" target="_blank">
                                <img src="https://wegrowinfraventures.com/assets/images/header-logo2.png" alt="WEGROW INFRAVENTURES PRIVATE LIMITED" style="max-width: 100%;height: auto;display: block;">
                            </a>
                        </td>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="background: #000000; height: 60px;border: 1px solid #eee">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                        <td align="right" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="25">&nbsp;</td>
        </tr>
        
        <tr>
            <td align="center">
                <table width="1000" cellspacing="15" cellpaddig="0">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 20px; font-weight: 700;">
                            Dear WEGROW INFRAVENTURES PRIVATE LIMITED
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="2" border="1" style="border-color: #ccc;" class="coin-bal-table">
                                <tr>
                                    <th>Name</th>
                                    <td>${name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>${email}</td>
                                </tr>
<tr>
                                    <th>Phone</th>
                                    <td>${phone}</td>
                                </tr>
<tr>
                                    <th>Meeting Date</th>
                                    <td>${date}</td>
                                </tr>

                                
                                 <tr>
                                    <th>Message</th>
                                    <td>${message}
                                    </td>
                                </tr>
                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                   
                    
                   
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 28px; font-weight: 700;">
                         Buying a property is more than a transaction
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`

const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'eati@akoode.in',
      subject: 'New Enquiry Form Submission',
      html: `${messagehtml}`,
    };
    // 3. Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ success: false, message: 'Failed to send enquiry. Please try again later.' });
  }
};

const enqueryBrochureMail = async (req, res) => {

  const { name,  phone, propertyname } = req.body;

  try {
    // 1. Setup transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 2525,
        secure: false, // TLS will be used automatically
        auth: {
          user: "smtp@wegrowinfraventures.com",
          pass: "DXK!s+c",
        }
      });
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.mailgun.org",
    //     port: 2525,
    //     secure: false, // TLS will be used automatically
    //     auth: {
    //       user: "smtp@wegrowinfraventures.com",
    //       pass: "DXK!s+c",
    //     }
    //   });

    // 2. Prepare email content
    // const mailOptions = {
    //   from: `"${name}" <${email}>`,
    //   to: 'eati@akoode.in',
    //   subject: 'New Enquiry Form Submission',
    //   html: `
    //     <h3>New Enquiry</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Meeting Date:</strong> ${date}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // };

    let messagehtml =`<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<style>
    *{ margin: 0; padding: 0;}
   
.coin-bal-table th, .coin-bal-table td{
    text-align: left;
    font-size: 14px;
    padding: 10px;
}
</style>
</head>
<body>
    <table width="100%" bgcolor="#fefefe" align="center" style=" background: #fefefe; width: 100%; text-align: center; font-size: 10pt; font-family: Arial, Helvetica, sans-serif;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="border: 1px solid #eee">
                   <tr>
                    <td colspan="3" height="20">&nbsp;</td>
                   </tr>
                    <tr>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                        <td width="50%" style="width: 80px;" align="center">
                            <a href="${process.env.SITE_URL}" target="_blank">
                                <img src="https://wegrowinfraventures.com/assets/images/header-logo2.png" alt="WEGROW INFRAVENTURES PRIVATE LIMITED" style="max-width: 100%;height: auto;display: block;">
                            </a>
                        </td>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="background: #000000; height: 60px;border: 1px solid #eee">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                        <td align="right" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="25">&nbsp;</td>
        </tr>
        
        <tr>
            <td align="center">
                <table width="1000" cellspacing="15" cellpaddig="0">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 20px; font-weight: 700;">
                            Dear WEGROW INFRAVENTURES PRIVATE LIMITED
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="2" border="1" style="border-color: #ccc;" class="coin-bal-table">
                                <tr>
                                    <th>Name</th>
                                    <td>${name}
                                    </td>
                                </tr>
                               
<tr>
                                    <th>Phone</th>
                                    <td>${phone}</td>
                                </tr>
<tr>
                                    <th>Property</th>
                                    <td>${propertyname}</td>
                                </tr>

                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                   
                    
                   
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 28px; font-weight: 700;">
                         Buying a property is more than a transaction
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`

const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'eati@akoode.in',
      subject: 'New Enquiry Form Submission',
      html: `${messagehtml}`,
    };
    // 3. Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ success: false, message: 'Failed to send enquiry. Please try again later.' });
  }
};


const enquerySubscribeMail = async (req, res) => {

  const { email } = req.body;

  try {
    // 1. Setup transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //  auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });

    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 2525,
        secure: false, // TLS will be used automatically
        auth: {
          user: "smtp@wegrowinfraventures.com",
          pass: "DXK!s+c",
        }
      });

    let messagehtml =`<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<style>
    *{ margin: 0; padding: 0;}
   
.coin-bal-table th, .coin-bal-table td{
    text-align: left;
    font-size: 14px;
    padding: 10px;
}
</style>
</head>
<body>
    <table width="100%" bgcolor="#fefefe" align="center" style=" background: #fefefe; width: 100%; text-align: center; font-size: 10pt; font-family: Arial, Helvetica, sans-serif;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="border: 1px solid #eee">
                   <tr>
                    <td colspan="3" height="20">&nbsp;</td>
                   </tr>
                    <tr>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                        <td width="50%" style="width: 80px;" align="center">
                            <a href="${process.env.SITE_URL}" target="_blank">
                                <img src="https://wegrowinfraventures.com/assets/images/header-logo2.png" alt="WEGROW INFRAVENTURES PRIVATE LIMITED" style="max-width: 100%;height: auto;display: block;">
                            </a>
                        </td>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="background: #000000; height: 60px;border: 1px solid #eee">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                        <td align="right" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="25">&nbsp;</td>
        </tr>
        
        <tr>
            <td align="center">
                <table width="1000" cellspacing="15" cellpaddig="0">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 20px; font-weight: 700;">
                            Dear WEGROW INFRAVENTURES PRIVATE LIMITED
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="2" border="1" style="border-color: #ccc;" class="coin-bal-table">
                               
                               
<tr>
                                    <th>Email</th>
                                    <td>${email}</td>
                                </tr>

                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                   
                    
                   
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 28px; font-weight: 700;">
                         Buying a property is more than a transaction
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`

const mailOptions = {
      from: `Wegrow <${email}>`,
      to: 'eati@akoode.in',
      subject: 'New Enquiry Form subscribe',
      html: `${messagehtml}`,
    };
    // 3. Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ success: false, message: 'Failed to send enquiry. Please try again later.' });
  }
};
const enqueryLandingMail = async (req, res) => {

  const { name,  phone, pagename } = req.body;

  try {
    // 1. Setup transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 2525,
        secure: false, // TLS will be used automatically
        auth: {
          user: "smtp@wegrowinfraventures.com",
          pass: "DXK!s+c",
        }
      });

    let messagehtml =`<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<style>
    *{ margin: 0; padding: 0;}
   
.coin-bal-table th, .coin-bal-table td{
    text-align: left;
    font-size: 14px;
    padding: 10px;
}
</style>
</head>
<body>
    <table width="100%" bgcolor="#fefefe" align="center" style=" background: #fefefe; width: 100%; text-align: center; font-size: 10pt; font-family: Arial, Helvetica, sans-serif;" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="border: 1px solid #eee">
                   <tr>
                    <td colspan="3" height="20">&nbsp;</td>
                   </tr>
                    <tr>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                        <td width="50%" style="width: 80px;" align="center">
                            <a href="${process.env.SITE_URL}" target="_blank">
                                <img src="https://wegrowinfraventures.com/assets/images/header-logo2.png" alt="WEGROW INFRAVENTURES PRIVATE LIMITED" style="max-width: 100%;height: auto;display: block;">
                            </a>
                        </td>
                        <td width="25%" style="width: 250px;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="1000" cellspacing="10" cellpaddig="0" style="background: #000000; height: 60px;border: 1px solid #eee">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                        <td align="right" style=" text-transform: uppercase; font-family:verdana; color: #fff; font-size: 15px; font-weight: 500;">
                            &nbsp;
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="25">&nbsp;</td>
        </tr>
        
        <tr>
            <td align="center">
                <table width="1000" cellspacing="15" cellpaddig="0">
                    <tr>
                        <td align="left" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 20px; font-weight: 700;">
                            Dear WEGROW INFRAVENTURES PRIVATE LIMITED
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center">
                            <table width="100%" cellspacing="0" cellpadding="2" border="1" style="border-color: #ccc;" class="coin-bal-table">
                                <tr>
                                    <th>Name</th>
                                    <td>${name}
                                    </td>
                                </tr>
                               
<tr>
                                    <th>Phone</th>
                                    <td>${phone}</td>
                                </tr>
<tr>
                                    <th>Page</th>
                                    <td>${pagename}</td>
                                </tr>

                               

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                   
                    
                   
                    <tr>
                        <td height="15">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style=" text-transform: uppercase; font-family:verdana; color: #5b5b5b; font-size: 28px; font-weight: 700;">
                         Buying a property is more than a transaction
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`

const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'eati@akoode.in',
      subject: 'New Enquiry Form Submission',
      html: `${messagehtml}`,
    };
    // 3. Send email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).json({ success: false, message: 'Failed to send enquiry. Please try again later.' });
  }
};
module.exports = { enqueryPropertyMail,enqueryContactMail,enqueryPropertyMailSeller,enqueryBrochureMail,enquerySubscribeMail,enqueryLandingMail};
