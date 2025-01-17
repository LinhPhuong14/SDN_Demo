const http = require('http');
//Khai bao mot so thong tin lien quan den server
const hostname = "localhost";
const port = 9000;

//Khoi tao server
//Tao danh sach student
let studentList = [
    {id: "SV01", name: "Nguyen Van A", mark: 8},
    {id: "SV02", name: "Nguyen Van B", mark: 9},
    {id: "SV03", name: "Nguyen Van C", mark: 7},
]
//tao GET/student method
//tao POST/student method

//Practice:
//2b. Check id da ton tai thi khong add va hien thong bao
//3. GET /student/1: Search student by id
//4. PUT /student/1: Update student by id
//5. DELETE /student/1: Delete student by id
const server = http.createServer((req, res) => {
    
    console.log('Request for ' + req.url + ' by method ' + req.method);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('Welcome to mode server!');
    const {method, url} = req;
    if (method === 'GET' && url === '/student') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(studentList));
    }
    else if (method === 'POST' && url === '/student') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            const student = JSON.parse(body);
            studentList.push(student);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'text/html');
            res.end("Created");
        });
    }else if (method === 'GET' && url.startsWith('/student/')) {
        const id = url.split('/')[2];
        const student = studentList.find(s => s.id === id);
        if (student) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(student));
        }
        else {
            res.statusCode = 404;
            res.end("Not found");
        }
    }else if (method === 'PUT' && url.startsWith('/student/')) {
        const id = url.split('/')[2];
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            const student = JSON.parse(body);
            const index = studentList.findIndex(s => s.id === id);
            if (index !== -1) {
                studentList[index] = student;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end("Updated");
            }
            else {
                res.statusCode = 404;
                res.end("Not found");
            }
        });
    }else if (method === 'DELETE' && url.startsWith('/student/')) {
        const id = url.split('/')[2];
        const index = studentList.findIndex(s => s.id === id);
        if (index !== -1) {
            studentList.splice(index, 1);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end("Deleted");
        }
        else {
            res.statusCode = 404;
            res.end("Not found");
        }
    }
    else {
        res.statusCode = 404;
        res.end("Not found");
    }
});

//Khoi tao server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});