import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import jwt from 'jsonwebtoken';
import { fail } from '@sveltejs/kit';
import { 
  SHEET_ID, 
  GOOGLE_SERVICE_ACCOUNT_EMAIL, 
  GOOGLE_PRIVATE_KEY,
  WEBHOOK_URL,
  LAMBDA_URL,
  LAMBDA_PRIVATE_KEY,
} from '$env/static/private';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    try {
      // スプシ更新
      const SCOPES = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ];
      
      const googlePrivateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n");
      const googleJWT = new JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: googlePrivateKey,
        scopes: SCOPES,
      });
      
      const doc = new GoogleSpreadsheet(SHEET_ID, googleJWT);
      await doc.loadInfo();
      const inquirySheet = doc.sheetsByTitle.contact;

      const time = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
      
      const newRowData = {
        'お問い合わせ時間': time,
        'ステータス': '未対応',
        'お名前': name,
        'メールアドレス': email,
        'お問い合わせ内容': message,
      };

      const addedRow = await inquirySheet.addRow(newRowData);

      // Discordへの通知
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ContactNotification",
          content: `**-----------------------------------
     :loudspeaker: ContactNotification :loudspeaker:
-----------------------------------
**[GlaessesWeb](https://glaesses.net/) の ContactForm から [新しい問い合わせ](https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${inquirySheet.sheetId}&range=${addedRow.rowNumber}:${addedRow.rowNumber})が来ています🫡 

${time}
${name} 様 (\`${email}\`) より
>>> ${message}`
        })
      });

      // メール送信
      const lambdaPrivateKey = LAMBDA_PRIVATE_KEY.replace(/\\n/gm, "\n");
      const payload = {};
      const options: jwt.SignOptions = {
        algorithm: 'RS256',
        expiresIn: '1m',
        issuer: 'glaessesweb-contact',
      };
      const token = jwt.sign(payload, lambdaPrivateKey, options);

      await fetch(LAMBDA_URL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "address": email,
          "name": name,
          "content": message,
          "inquiry_id": "000001",
          "inquiry_date": "2025/07/25 10:30:45",
          "need_reply": "true"
        },
      });
    } catch (error) {
      console.error("フォーム送信エラー:", error);
      return fail(500, { error: true, message: 'サーバーでエラーが発生しました。' });
    }

    return { success: true };
  }
};