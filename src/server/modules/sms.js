import fetch from 'node-fetch';
import formData from 'form-data';

async function sendSms(phoneNum, text) {
    const data = new formData();
    data.append("mobile_phone", phoneNum);
    data.append("message", text);
    data.append("from", 4546);

    await fetch("https://notify.eskiz.uz/api/message/sms/send", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbm90aWZ5LmVza2l6LnV6XC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjIzMTEyNTE2LCJleHAiOjE2MjU3MDQ1MTYsIm5iZiI6MTYyMzExMjUxNiwianRpIjoiM0ZpMWdoc2lmNnYzY1BTaSIsInN1YiI6NDE0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.Hc2mN9Mg5RqCqHc5Gzrp6SiPEoW5cWtZck5S5Eu3OS8",
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundary5MwYVDeZz2cj9sSJ",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrer": "https://eduon.uz/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `------WebKitFormBoundary5MwYVDeZz2cj9sSJ\r\nContent-Disposition: form-data; name=\"mobile_phone\"\r\n\r\n${phoneNum}\r\n------WebKitFormBoundary5MwYVDeZz2cj9sSJ\r\nContent-Disposition: form-data; name=\"message\"\r\n\r\n${text}\r\n------WebKitFormBoundary5MwYVDeZz2cj9sSJ\r\nContent-Disposition: form-data; name=\"from\"\r\n\r\n4546\r\n------WebKitFormBoundary5MwYVDeZz2cj9sSJ--\r\n`,
        "method": "POST",
        "mode": "cors"
    });
}

export default sendSms;
