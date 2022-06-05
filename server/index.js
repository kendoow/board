import express from "express";
import expressWs from "express-ws";
import cors from 'cors'
import { config } from "dotenv";
import imageRouter from "./router/imageRouter.js";

config()
const app = express()
const aWss = expressWs(app).getWss();
const PORT = process.env.PORT || 4000;


app.use(cors())
app.use(express.json()) // чтобы приложение могло парсить json формат

app.ws("/", (ws, req) => {
  console.log("ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО");
  ws.send("Ты успешно подключился");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
      case "draw":
        broadcastConnection(ws,msg)
        break;
    }
  });
});

// app.post('/image', (req,res) => { // 
//   try {
//     const data = req.body.img.replace(`data:image/png;base64,` , '') 
//     fs.writeFileSync(path.resolve(__dirname, 'files' , `${req.query.id}.jpg`), data, 'base64')
//     return res.status(200).json({message:'Загружено'})
//   } catch (e) {
//     console.log(e)
//     return res.status(500).json('error')
//   }
// })
// app.get('/image', (req,res) => {
//   try {
//     const file = fs.readFileSync(path.resolve(__dirname, 'files' , `${req.query.id}.jpg`))
//     const data = `data:image/png;base64,` + file.toString('base64')
//     res.json(data)
//   } catch (e) {
//     console.log(e)
//     return res.status(500).json('error')
//   }
// })
app.use('/image', imageRouter)
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id; // чтобы отдлеять сессии
  broadcastConnection(ws, msg);
};
// уведомление для пользователей о подлючении новвого пользователя
const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    // в clients хранятся все открытые на данный момент веб-сокеты
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
