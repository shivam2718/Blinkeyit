const generateOtp = () => {
    // Generates a 6-digit OTP between 100000 and 999999
    return Math.floor(100000 + Math.random() * 900000);
};
export default generateOtp;

/*
why no use this method

Math.random() * 1000000
This can produce numbers from 0 to 999999, which means:
Possible outputs:

0.123456 * 1000000 = 123456 ✅ (6 digits)
0.000123 * 1000000 = 123 ❌ (only 3 digits)
0.000001 * 1000000 = 1 ❌ (only 1 digit)
0.000000 * 1000000 = 0 ❌ (1 digit)
*/
