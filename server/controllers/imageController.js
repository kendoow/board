import FileService from "../services/fileService.js";

class ImageController {
    getall(req,res) {
        try {
            const data = FileService.sendFile(req.query.id)
            return res.json(data)
        } catch (e) {
            return res.status(500).json('error')
        }
    }
    createImage(req,res){
        try {
            FileService.download(req.query.id, req.body.img)
            return res.status(200).json('pobeda')
        } catch (e) {
            return res.status(500).json('error')
        }
    }
    updateImage(req,res){
        try {
            FileService.updateFile(req.query.id, req.body.img)
            res.status(200).json('pobeda')
        } catch (e) {
            return res.status(500).json('error')
        }
    }
}

export default new ImageController();