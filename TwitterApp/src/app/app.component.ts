import { Component, OnInit } from '@angular/core';
import { TwitterService } from './twitter.service';
import { Tweet } from './tweet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TwitterService]
})
export class AppComponent implements OnInit {

  title = 'TwitterApp';
  user;
  // t: Tweet = {
  //  id: 1234;
  //   text: 'bllblals';
  // };
  tweets: Tweet[] = [];


  constructor(private twitter: TwitterService) {}

   // manually subscribe to observable returned by user()
  ngOnInit() {
  this.twitter.user().subscribe(x => this.user = x.data);

  // !!! trying to add tweets from /search/tweets endpoint
  this.twitter.search().subscribe(tweets => {
    tweets.data.forEach( tweet => {
      this.tweets.unshift(tweet);
    });
  });
  }
}
