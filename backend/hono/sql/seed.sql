-- D1 Seed Data for Quiz Maker

-- Clear existing data
DELETE FROM attempt_answers;
DELETE FROM attempt_events;
DELETE FROM attempts;
DELETE FROM questions;
DELETE FROM quizzes;

-- Quiz 1: JavaScript Fundamentals
INSERT INTO quizzes (title, description, time_limit_seconds, is_published, created_at) VALUES
('JavaScript Fundamentals', 'Test your knowledge of core JavaScript concepts including closures, prototypes, and language mechanics.', 600, 1, datetime('now'));

INSERT INTO questions (quiz_id, type, prompt, options_json, correct_answer, position, created_at) VALUES
(1, 'mcq', 'What does a closure give you access to in JavaScript?', '["Only the function''s local variables","The function''s local variables and parameters","The function''s local variables, parameters, and outer scope variables"]', '2', 0, datetime('now')),
(1, 'mcq', 'Which method removes the last element from an array and returns it?', '["shift()","pop()","push()","slice()"]', '1', 1, datetime('now')),
(1, 'mcq', 'What is the output of: console.log(typeof null)?', '["null","undefined","object","boolean"]', '2', 2, datetime('now')),
(1, 'short', 'What JavaScript keyword is used to create a block-scoped variable that cannot be reassigned?', NULL, 'const', 3, datetime('now')),
(1, 'short', 'What method converts a JSON string back into a JavaScript object?', NULL, 'JSON.parse', 4, datetime('now'));

-- Quiz 2: Async JavaScript & Promises
INSERT INTO quizzes (title, description, time_limit_seconds, is_published, created_at) VALUES
('Async JavaScript & Promises', 'Master asynchronous programming in JavaScript including callbacks, promises, and async/await patterns.', 450, 1, datetime('now'));

INSERT INTO questions (quiz_id, type, prompt, options_json, correct_answer, position, created_at) VALUES
(2, 'mcq', 'What are the three states of a Promise?', '["pending, resolved, rejected","waiting, success, failure","loading, done, error","active, complete, aborted"]', '0', 0, datetime('now')),
(2, 'mcq', 'Which method chains onto a Promise to handle a rejected case?', '["then()","catch()","finally()","error()"]', '1', 1, datetime('now')),
(2, 'short', 'What JavaScript keyword pauses execution inside an async function until a Promise resolves?', NULL, 'await', 2, datetime('now')),
(2, 'short', 'What Promise method takes an array of promises and returns a new promise that resolves when all input promises have resolved (or one rejects)?', NULL, 'Promise.all', 3, datetime('now'));

-- Quiz 3: HTML & CSS Essentials
INSERT INTO quizzes (title, description, time_limit_seconds, is_published, created_at) VALUES
('HTML & CSS Essentials', 'Test your understanding of web structure, styling, and layout techniques.', 480, 1, datetime('now'));

INSERT INTO questions (quiz_id, type, prompt, options_json, correct_answer, position, created_at) VALUES
(3, 'mcq', 'Which CSS property controls the space between an element''s border and its content?', '["margin","padding","border-spacing","gap"]', '1', 0, datetime('now')),
(3, 'mcq', 'In the CSS Box Model, which layer is outermost?', '["content","padding","border","margin"]', '3', 1, datetime('now')),
(3, 'mcq', 'Which HTML element is used to define the main content of a document (semantically)?', '["<div>","<main>","<section>","<body>"]', '1', 2, datetime('now')),
(3, 'short', 'What CSS display value makes an element a flex container?', NULL, 'flex', 3, datetime('now')),
(3, 'short', 'What CSS property specifies the stacking order of positioned elements?', NULL, 'z-index', 4, datetime('now'));

-- Quiz 4: Node.js Fundamentals
INSERT INTO quizzes (title, description, time_limit_seconds, is_published, created_at) VALUES
('Node.js Fundamentals', 'Learn the core concepts of Node.js including modules, streams, and the event loop.', 600, 1, datetime('now'));

INSERT INTO questions (quiz_id, type, prompt, options_json, correct_answer, position, created_at) VALUES
(4, 'mcq', 'What is the purpose of the package.json file?', '["To define the project''s metadata only","To list dependencies and scripts","To configure the Node.js runtime","To store environment variables"]', '1', 0, datetime('now')),
(4, 'mcq', 'Which of the following is NOT a built-in Node.js module?', '["fs","http","express","path"]', '2', 1, datetime('now')),
(4, 'mcq', 'What does the __dirname variable represent?', '["The user''s home directory","The current working directory when Node was launched","The directory of the currently executing script","A temporary system directory"]', '2', 2, datetime('now')),
(4, 'mcq', 'How do you import the ''fs'' module in Node.js?', '["import fs from ''fs''","require(''fs'')","using fs;","include fs"]', '1', 3, datetime('now')),
(4, 'mcq', 'What is the difference between process.nextTick() and setImmediate()?', '["They are identical","nextTick fires before I/O callbacks, setImmediate fires after I/O callbacks","setImmediate is faster","nextTick is only for browsers"]', '1', 4, datetime('now')),
(4, 'mcq', 'Which method is used to read the entire contents of a file synchronously?', '["fs.readFile()","fs.readFileSync()","fs.read()","fs.readAsync()"]', '1', 5, datetime('now')),
(4, 'mcq', 'What does the EventEmitter class provide?', '["File system operations","HTTP server creation","A pattern for publishing and subscribing to events","Database connectivity"]', '2', 6, datetime('now')),
(4, 'short', 'What Node.js module is used to create a web server?', NULL, 'http', 7, datetime('now')),
(4, 'short', 'What global object provides information about the current Node.js process?', NULL, 'process', 8, datetime('now')),
(4, 'short', 'What command installs a package as a development dependency?', NULL, 'npm install --save-dev', 9, datetime('now')),
(4, 'short', 'What property of the process object contains the command-line arguments?', NULL, 'argv', 10, datetime('now')),
(4, 'short', 'Which module provides utilities for working with file and directory paths?', NULL, 'path', 11, datetime('now')),
(4, 'short', 'What method is used to exit a Node.js process with a success code?', NULL, 'process.exit(0)', 12, datetime('now')),
(4, 'short', 'What does the module.exports object represent?', NULL, 'The exports of the current module', 13, datetime('now')),
(4, 'short', 'What built-in Node.js module is used for operating system information?', NULL, 'os', 14, datetime('now'));
