// Config file for mongo db to connect via mongoose library

var config = {
  // url : process.env.MONGO_URL,
  url: "mongodb+srv://varadanvk:mongo123@cluster0.ouzy7va.mongodb.net/birat",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};

module.exports = config;
