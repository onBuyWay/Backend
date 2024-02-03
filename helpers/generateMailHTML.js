module.exports = {
  orderCofirmEmail: ({ order, paymentStatus, url }) => {
    return `
    <div style="font-family: 'Arial', sans-serif;">
        <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td style="padding: 20px 0;" valign="top">
                <table width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;">
                    <tbody>
                    <tr>
                        <td style="background-color: #f8f8f8; padding: 20px; border: 1px solid #e5e5e5;" align="center">

                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                            <tr>
                                <td align="center">
                                <h1 style="color: #333; margin: 0; font-size: 24px;">感謝您的訂單！</h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="color: #666; padding: 10px 0; font-size: 16px;">
                                當您的商品寄出時，您將收到一封電子郵件通知。
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse: separate; border-spacing: 0 20px;">
                    <tbody>
                    <tr>
                        <td width="280" style="background-color: #fef9ef; border: 1px solid #efefef; border-right: none; padding: 20px; border-radius: 5px;">
                        <h4 style="color: #333; margin: 0 0 10px; font-size: 18px;">訂單摘要:</h4>
                        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tbody>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">訂單號碼:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.id}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">訂單總額:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.amount}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">收件人姓名:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.name}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">收件人電話:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.phone}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">寄送地址:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.address}</td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                        <td width="280" style="background-color: #fef9ef; border: 1px solid #efefef; border-left: none; padding: 20px; border-radius: 5px;">
                        <h4 style="color: #333; margin: 0 0 10px; font-size: 18px;">訂單狀態:</h4>
                        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tbody>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">付款狀態:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${paymentStatus}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style="font-size: 14px; line-height: 150%; color: #333;">
                                <a href="${url}/orders/${order.id}/payment" style="color: #007BFF; text-decoration: none;">點擊這裡支付</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    `
  },
  paymentConfirmEmail: ({ order, paymentType }) => {
    return `
    <div style="font-family: 'Arial', sans-serif;">
        <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td style="padding: 20px 0;" valign="top">
                <table width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse: collapse;">
                    <tbody>
                    <tr>
                        <td style="background-color: #f8f8f8; padding: 20px; border: 1px solid #e5e5e5;" align="center">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                            <tr>
                                <td align="center">
                                <h1 style="color: #333; margin: 0; font-size: 24px;">訂單 #${order.id} 的付款確認！</h1>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="color: #666; padding: 10px 0; font-size: 16px;">
                                <div>我們已成功收到您的付款金額$${order.amount}，現在正在處理您的訂單。</div>
                                商品寄送後我們將發送追蹤號碼。
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="600" cellspacing="0" cellpadding="0" align="center" style="border-collapse: separate; border-spacing: 0 20px;">
                    <tbody>
                    <tr>
                        <td width="280" style="background-color: #fef9ef; border: 1px solid #efefef; border-right: none; padding: 20px; border-radius: 5px;">
                        <h4 style="color: #333; margin: 0 0 10px; font-size: 18px;">訂單摘要:</h4>
                        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tbody>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">訂單號碼:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.id}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">訂單總額:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">$ ${order.amount}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">收件人姓名:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.name}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">收件人電話:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.phone}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">寄送地址:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${order.address}</td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                        <td width="280" style="background-color: #fef9ef; border: 1px solid #efefef; border-left: none; padding: 20px; border-radius: 5px;">
                        <h4 style="color: #333; margin: 0 0 10px; font-size: 18px;">訂單狀態:</h4>
                        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                            <tbody>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">付款狀態:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">Success</td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">付款方式:</td>
                                <td style="font-size: 14px; line-height: 150%; color: #333; padding-bottom: 5px;">${paymentType}</td>
                            </tr>
                            </tbody>
                        </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    `
  }
}
