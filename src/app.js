const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});


app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };

  numberOfRepositories = repositories.push(repository);  

  response.status(200).json(repository);
});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const  { title, url, techs } = request.body;

  index = repositories.findIndex(repository => repository.id === id);
  if (index < 0) {
    response.status(400).json({status: 'Repository Id not found'});
  }

  repositories[index].title = title
  repositories[index].url = url 
  repositories[index].techs = techs

  response.status(200).json(repositories[index]);
});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  index = repositories.findIndex(repository => repository.id === id);
  if (index < 0) {
    return response.status(400).json({status: 'Repository Id not found!'});
  }

  repositories.splice(index, 1);

  response.status(204).json({status: 'Repository deleted successfully!'});
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  index = repositories.findIndex(repository => repository.id === id);
  if (index <0) {
    return response.status(400).json({status: 'Repository Id not found!'});
  }

  repositories[index].likes += 1
  
  response.status(200).json(repositories[index]);
});



module.exports = app;
