
import helmet from 'helmet';
import path from 'path'
import connectDB from './Config/Db.connect';
import config from './Config/Config';
import serverConfig from './server';
import dependencies from './Framework/Confiq/Dependencies';
import { routes } from './Adaptors/Routers';
import { Server as SocketIOServer } from 'socket.io';
import  http from 'http';
import  https from 'https';
import  express from 'express';
import  bodyParser from 'body-parser';
import  cors from 'cors';
import  dotenv from 'dotenv';
import session from 'express-session';
import { NotificationHandler } from './Application';


console.log("this is the backend foleder")



dotenv.config();
connectDB(config);


const app = express();

const server = http.createServer(app);
app.use(bodyParser.json());



app.use(cors({
  origin: ['https://findtech.jacksonr.live', 'https://tech-find-frontend.vercel.app','http://localhost:4200'], // Both frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));



console.log(process.env.SESSION_SECRET)


app.use(session({
  secret: process.env.SESSION_SECRET ||'Secretekey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
  }
}));

app.use(express.json()); // for parsing application/json

app.use('/api', routes(dependencies));
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "https://res.cloudinary.com/;");
  next();
});

serverConfig(server, config).startServer();
























//socket configration start
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:4200','https://findtech.jacksonr.live','https://tech-find-frontend.vercel.app'], // Replace with your Angular app's URL
    methods: ['GET', 'POST']
  }
});

    

const socketUsers = new Map();
const NotificationUsers = new Map()
io.on('connection', (socket) => {
  console.log('A user connected');



  socket.on('register', (id) => {
    console.log('User registered with id:', id);
    socketUsers.set(id, socket.id);
  });

  socket.on('NotificationRegister',(id)=>{

    console.log('Notification  register with id:',id)
    NotificationUsers.set(id, socket.id);
  })


  socket.on('message', async (chat, callback) => {
    try {
      const { senderId, text, receiverId } = chat.message;
      console.log('Received message:', chat.message);
  
      const { MessageHandler } = dependencies.useCase;
      const response = await MessageHandler(dependencies).executeFunction(chat);
      console.log(response);   
      if (response.status) {
        let expectedReceiverId = '';
  
       
        if (chat.message.SenderType === 'user') {
          expectedReceiverId = chat.message.receiverId; 
        } else if (chat.message.SenderType === 'technician') {
          expectedReceiverId = chat.message.receiverId; 
        }
  
       
        if (expectedReceiverId === receiverId) {
          const receiverSocketId = socketUsers.get(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('Newmessage', response.data);
          }
          callback(response.data);
        } else {
          callback({ status: false, message: "Invalid receiver ID" });
        }
      } else {
        callback({ status: false, message: "Message could not be sent" });
      }
    } catch (error) {
      console.error('Error handling message:', error);
      callback({ status: false, message: "An error occurred" });
    }
  });






  // socket.on('seenmessage',async (data)=>{

  //   const { userid, viewedBy, techid } = data

  //   console.log('Received data', data);
  //     let receiversockeid 
  //   if(viewedBy === 'user'){
  //     receiversockeid = socketUsers.get(techid)
  //   }else{
  //     receiversockeid = socketUsers.get(userid)
  //   }

  //   console.log('recicferesokckeit ',receiversockeid)
  //   if(receiversockeid !== undefined){
  //     socket.to(receiversockeid).emit('seenmessage',data)
  //   }

  // })

  socket.on('sendNotification', async (notificationData, callback) => {
    try {
      console.log('Received notification data:', notificationData);
      const { senderid, receiverId, content } = notificationData;
  
      // Call the handler to process the notification data and store it in the database
      const response = await NotificationHandler(dependencies).executeFunction(notificationData);
      console.log(response, "This is the database response to pass to the frontend");
  
      if (response.status) {
        // Fetch the receiver's socket ID from the NotificationUsers map
        const receiverSocketId = NotificationUsers.get(receiverId);

        console.log(receiverSocketId,"this is recevier socket id ")
        console.log(response,"this is responce of pass recevier socket id ")
        if (receiverSocketId) {
          // Emit the notification to the specific receiver socket ID
          io.to(receiverSocketId).emit('newNotification', {response});
        }
      }
      
      // Execute callback with response to confirm success or failure
      callback(response);
    } catch (error) {
      console.error('Error handling notification:', error);
      // Execute callback with failure response
      callback({ status: false, message: 'Error handling notification' });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    for (const [id, socketId] of socketUsers.entries()) {
      if (socketId === socket.id) {
        socketUsers.delete(id);
        break;
      }
    }
    for (const [id, socketId] of NotificationUsers.entries()) {
      if (socketId === socket.id) {
        NotificationUsers.delete(id);
        break;
      }
    }
  });
});

export { express };
