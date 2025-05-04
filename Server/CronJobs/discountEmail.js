const cron = require('node-cron');
const moment = require('moment');
const { handleSendEmail } = require('../Constants/sendEmail');
const projectDb = require('../Database/projectDb')
const {executeQuery} = require('../Database/queryExecution')


cron.schedule('*/1 * * * *', async () => {
    console.log('Running cron job at:', moment().format());


    const currentHour = moment().hour();
    const isStartOfDay = currentHour === 0; 

    try {
        const discountsQuery = `
            SELECT * 
            FROM discounts
            WHERE 
                (discount_day IS NULL OR discount_day = ?)
                AND discount_time_start <= ? 
                AND discount_time_end >= ?;
        `;
        
        const dayOfWeek = moment().format('dddd'); 

        const discounts = await executeQuery(discountsQuery, [
            dayOfWeek, 
            moment().format('HH:mm'), 
            moment().format('HH:mm') 
        ], projectDb());
        
        if (!discounts || discounts.length === 0) {
            console.log('No discounts available for this time.');
            return;
        }
        
        console.log("Discounts: ", discounts)
        for (let discount of discounts) {
            const userQuery = `
                SELECT u.email 
                FROM user u
                JOIN user_discounts ud ON u.id = ud.user_id
                WHERE ud.restaurant_id = ?;
            `;

            const users = await executeQuery(userQuery, [discount.restaurant_id], projectDb());

            for (let user of users) {
                const htmlContent = `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                padding: 20px 0;
                                background-color: #ff7f50;
                                color: #ffffff;
                                border-radius: 8px 8px 0 0;
                            }
                            .header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .content {
                                padding: 20px;
                                color: #333333;
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .content p {
                                margin-bottom: 20px;
                            }
                            .highlight {
                                font-weight: bold;
                                color: #ff7f50;
                            }
                            .footer {
                                text-align: center;
                                padding: 20px;
                                font-size: 14px;
                                color: #777777;
                                background-color: #f4f4f4;
                                border-radius: 0 0 8px 8px;
                            }
                            .cta-button {
                                display: inline-block;
                                padding: 12px 20px;
                                background-color: #ff7f50;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                                text-align: center;
                                margin-top: 20px;
                            }
                            .cta-button:hover {
                                background-color: #e06f38;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Special Discount Just for You!</h1>
                            </div>
                            <div class="content">
                                <p>Dear User,</p>
                                <p>We are excited to inform you about a new <span class="highlight">${discount.discount_name}</span> at your favorite restaurant!</p>
                                <p>${discount.discount_description}</p>
                            </div>
                            <div class="footer">
                                <p>Best regards,</p>
                                <p><strong>Fast Bites Team</strong></p>
                                <p>If you have any questions, feel free to contact us.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;
            
                await handleSendEmail(user.email, htmlContent, `Discount at ${discount.discount_name}`);
            }
        }
    } catch (error) {
        console.error('Error occurred while fetching discounts or sending emails:', error);
    }
});
