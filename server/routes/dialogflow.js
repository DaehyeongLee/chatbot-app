const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const config = require('../config/keys');
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//dialogflow npm 구글 검색 시 원형 코드를 확인할 수 있다

//1. Text Query Route: client에서 입력한 값에 대한 대답
router.post('/textQuery', async (req, res) => {

    //Send some information that comes from the client to Dialogflow API

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                // client에서의 입력값
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
   
    res.send(result) //결과를 client로 보낸다

})

//2. Event Query Route
router.post('/eventQuery', async (req, res) => {

    //Send some information that comes from the client to Dialogflow API

    // The event query request.
    const request = {
        session: sessionPath,
        queryInput: {
            //eventQuery일 경우 이 부분을 event로 지정
            event: {
                // The query to send to the dialogflow agent
                // client에서의 입력값
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
   
    res.send(result) //결과를 client로 보낸다

})

module.exports = router;
