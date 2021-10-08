const path = require("path");

module.exports = (req, res) => {
    const [libName, , libFilePath] = req.params;
    let filePath;
    if (libName === "fire.app") {
        filePath = path.resolve("node_modules", "@khwar/fire.app", `dist/${libFilePath}`);
    } else {
        filePath = path.resolve("node_modules", libName, libFilePath);
    }
    res.sendFile(filePath);
};
