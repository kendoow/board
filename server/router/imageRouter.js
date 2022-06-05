import imageController from '../controllers/imageController.js'

import { Router } from 'express'

const imageRouter = new Router()

imageRouter.post('', imageController.createImage)
imageRouter.get('', imageController.getall)
imageRouter.put('', imageController.updateImage)

export default imageRouter
