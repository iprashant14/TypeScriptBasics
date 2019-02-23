import {GithubApiService} from "./GithubApiService";
import { User } from "./User";
import { Repo } from "./Repo";
import * as _ from "lodash";

let svc = new GithubApiService();
if(process.argv.length < 3){
    console.log("Please provide userName as an argument");
}else{
    let userName = process.argv[2];

    svc.getUserInfo(userName,(user : User) =>{
        //console.log(user);
        svc.getRepos(userName,(repos:Repo[]) =>{
            //console.log(repos);
            let sortedRepos = _.sortBy(repos,[(repo:Repo) => repo.forkCount * -1]);
            let filteredRepos = _.take(sortedRepos,5);
            user.repos=filteredRepos;
            console.log(user);
        });
    });
    
}

