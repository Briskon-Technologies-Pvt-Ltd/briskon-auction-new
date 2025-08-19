// @ts-nocheck  // optional, if VSCode still complains about Deno imports
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend("re_E32wFDa1_5qmXAZVNYhVnaZcRxdJbEEdc"); // hardcoded API key

serve(async (req: Request) => {
  try {
    const { email, fname } = await req.json();

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    await resend.emails.send({
      from: "Briskon Auction <no-reply@yourdomain.com>",
      to: email,
      subject: "Briskon Auction: Welcome! Your buyer account is now active",
      html: `
        <h2>Briskon Auction: Welcome! Your buyer account is now active</h2>
        <p>Hi ${fname || "there"},</p>
        <p>Thank you for confirming your email — your buyer account is now fully activated!</p>
        <p>You’re now ready to explore auctions and place competitive bids.</p>
        <p>👉 <a href="https://yourdomain.com/buyer/dashboard">Go to My Buyer Dashboard</a></p>
        <p>Best regards,<br>Support Team<br>Briskon Auction</p>
      `,
    });

    return new Response("Welcome email sent ✅", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error sending email ❌", { status: 500 });
  }
});
