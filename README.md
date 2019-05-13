# RandomStuff

This project requires node and git just to get started.
Initialize git repo somewhere on your machine.
Clone this repository to that git repo.
Run npm install.
Run node app.js to start it.

It is currently configured to hit localhost:3003. If you don't like that port, by all means change it. But make sure you point to the right port when you run the urls.

You can test it with the following urls:

1) http://localhost:3003/  - Get - No parameters - will return json for all agents as a list. 

2) localhost:3003/agentlist/add - Post -  You will need to post a json object representing the agent in the raw field under body. Change the header type to application/json. You can use an object like this:

{
"_id": 110, 
        "name": "Dorkface Dorkface",
        "address": "333 Kookybanana St",
        "city": "Appleland",
        "state": "CO",
        "zipCode": "98101",
        "tier": 2,
        "phone":{
            "primary": "206-221-2345",
            "mobile": "206-555-3211"
        }
}


  If there is no agent with an _id of 110 in the database, Dorkface's data will be added to the file and returned at the bottom of the response object. Do a search to find him. If there is an id of 110, it will not be submitted.
  
  3) localhost:3003/agentdetail/321  - Get - Will return detail data for a single agent by agent id. If there is an agent, Postman will return his/her data. If not, it will tell you no one's been found.
  
  4) localhost:3003/agentdetail/update/ - Post - You will need to post a JSON object representing the agent. The object will
  find the existing agent object by _id and then overwrite it with the json response object. For that reason, we must assume that the front end object will have access to and be able to pass in the whole object.  As with the agent add url, you'll need to put an object in the raw field and set the headertype to application/json.
  
  In this case, we'll update Dorkface's city and zip code. If he, or someone with his id, is in the file, you should see him with the new updated values at the bottom of the response. If he's not, nothing will be updated.
  
  {
"_id": 110, 
        "name": "Dorkface Dorkface",
        "address": "333 Kookybanana St",
        "city": "Bananaland",
        "state": "CO",
        "zipCode": "22222",
        "tier": 2,
        "phone":{
            "primary": "206-221-2345",
            "mobile": "206-555-3211"
        }
}

5) localhost:3003/customer/list/101 - Get - Will return all customers associated with this id.

6. http://localhost:3003/customer/add - Post - If there is no one with existing _id, will add all data in response object to database. As with other posts, make sure you put a valid json data object in the raw field and set the headertype to application/json.

		{"id": 445,
        "agent_id": 1987,
        "guid": "54fc8606-0630-42f9-9e3c-716772df09bf",
        "isActive": true,
        "balance": "$333330",
        "age": 57,
        "eyeColor": "blue",
        "name": {
            "first": "Neva",
            "last": "Bananaupthenose"
        },
        "company": "Norgles",
        "email": "neva.calderon@isotronic.info",
        "phone": "+1 (985) 502-2956",
        "address": "573 Turner Place, Yukon, Federated States Of Micronesia, 762",
        "registered": "Wednesday, January 31, 2018 12:40 PM"}

  7.) localhost:3003/customer/delete/:_id - Get - If there is a customer in the file with a matching id, it will be deleted and all of the customers in the db will be returned minus that one. If it's not in there, nothign will happen.
  
  8)  localhost:3003/customerdetail/:_id - Get - Will return detail information for _id if it exists. If not, nothing will happen.
  9) localhost:3003/customerdetail/update/ - Post - If a customer exists with the same id as what's in submitted object, it will update the customer and return all customers including this updated one.
  
  

  
  
  
  
  
