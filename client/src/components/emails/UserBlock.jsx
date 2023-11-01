export function generateCustomerEmailMessage(rejectMainReason) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Blocked</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            padding: 30px;
            text-align: center;
        }

        h1 {
            color: #ff0000;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
        }

        p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }

        .note {
            font-weight: bold;
            background-color: #ff0000; /* Highlight color */
            color: #fff; /* Text color in the highlight */
            padding: 5px 10px; /* Add padding to the highlight */
            border-radius: 5px; /* Rounded corners for the highlight */
        }

        .footer {
            margin-top: 20px;
        }

        .footer p {
            color: #666;
            font-size: 14px;
        }

        a {
            color: #ff0000;
            text-decoration: none;
            font-weight: bold;
        }

        .logo {
            font-weight: bold;
            font-size: 24px;
        }

        .red-letter {
            color: #ff0000;
        }
    </style>
    </head>
    <body>
    <div class="container">
    <h1>User Blocked</h1> <!-- Changed the title -->
    <p>Your account with <span class="logo">ar<span class="red-letter">T</span>izon</span> has been blocked for the following reason:</p>
    <p class="note" id="blockReason">Issues with your account</p> <!-- Use JavaScript to replace this text -->
    <div class="footer">
        <p>Thank you for using our service.</p>
        <p>If you have any questions or need assistance, please contact us at <a href="mailto:artizongroup@gmail.com">artizongroup@gmail.com</a></p>
    </div>
    <div class="footer">
        <p>Follow us on Twitter:</p>
        <a href="https://twitter.com/arTizon" target="_blank">@arTizon</a>
    </div>
</div>

<script>
    const blockReasonElement = document.getElementById('blockReason');
    const reasonCode = '${rejectMainReason}'; 
    switch (reasonCode) {
        case 'reasonCode':
            blockReasonElement.innerText = 'Issues with your account';
            break;
        default:
            blockReasonElement.innerText = 'Issues with your account';
            break;
    }
</script>
</body>
</html>

    `;
  }