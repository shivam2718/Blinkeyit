const forgotPasswordTemplate=({name,otp})=>{
return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">Dear ${name},</h2>
        
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
            You have requested to reset your password. Please use the following OTP code to complete the process. 
            <strong>Do not share this code with anyone.</strong>
        </p>

        <div style="background-color: #e9ecef; padding: 15px; margin: 20px 0; text-align: center; border-radius: 5px;">
            <span style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</span>
        </div>

        <p style="color: #dc3545; font-size: 14px;">This OTP is valid for 1 hour only.</p>

        <hr style="border: 1px solid #dee2e6; margin: 20px 0;">

        <p style="color: #555; margin-bottom: 5px;">Best regards,</p>
        <p style="color: #333; font-weight: bold; margin-top: 0;">Blinkeyit Team</p>
    </div>
</body>
</html>
`
}
export default forgotPasswordTemplate;