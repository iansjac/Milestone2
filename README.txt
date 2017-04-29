REGISTER IAN
http://localhost:3000/user/register
request: POST
json: 
{
"username" : "ian01",
"password" : "password",
"email" : "ian@qu.edu",
"phone_number" : "555-555-5555",
"first_name" : "ian",
"last_name" : "jacobs"
}

REGISTER TROY 
http://localhost:3000/user/register
request: POST
json: 
{
"username" : "troy01",
"password" : "password",
"email" : "troy@qu.edu",
"phone_number" : "888-888-8888",
"first_name" : "troy",
"last_name" : "ingel"
}

LOGIN AS TROY
http://localhost:3000/user/login
request: POST
json: 
{
"username" : "troy01",
"password" : "password"
}

SEARCH FOR IAN
http://localhost:3000/user/search
request: POST
json:
{
"username" : "ian01"
}

SEND FRIEND REQUEST FROM TROY TO IAN
http://localhost:3000/user/search/ian01?
request: POST
json: NONE

SEND BUY TRANSACTION REQUEST FROM TROY TO IAN
http://localhost:3000/friendslist/ian01/transactions
request:POST
json:
{
"status" : "PENDING",
"sender_type" : "BUY",
"receiver_type" : "SELL",
"amount" : 20
}

LOG OUT OF TROY
http://localhost:3000/user/logout
request: GET

LOG IN AS IAN
http://localhost:3000/user/login
request: POST
json: 
{
"username" : "ian01",
"password" : "password"
}

SHOW TRANSACTION REQUESTS
http://localhost:3000/transactionrequests
request: GET
json: NONE

http://localhost:3000/friendslist/troy01/transactions/*transaction id from previous get request with a ? at end*
example: http://localhost:3000/friendslist/troy01/transactions/12345?
request: PUT
json: 
{
"status" : "ACCEPTED"
}

SHOW FRIEND REQUESTS
http://localhost:3000/friendrequests
request: GET
json: NONE

http://localhost:3000/friendrequests/*request id from previous get request with a ? at end*
example: http://localhost:3000/friendrequests/12345?
request: PUT
json: 
{
"status" : "ACCEPTED"
}

SHOW IANS FRIENDS
http://localhost:3000/friendslist
request: GET
json: NONE

SHOW IANS PROFILE
http://localhost:3000/profile
request: GET
json: NONE

UPDATE IANS PROFILE
http://localhost:3000/profile
request: PUT
json: 
{
"phone_number" : "333-333-3333"
}

REMOVE TROY AS FRIEND
http://localhost:3000/friendslist/troy01?
request: DELETE
json: NONE