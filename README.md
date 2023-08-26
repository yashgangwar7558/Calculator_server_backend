# Calculator Server

This server responds to mathematical operations sent via URL. It also maintains a history of the last 20 as well as ALL the operations performed on the server.

## Usage

1. Clone the repository.
   
   ```
   git clone https://github.com/yashgangwar7558/Calculator_server_backend
   ```
2. Install dependencies using `npm install`.
3. Set your MongoDB connection URL in the `.env` file.
   
   ```
   MONGODB_CONNECTION_URL=<your_url>
   ```   
4. Run the server using `npm run start`.
5. Server setup is ready. Try out the examples.

## Try some endpoints

- [GET /history](http://localhost:8000/history)
  - Retrieve history of 20 recent operations.
  
- [GET /history/all](http://localhost:8000/history/all)
  - Retrieve history of all operations.

- [GET /calculate/20/plus/3](http://localhost:8000/calculate/20/plus/3)
  - Perform addition: 20 + 3.

- [GET /calculate/10/minus/5/plus/20](http://localhost:8000/calculate/10/minus/5/plus/20)
  - Perform multiple operations: 10 - 5 + 20.

- [GET /calculate/10/divide/5](http://localhost:8000/calculate/10/divide/5)
  - Perform division: 10 / 2.

- [GET /calculate/10/modulos/3](http://localhost:8000/calculate/10/modulos/3)
  - Perform modulos: 10 % 3.

- [GET /calculate/10/minus/5/plus/10/into/4/divide/10](http://localhost:8000/calculate/10/minus/5/plus/10/into/4/divide/10)
  - Go as long as you want...

---

### Isn't that cool! You can use this server to build out some cool calculator stuff.