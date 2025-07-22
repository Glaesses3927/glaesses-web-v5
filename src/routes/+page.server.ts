import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { fail } from '@sveltejs/kit';
import { 
  SHEET_ID, 
  GOOGLE_SERVICE_ACCOUNT_EMAIL, 
  GOOGLE_PRIVATE_KEY,
  WEBHOOK_URL
} from '$env/static/private';

export const actions = {
  // フォームのデフォルトアクションを定義
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    try {
      const SCOPES = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ];
      
      const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n");

      const jwt = new JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: privateKey,
        scopes: SCOPES,
      });
      
      const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
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
> ${message}`
        })
      });

    } catch (error) {
      console.error("フォーム送信エラー:", error);
      return fail(500, { error: true, message: 'サーバーでエラーが発生しました。' });
    }

    return { success: true };
  }
};