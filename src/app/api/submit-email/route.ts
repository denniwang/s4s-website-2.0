import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import mailjet from 'node-mailjet';

// Service account credentials from environment variables
const credentials = {
  type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
};

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME!;

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

// Set up Mailjet
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_API_SECRET!
);
const FROM_EMAIL = 'info@trys4s.com'; // Must be a verified sender in Mailjet
const PLAYBOOK_URL = 'https://docs.google.com/document/d/e/2PACX-1vSrgGRs8JIRVs2Rk6VHrulEImN6tEGL4KeTUG9vepnPwoLWsZjOBmBuBF5q5VagX3vijh4sEKuw7PkT/pub'; // Update to your PDF link

async function sendPlaybookEmail(to: string) {
  await mailjetClient
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: { Email: FROM_EMAIL, Name: 'Students4Students' },
          To: [{ Email: to }],
          Subject: 'Your S4S Playbook PDF',
          HTMLPart: `
            <p>Hi there!</p>
            <p>Thank you for requesting the S4S Playbook. You can download your PDF here:</p>
            <p><a href="${PLAYBOOK_URL}">Download the S4S Playbook</a></p>
            <p>If you have any questions or want more personalized help, connect with a mentor for freeon our website!</p>
            <p>Best,<br/>Dennis Wang</p>
          `,
        },
      ],
    });
}

export async function POST(req: NextRequest) {
  try {
    const { email, page, userAgent, referrer } = await req.json();
    const timestamp = new Date().toISOString();

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp, page, userAgent, referrer]],
      },
    });

    await sendPlaybookEmail(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error logging to Google Sheets or sending email:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
