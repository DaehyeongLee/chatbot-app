import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {saveMessage} from '../_actions/message_actions';
import Message from './Sections/Message';

function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages) //redux에 저장된 message 목록 불러옴

    useEffect(() => {
        eventQuery('WelcomMessage')
    })

    const textQuery = async(text) => {

        //let conversationList = [] //conversations
    
        //유저가 보낸 Text로 변수 초기화
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }
        //conversationList.push(conversation) //유저의 입력을 대화 기록에 push
        dispatch(saveMessage(conversation)) //redux store에 저장

        const textQueryVariable= {
            text
        }

        //Text Query router로 request를 보내기
        try {
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariable)
            const content = response.data.fulfillmentMessages[0] //Chatbot의 response
            conversation = {
                who: 'bot',
                content: content
            }
            console.log(conversation)
            //conversationList.push(conversation) //chatbot의 답장을 대화 기록에 push
            dispatch(saveMessage(conversation))
        } catch (error) {
            conversation = {
                who: 'user',
                content: {
                    text: {
                        text: "Error occured"
                    }
                }
            }
            //conversationList.push(conversation)
            dispatch(saveMessage(conversation))
        }
       

    }

    const eventQuery = async(event) => {
     
        const eventQueryVariable= {
            event
        }

        //Event Query router로 request를 보내기
        try {
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariable)
            const content = response.data.fulfillmentMessages[0] //Chatbot의 response
            let conversation = {
                who: 'bot',
                content: content
            }
            console.log(conversation)
            //dispatch(saveMessage(conversation)) //이부분 무한 반복?? 이유는?
            
        } catch (error) {
            let conversation = {
                who: 'user',
                content: {
                    text: {
                        text: "Error occured"
                    }
                }
            }
            //dispatch(saveMessage(conversation))
        }
       

    }
    
    const keyPressHandler = (e) => {

        //Enter key press (keyboard)
        if(e.key === "Enter") {
            //아무것도 입력되지 않았을 경우
            if(!e.target.value) {
                return alert('Need to type something')
            }           
            textQuery(e.target.value);

            e.target.value = ""; //입력했던 값 초기화
        }
    }

    const renderOneMessage = (message, i) => {
        return <Message key={i} who={message.who} text={message.content.text.text} />
    }

    const renderMessage = (returnedMessages) => {

        if(returnedMessages) {
            return returnedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }

    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessage(messagesFromRedux)}
            </div>

            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Enter a message.."
                onKeyPress = {keyPressHandler}
                type="text"
            />
        </div>
    )
}

export default Chatbot
