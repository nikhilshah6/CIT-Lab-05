const fastify = require('fastify')();

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
];

// GET routes
fastify.get('/cit/student', (request, reply) => {
    reply.code(200).send(students);
  });
  
  fastify.get('/cit/student/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const student = students.find((student) => student.id === id);
    
    if (student) {
      reply.code(200).send(student);
    } else {
      reply.code(404).send('Not Found');
    }
  });
  
  fastify.get('*', (request, reply) => {
    reply.code(404).send('Not Found');
  });

  // POST
fastify.post('/cit/student', (request, reply) => {
  const { last, first } = request.body;
  const newId = students.length + 1;

  const newStudent = {
    id: newId,
    last,
    first,
  };

  students.push(newStudent);

  reply.code(200).send(newStudent);
});
  
  // Start the server
  fastify.listen(3000, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Server is running on http://localhost:8080');
});