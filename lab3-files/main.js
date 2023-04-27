const url = "50.21.190.71/get_tweets";

var duplicatesArr = [];
var tweetsArr = [];

function autoRefresh(){
    var isChecked = document.getElementById("feedRefresh").isChecked;

    if(isChecked == false){
        time = setInterval(function(){
            getRequest();

        }, 10000);

    } else if(isChecked == true){
        clearInterval(time);
    }
}

autoRefresh();
document.getElementById('feedRefresh').addEventListener('click', autoRefresh);

getRequest();

function getRequest(){
    fetch(url) 
    .then(res => res.json()) .then(data => {
        removeDuplicates(duplicatesArr);
        
        //set the center div to be the tweets

        //when the search is activated:
        // search all tweets for matching values
        // set the current tweets to be ones that match search value
    })
    .catch(err => {

    console.log(err)})
}

function removeDuplicates(duplicatesDataArr){
    //for all of new tweets
    // check the array of all previous tweets for any duplicates
    // remove duplicates
    // if not a dulpicate, add it to list of all previous tweets

}

function searchArray(dataArr, value){
    // go through earch tweet, and check if there is a matching value in 
    // return array of all matching tweets

}

function appendTweets(dataArrUnsort){
    //get the content-center element. we want to add tweets to this

    // suggest emptying the current tweets at some point

    // sort the array of tweets chronologically

    // for each tweet

        //create a div that you can append to content-center

        //we want to include the profile picture
            //can check if the image exists
                //var hyyp = new XMLHttpRequest);
                //http.open("HEAD", imgURL)
                //http.send();
                //if (http.status != 404)
                    //Success!
                    //Add the img to the tweet we are creating
                //else
                    //append a default image

        
        //create all of the additional pieces of information
            //date (formatted)
            //tweet contents
            //username

        //you can create all of these div elements witrh jquery
        // and then manually add them to the tweet div

        

}


const tweetContainer = document.getElementById('tweet boxes');

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
function refreshTweets(tweets) {
    // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
    // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }

    // create an unordered list to hold the tweets
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
    const tweetList = document.createElement("ul");
    // append the tweetList to the tweetContainer
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
    tweetContainer.appendChild(tweetList);

    // all tweet objects (no duplicates) stored in tweets variable

    // filter on search text
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
    const filteredResult = tweets.filter(tweet => tweet.text.includes("Bitcoin"));
    // sort by date
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
    const sortedResult = filteredResult.sort(tweets => tweet.);

    // execute the arrow function for each tweet
    // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweet = document.createElement("li");

        // e.g. create a div holding tweet content
        const tweetContent = document.createElement("div");
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const tweetText = document.createTextNode(tweetObject.text);
        // append the text node to the div
        tweetContent.appendChild(tweetText);

        // you may want to put more stuff here like time, username...
        tweet.appendChild(tweetContent);

        // finally append your tweet into the tweet list
        tweetList.appendChild(tweet);
    });
}