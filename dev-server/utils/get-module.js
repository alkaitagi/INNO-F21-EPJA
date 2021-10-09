const path = require("path");

module.exports = (req, res) => {
    const libName = req.params[0];
    const libFilePath = req.params[2];

    let filePath;
    if (libName === "fire.app") {
        filePath = path.resolve("node_modules", "@khwar1/fire.app", `dist/${libFilePath}`);
    } else {
        filePath = path.resolve("node_modules", libName, libFilePath);
    }
    res.sendFile(filePath);
};
