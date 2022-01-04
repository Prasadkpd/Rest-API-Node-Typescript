import http from "http";
import express, {Express} from "express";
import morgan from "morgan";
import routes from './routes/posts'

const router: Express = express();

// Logging
router.use(morgan('dev'));
// Parse the Request
router.use(express.urlencoded({extended: false}));
// Takes care of JSON data
router.use(express.json());

router.use((request , response, next) => {
  // Set the CORS policy
  response.header('Access-Control-Allow-Origin', '*');
  // Set the CORS headers
  response.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return response.status(200).json({});
  }
  next();
});

// Routes
router.use('/', routes);

// Error Handling
router.use((request, response) => {
  const error = new Error('Not Found');
  return response.status(404).json({
    message: error.message
  });
});

// Server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`))