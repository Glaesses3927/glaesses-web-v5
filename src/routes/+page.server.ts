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
  RECAPTCHA_SECRET_KEY,
} from '$env/static/private';

export const actions = {
  default: async ({ request }) => {
    // reCAPTCHA検証
    const formData = await request.formData();
    const recaptchaResponse = formData.get('recaptcha_response');

    const recaptchaSecret = RECAPTCHA_SECRET_KEY;
    const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    
    // URLSearchParamsを使ってapplication/x-www-form-urlencodedで送信
    const recaptchaParams = new URLSearchParams({
      secret: recaptchaSecret,
      response: recaptchaResponse?.toString() || '',
    });
    
    const recaptcha = await fetch(recaptchaUrl, {
      method: 'POST',
      body: recaptchaParams,
    });
    const recaptchaResult = await recaptcha.json();

    if (!(recaptchaResult.success && recaptchaResult.score >= 0.5)) {
      return fail(400, { error: true, message: 'Recaptcha認証に失敗しました。', recaptcha: recaptchaResult });
    }

    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    const need_reply = (formData.get('need_reply')?.toString() || '') == "need";

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
        '返答必要': need_reply,
        'お問い合わせ内容': message,
      };

      const addedRow = await inquirySheet.addRow(newRowData);

      // Discordへの通知
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ContactNotification",
          content: `**-----------------------------------**
**     :loudspeaker: ContactNotification :loudspeaker:**
**-----------------------------------**
[GlaessesWeb](https://glaesses.net/) の ContactForm から [新しい問い合わせ](https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${inquirySheet.sheetId}&range=${addedRow.rowNumber}:${addedRow.rowNumber}) が来ています🫡 

${time} ${need_reply ? "**【返答必須】**" : "【返答不要】"}
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

      const res = await fetch(`${LAMBDA_URL}/contact`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "address": encodeURIComponent(email),
          "name": encodeURIComponent(name),
          "content": encodeURIComponent(message),
          "inquiry_id": `${addedRow.rowNumber.toString().padStart(6, '0')}`,
          "inquiry_date": time,
          "need_reply": `${need_reply ? "true" : "false"}`
        },
      });
      if (res.status !== 200) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

    } catch (error) {
      console.error("フォーム送信エラー:", error);
      return fail(500, { error: true, message: 'サーバーでエラーが発生しました。' });
    }

    return { success: true };
  }
};