// Q1 . You can find a file called chats.txt ​here​, 
// the file contains a group conversation among a group ofpeople.. 
// Write a function that reads from the file and returns the 3 most active users in theconversation.
// Chats.txt = https://s3.ap-south-1.amazonaws.com/haptikinterview/chats.txt

var fetch = require("node-fetch");

const baseUrl = 'https://s3.ap-south-1.amazonaws.com/haptikinterview/';
const files = 'chats.txt';
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;    
const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

getChatData(baseUrl,files)

function getChatData(baseUrl,file) {
  console.log('... sending request to fetch file');
  let url = baseUrl + file; 
  fetch(url)
    .then(checkStatus)     // to check if fetched properly             
    .then(parseText)       // to parse the response object as text
    .then(transformText)   // to get an array of each message with user,message and msgLength
    .then(consolidateChats)// to group the data by user with each user's totalMsgs,totalMsgsLength and avgMsgLength
    .then(mostActiveUsers) // sort the group by total msgs sent and get top 3.
    .catch(error => console.log('There was a problem!', error))  
}    

function transformText(data) {
  console.log('... parsing file');
  console.log('... separating sender and messages');
  console.log('... calculating each message length');
  return data.split("\n").map(line => {
    let splittedLine = line.split(':');    
    return {
       name : splittedLine[0].substr(1).slice(0, -1),// to remove first('<') and last('>') character from string 
       msg : splittedLine[1], // get the msg part
       msgLength : splittedLine[1]?splittedLine[1].length : undefined,
    }    
  })
  .filter(chat => chat.msg);  // get rid of extra newlines        
}

function consolidateChats(data) {
  console.log("... grouping user's messages");  
  console.log('... calculating total characters send');
  console.log('... calculating avg message length','\n');
  let userGrouped = groupBy(data,'name');
  let consolidatedData = Object.keys(userGrouped).map(name => {
    let userChat = userGrouped[name]   
    return {
      name : name,
      data : userChat,
      totalMsgs : userChat.length,
      totalMsgLen : userChat.reduce((a,b) => a + b.msgLength ,0),
      avgMsgLen : average(userChat.map(chat => chat.msgLength))
    }
  });
  return consolidatedData
}

function mostActiveUsers(data) {
  data = data.sort((a,b) => a.totalMsgs < b.totalMsgs)
  let mostActiveUser = template(data[0]);
  let secondMostActiveUser = template(data[1]);
  let thirdMostActiveUser = template(data[2]);
  console.log('----- Top 3 active users ------','\n')
  console.log('#1 ',mostActiveUser,'\n\n')
  console.log('#2 ',secondMostActiveUser,'\n\n')
  console.log('#3 ',thirdMostActiveUser,'\n\n')
  return [mostActiveUser,secondMostActiveUser,thirdMostActiveUser]
}

function template(user) {
  let string = user.name + ': Sent total ' + user.totalMsgs + ' messages comprising a total of ' + user.totalMsgLen +' characters with average message length being ' + Math.round(user.avgMsgLen) + ' characters'
  return string
}

function checkStatus(response) { 
  console.log('... checking Status') 
  if (response.ok) {
    console.log('... Status Ok. Data fetched successfully') 
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseText(response) {
  console.log('... getting text ready')
  return response.text();
}


