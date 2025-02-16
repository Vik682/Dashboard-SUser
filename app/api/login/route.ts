// pages/api/login/router.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
// Helper function to send OTP to email
const sendOtpToEmail = async (email: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/', { email });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error while sending OTP:', error.message);
      throw new Error('Failed to send OTP');
    } else {
      console.error('General Error while sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }
};

const verifyOtp = async (email: string, otp: string) => {
  try {
    // Sending a POST request to verify OTP in Django backend
    const response = await axios.post('http://localhost:8000/', { email, otp });
    return response.data; // Assuming Django returns success or failure
  } catch (error: unknown) {
    // Type error as AxiosError or any
    if (axios.isAxiosError(error)) {
      console.error('Axios Error while verifying OTP:', error.message);
      throw new Error('Failed to verify OTP');
    } else {
      console.error('General Error while verifying OTP:', error);
      throw new Error('Failed to verify OTP');
    }
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, endpoint } = body;

    if (endpoint === 'send-otp') {
      try {
        const result = await sendOtpToEmail(email);
        // Return a response with status 200 and the result data
        return NextResponse.json(result, { status: 200 });
      } catch (error: unknown) {
        // Return error response with status 500
        return NextResponse.json(
          { message: 'Failed to send OTP', error: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        );
      }
    } else if (endpoint === 'verify-otp') {
      try {
        const { otp } = body;
        const result = await verifyOtp(email, otp);
        // Return a response with status 200 and the result data
        return NextResponse.json(result, { status: 200 });
      } catch (error: unknown) {
        // Return error response with status 500
        return NextResponse.json(
          { message: 'Failed to verify OTP', error: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Unrecognized endpoint', error: 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    // Handle errors by checking for message and returning a 500 status
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}