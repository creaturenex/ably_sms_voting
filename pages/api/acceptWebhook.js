import Ably from "ably/promises";
import Vonage from "@vonage/server-sdk";

export default async function handler(req, res) {

    const incomingData = getSmsDetails(req, res);

    if (!incomingData.success) {
        res.status(400).end();
        return;
    }

    const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    const channel = client.channels.get("sms-notifications");
    await channel.publish({
        name: "smsEvent",
        data: incomingData
    });

    const vonage = new Vonage({
        apiKey: process.env.VONAGE_API_KEY,
        apiSecret: process.env.VONAGE_API_SECRET
    })

    vonage.message.sendSms(incomingData.to, incomingData.from, "Your vote has been cast! 🗳", {
        "type": "unicode"
    }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

    res.send(incomingData);
    res.status(200).end();
};

function getSmsDetails(req, res) {

    const params = req.query;

    if (!params.to || !params.msisdn) {
        console.log('This is not a valid inbound SMS message!');
        return {
            success: false
        };
    }

    return {
        success: true,
        messageId: params.messageId,
        from: params.msisdn,
        text: params.text,
        type: params.type,
        timestamp: params['message-timestamp'],
        to: params.to
    };

}
