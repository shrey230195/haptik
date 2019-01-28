# Haptik

Solutions for the assignment

## Q1 : Find Most Active users of a chat

Solution is in [active-users.js](https://github.com/shrey230195/haptik/blob/master/active-users.js) file.
before jumping to execute the script kindly run

```
npm install
```
```
node active-users.js
```

## Q3 : Write a function that given a list of strings and an input string will return True if you can create the input string from the list of strings

Solution is in [can_create.js](https://github.com/shrey230195/haptik/blob/master/can_create.js) file.

```
node can_create.js
```
## Q2 :  Twitter Schema Design
### * What technologies would you use to build out this platform? [tech-stack.txt](https://github.com/shrey230195/haptik/blob/master/Twitter/tech_stack.txt)
### * Write the schema of your database that is going to store the data 
- The Approach taken for schema design is in [Approach.txt](https://github.com/shrey230195/haptik/blob/master/Twitter/approach.txt)
* [User](https://github.com/shrey230195/haptik/blob/master/Twitter/Schema/user.server.model.js) - The User Schema
* [Tweet](https://github.com/shrey230195/haptik/blob/master/Twitter/Schema/tweet.server.model.js) - Schema for Tweets
* [Follower](https://github.com/shrey230195/haptik/blob/master/Twitter/Schema/follower.server.model.js) - Scheema for follower relationship
* [Activity](https://github.com/shrey230195/haptik/blob/master/Twitter/Schema/activity.server.model.js) - Scheema for logging activities
### * Write a function/API that will return all the tweets to show on the dashboard of aparticular user - [Timeline.server.controller.js](https://github.com/shrey230195/haptik/blob/master/Twitter/Controllers/timeline.server.controller.js)
### * How much can the system you have built scale up to? What are the limiting factors ofyour system and when will it start failing? - [problems_in_scale.txt](https://github.com/shrey230195/haptik/blob/master/Twitter/problems_in_scale.txt)
