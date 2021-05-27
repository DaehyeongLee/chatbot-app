import React from 'react'

function Chatbot() {
    
    const keyPressHandler = (e) => {
        //Enter key press (keyboard)
        if(e.key === "Enter") {
            //아무것도 입력되지 않았을 경우
            if(!e.target.value) {
                return alert('Need to type something')
            }

            //Text Query router로 request를 보내기



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
