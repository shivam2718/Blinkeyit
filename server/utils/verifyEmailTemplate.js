const verifyEmailTemplate = ({name,url}) => {
return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #333;">Welcome to Blinkeyit!</h2>
    <p>Dear ${name},</p>
    <p>Thank you for registering with Blinkeyit. To complete your registration, please verify your email address by clicking the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email Address
        </a>
    </div>
    <p style="color: #666; font-size: 14px;">If you didn't create an account with Blinkeyit, please ignore this email.</p>
    <hr style="border: 1px solid #eee; margin: 20px 0;">
    <p style="color: #999; font-size: 12px;">Best regards,<br>The Blinkeyit Team</p>
</body>
</html>
`
}

export default verifyEmailTemplate;