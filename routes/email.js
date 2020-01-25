var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: "joewarnerdev@gmail.com",
            clientId: "382130834007-qr4a86qbidt2htaj5t47gr0vk87h8u6o.apps.googleusercontent.com",
            clientSecret: "z_hphvWaIWM5WFIrN0NXG1u-",
            refreshToken: "HNX_PIHElJsSES7v3Bh9fQl6KOFH_WUtRLbKDYUdTwo94WGPmwTuC8MJ1_B65sFm"
        })
    }
})