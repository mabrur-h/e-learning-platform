import fs from 'fs/promises';
import path from "path";
let __dirname = path.resolve(path.dirname(''));

class FileController {
    static async createFile (req, res) {
        let fileBase
        try {
            const fileElement = req.files.file;
            if (!fileElement) throw new Error("File does not exist!");
            if ((fileElement.size / 1024) > 50 * 1024) throw new Error("File size is too big!")
            const type = fileElement.name.split(".")[fileElement.name.split(".").length - 1];
            // const mainType = (["png", "jpg", "jpeg"].includes(type)) ? "photo" : "document"
            const file = await req.postgres.files.create({
                type: type,
                user_id: req.user
            })
            fileBase = file;

            const filePath = path.join(__dirname, 'src', 'server', 'public', 'files', `${file.dataValues.photo_id}.${type}`)
            const saveFile = await fs.writeFile(filePath, fileElement.data);
            await res.status(201).json({
                ok: true,
                message: "File uploaded!",
                file: file
            })
        } catch (e) {
            if (fileBase) await req.postgres.files.destroy({
                where: {
                    id: fileBase.dataValues.photo_id
                }
            })
            res.status(400).json({
                ok: false,
                message: e + ''
            })
        }
    }
}

export default FileController;