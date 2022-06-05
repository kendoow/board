import path from 'path'
import fs from 'fs'

class FileService {
    download(id,image){
        const data = image.replace(`data:image/png;base64,` , '') 
        fs.writeFileSync(path.resolve( 'files' , `${id}.jpg`), data, 'base64')
        console.log('DOWNLOAD DONE')
    }
    sendFile(id){
        const file = fs.readFileSync(path.resolve( 'files' , `${id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        return data
    }
    updateFile(id, image) {
        fs.rm(`./files/${id}`, {force:true},((e) => e ?? console.log(e)))
        
        this.download(id,image)
        
    }
} 

export default new FileService();