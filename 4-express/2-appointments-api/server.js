const express = require("express");
const appointmentRoutes = require("./routes");
const logger = require("./middleware/logger");

// kurulum
const app = express();
const port = 3000;

// middleware
// isteklerin body/header/query bölümlerine erişmemizi sağlar
app.use(express.json());

// istekleri konsola logla
app.use(logger);

// endpointleri tanıt
app.use(appointmentRoutes);

// dinlenicek portu belirle
app.listen(port, () => {
  console.log(`Sunucu ${port} portunu dinliyor`);
});
