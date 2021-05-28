import React from 'react'
import Axios from 'axios'

function Chatbot() {

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

    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>

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
