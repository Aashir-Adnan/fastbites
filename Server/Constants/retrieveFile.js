const projectDB = require("../Database/projectDb");
const { executeQuery } = require("../Database/queryExecution");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const SECRET_KEY = process.env.SECRET_KEY || "FILESECRET";

async function retrieveFile(req, res) {
    try {
        let attachmentId;
        const token = req.query.token;
        if (!token) {
            attachmentId = req.body.attachementId;
        }
        else{
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, SECRET_KEY, (err, decoded) => {
                    if (err) reject(new Error("Invalid or expired token"));
                    else resolve(decoded);
                });
            });

            ({ attachmentId } = decoded);
        }
        const connection = projectDB();

        const sql = "SELECT attachment_link FROM attachments WHERE attachment_id = ?";
        const results = await executeQuery(sql, [attachmentId], connection);

        if (!results.length || !results[0].attachment_link) {
            return res.status(404).json({ error: "Attachment not found or file unavailable" });
        }

        const filePath = path.resolve(results[0].attachment_link); // Convert to absolute path

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found on server" });
        }
        return res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error("Error sending file:", err);
                return res.status(500).json({ error: "Error retrieving file" });
            }
        });

    } catch (error) {
        console.error("Error in retrieveFile:", error.message);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { retrieveFile };