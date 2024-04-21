// import React, { useState } from 'react';
// import axios from 'axios';

// function ChatForm() {
//   const [userInput, setUserInput] = useState('');
//   const [response, setResponse] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Call your OpenAI API here to get the response
//     // Replace 'YOUR_API_KEY' with your actual API key
//     const apiKey = '5kny87ieCQFdJfPRJmLAT3BlbkFJzm1MYSLhJYqtvZ5A51bg';
//     const apiUrl = 'https://api.openai.com/v1/chat/completions';
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`
//     };
//     const body = JSON.stringify({
//       model: 'text-davinci-002',
//       messages: [{ role: 'user', content: userInput }]
//     });

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: headers,
//         body: body
//       });
//       const data = await response.json();
//       // Update state with the response from OpenAI
//       setResponse(data.choices[0].text);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>OpenAI Chat</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="user-input">Your message:</label><br />
//         <textarea
//           id="user-input"
//           name="user-input"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           required
//         ></textarea><br />
//         <input type="submit" value="Send" />
//       </form>
//       {response && (
//         <div>
//           <h3>Response:</h3>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatForm;
