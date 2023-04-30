$(document).ready(function() {

    const url = "50.21.190.71/get_tweets";

    function autoRefresh() {
        var isChecked = document.getElementById("feed-refresh");

        if(!isChecked) {
            time = setInterval(function() {
            getRequest();
            }, 10000);
        }
        else {
            clearInterval(time);
        }
    }

    autoRefresh();

    document.getElementById("feed-refresh").addEventListener("click", autoRefresh);
    document.getElementById("feed-refresh-box").addEventListener("change", pauseFeed);
    getRequest();

    function getRequest() {
        fetch(url)
        .then(res => res.json()) .then(data =>{


        })
        .catch(err => {
            console.log(err);
        });
    }

    function removeDuplicates(arr) {

    }
    function searchArray(arr, searchString) {

    }
    function appendTweet(arr) {

    }

    
});