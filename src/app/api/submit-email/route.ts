import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import mailjet from 'node-mailjet';

// Path to your service account key
const CREDENTIALS_PATH = path.join(process.cwd(), 'playbook.json');
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = '1XCzUFHoeQHEveteqJq7HAvAwpBGIq_9_r0SLcpCDTLw';
const SHEET_NAME = 'Playbook Emails';

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
