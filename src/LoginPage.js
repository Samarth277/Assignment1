import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const LoginPage = ({ handleLogin }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPPage, setShowOTPPage] = useState(false);

  const sendOTP = async () => {
    try {
      const response = await axios.post(
        'https://storebh.bhaaraterp.com/api/login/',
        {
          mobile_number: mobileNumber,
        }
      );
      console.log(response.data); // Assuming the response contains the login token
      setShowOTPPage(true);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        'https://storebh.bhaaraterp.com/api/verify-login-otp/',
        {
          mobile_otp: otp,
          mobile_number: mobileNumber,
          type: 'web',
          registration_token: '',
        }
      );
      console.log(response.data); // Assuming the response contains the verification success message
      // Redirect to the Profile Page or perform any other actions
      handleLogin(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        {!showOTPPage && (
          <div>
            <div className="second-input">
              <input
                type="text"
                className="email"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="login-button">
              <button className="button" onClick={sendOTP}>
                Send OTP
              </button>
            </div>
          </div>
        )}

        {showOTPPage && (
          <div>
            <div className="second-input">
              <input
                type="text"
                className="email"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="login-button">
              <button className="button" onClick={verifyOTP}>
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
