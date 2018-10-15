import { Component, OnInit } from '@angular/core';

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

    constructor(){

    }

    ngOnInit(){

    }

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

}
