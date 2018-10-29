import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    input: string = '';
    stringIsEmpty: boolean = true;
    statusMessage: string = '';
    searchHistory = [];

    //array of tweets
    tweets: Tweet[] = [{id: 1234; text: 'blksjdf'}];
    ids = [];

    //search query
    query = 'banana';

    //test object insertion
    tweetshit;
    bananaTweet: Tweet;

    constructor(private twitter: TwitterService){    }


    checkString(input: String){
        if(input!==""){
            this.stringIsEmpty = false;
        }
            

    }

    onSearch(){
        this.statusMessage = 'User searched: ' + this.input;
        this.searchHistory.push(this.input);
        this.input='';
        
    }


    //!! WARNING: BROKEN CODE
    //start writing code here for searching twitter api
    ngOnInit(){
            this.twitter.search(this.query).subscribe(x => this.tweetshit = x);
            printTweet();
            //this.twitter.search('banana').subscribe(x => this.bananaTweet = x.data);
            //this.getTweets();
        }

  // !!! trying to add tweets from /search/tweets endpoint
  //this.twitter.search(this.query).subscribe(tweets => {
  //  tweets.data.forEach( tweet => {
  //    this.tweets.unshift(tweet);
  //  });
  //});

    

    getTweets() {
    this.twitter.search(this.query).subscribe(tweets => {
      tweets.data.forEach(tweet => {

          this.tweets.push(tweet);
        // if (this.ids.indexOf(tweet.id_str) < 0) {
        //   this.ids.push(tweet.id_str);
        //   this.tweets.unshift(tweet);
        // }
      })
    });
  }
  


}
