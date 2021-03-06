### The important entites of applications are : 

- **Users**
- **Tweets**
- **Actions on Users**
- **Actions on Tweets**
- **Counts of Actions**

### What do they mean ?
- **Actions on Users :** Users follow other users and see their tweets

- **Actions on Tweets :** A user can post a tweet,re-tweet a tweet,like a tweet, Reply to a tweet,Reply to a reply and Share a tweet.Let's call all these 'Activities'

- **Counts of Actions :** noOfLike, noOfRetweets, noOfReplies, noOfShares

- **Type of Tweets :** Original Tweet,Re-tweet, A reply.

### The 4 Collections :

- **User Collection**
- **Tweet Collection**
- **Follower Collection**
- **Activity Collection**

### Application Logic
  - Whenever user1 tweets, a document is created in "Tweet" collection with 'isTweet' key set as True. 

  - Now when 'user2' opens the app, the system fetches all users who 'user2' follows from the "Follower" collection. 

  - **For all those users who 'user2' follows, fetch all their tweets from the "Tweet" Collection and then join and sort them based on the "createdAt" field.**

  - Whenever user2, likes a tweet, the corresponding activity in the "Activity" Collection for activity "Like" gets updated with user_ids for user1 and user2. Also the "likes" field in the "Tweet" Collection for the corresponding tweet document gets incremented by 1.

  - Similarly for the other activities - Share, Reply and Retweet. For Reply and Retweet we need to set "isReply" and "isRetweet" flag in "Tweet" Collection respectively.

  - In the tweet details page, all replies and retweets are fetched from the "Tweet" Collection, for the corresponding tweet id. The field 'originalTweet' is the field which is used to search for the replies and retweets.


