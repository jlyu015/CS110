dataArr = [];
$(document).ready(function(){
    const url = "http://50.21.190.71/get_tweets";

    var time;
    var paused = false;
    var refreshFeedClicked = document.getElementById("feedRefresh") ;
    var pauseFeed = document.getElementById("feed-refresh-box");

    //reset default values when refreshed
    document.getElementById("searchBar").value = ""; 
    pauseFeed.checked = false;
    tweets = document.getElementById("tweet-container");
    tweets.innerHTML = "";
    dataArr = [];

    function autoRefresh(){
        time = setInterval(async function(){
            if(!paused) {
                getRequest();
            }
        }, 10000);


        // console.log(pauseFeed);

        pauseFeed.addEventListener("change", function() {
            paused = this.checked;
            console.log("paused: ", paused);
        });
        refreshFeedClicked.addEventListener('click', function(){
            console.log("clicked!");
            clearInterval(time);
            getRequest();
            autoRefresh();
        });

    }


    

    

    function getRequest(){
        fetch(url) 
        .then(res => res.json()) .then(data => {
            // console.log(data);
            dataArr.push(...data);//extend dataArr with newly fetched data
            newData = removeDuplicates(dataArr);
            // console.log(newData);

                
            //get text from search bar
            const searchValue = document.getElementById("searchBar").value;
            const filtered = newData.filter(tweet => tweet.text.includes(searchValue));
            console.log("filtered by",searchValue, filtered);

            //sort by chronological order
            filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
            console.log("after date sort: ", filtered);
            // search all tweets for matching values
            appendTweets(filtered);
            // filtered.forEach(tweet =>{
            //     const tweetBox = document.createElement("div");
            //     tweetBox.className = "box";
            //     tweetBox.innerHTML = '';
            // });

        })
        .catch(err => {

        console.log(err)})
    }
    autoRefresh();
    getRequest();

});
function removeDuplicates(data){
    const result = [];
    for(let i = 0; i < data.length; i++) {
        if(!isFound(result, data[i].user, data[i].text)) {
            result.push(data[i]);
        }
    }
    return result;
}
function isFound(result, user, text) {
    for(let i = 0; i < result.length; i++) {
        if(result[i].text === text && result[i].user === user) {
            return true;
        }
    }
    return false;
}

function searchArray(dataArr, value){
    // go through earch tweet, and check if there is a matching value in 
    // return array of all matching tweets

}

function appendTweets(data){
    //get the content-center element. we want to add tweets to this
    tweets = document.getElementById("tweet-container");
    // suggest emptying the current tweets at some point
    // console.log(tweets)
    tweets.innerHTML = "";
    // for each tweet
    data.forEach(tweet => {
        const tweetDiv = document.createElement("div");
        tweetDiv.className = "box";
        
        profilePictureDiv = document.createElement("div");
        profilePictureDiv.className = "profile-picture-tweet";

        profilePicture = document.createElement("img");
        profilePicture.alt = "profile picture";
        format(profilePicture);

        profilePicture.src = "images/ratatouille.jpg";

        var http = new XMLHttpRequest();
        http.open("HEAD", tweet.avatar, false);

        // console.log("before",http.status);
        http.send();
        // console.log("after",http.status);
        if(http.status != 404){
            profilePicture.src = tweet.avatar;
        }
        else{
            // console.log("are you in here");
            profilePicture.src = "images/ratatouille.jpg";
        }
        


        profilePictureDiv.append(profilePicture);
        profileNameDiv = document.createElement("div");
        profileNameDiv.className = "profile-name-tweet";
        //<strong style="display: inline;">Remy </strong><p class="gray-text" style="display: inline;">@remy Nov 19</p>

        profileName = document.createElement("strong");
        profileName.style = "display: inline;"
        profileName.innerHTML =tweet.user_name;
        //maybe do this in css
        p = document.createElement("p");
        p.className = "gray-text"
        p.style = "display: inline;";
        date = new Date(tweet.date);
        formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        
        p.innerHTML = "   @" + tweet.user_name +"\t" +formattedDate;

        
        profileName.append(p);
        profileNameDiv.append(profileName);

        // profileName.innerHTML += "date" + "</p>";

        tweetText = document.createElement("div");
        tweetText.className = "tweet-info";
        tweetText.innerHTML = tweet.text;

        // console.log(profilePicture.innerHTML);
        // console.log(profileName.innerHTML);
        // console.log(tweetText.innerHTML);

        tweetDiv.append(profilePictureDiv);
        tweetDiv.append(profileNameDiv);
        tweetDiv.append(tweetText);
        tweets.append(tweetDiv);
        // console.log(tweet.user_name);
    });

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

function format(p) {
    p.style.position = "relative";
    p.style.left = "10px";
    p.style.top = "10px";
    p.style.borderRadius = "50%";
    p.style.border = "solid 2px white";
    p.style.width = "48px";
    p.style.height = "48px";
    p.style.display = "flex";
    p.style.marginBottom = "20px";

}
// const tweetContainer = document.getElementById('tweet boxes');

// /**
//  * Removes all existing tweets from tweetList and then append all tweets back in
//  *
//  * @param {Array<Object>} tweets - A list of tweets
//  * @returns None, the tweets will be renewed
//  */
// function refreshTweets(tweets) {
//     // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
//     // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
//     while (tweetContainer.firstChild) {
//         tweetContainer.removeChild(tweetContainer.firstChild);
//     }

//     // create an unordered list to hold the tweets
//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
//     const tweetList = document.createElement("ul");
//     // append the tweetList to the tweetContainer
//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
//     tweetContainer.appendChild(tweetList);

//     // all tweet objects (no duplicates) stored in tweets variable

//     // filter on search text
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
//     const filteredResult = tweets.filter(tweet => tweet.text.includes("Bitcoin"));
//     // sort by date
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
//     const sortedResult = filteredResult.sort(tweets => tweet.);

//     // execute the arrow function for each tweet
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
//     sortedResult.forEach(tweetObject => {
//         // create a container for individual tweet
//         const tweet = document.createElement("li");

//         // e.g. create a div holding tweet content
//         const tweetContent = document.createElement("div");
//         // create a text node "safely" with HTML characters escaped
//         // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
//         const tweetText = document.createTextNode(tweetObject.text);
//         // append the text node to the div
//         tweetContent.appendChild(tweetText);

//         // you may want to put more stuff here like time, username...
//         tweet.appendChild(tweetContent);

//         // finally append your tweet into the tweet list
//         tweetList.appendChild(tweet);
//     });
// }