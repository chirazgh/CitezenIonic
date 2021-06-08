import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private api = "http://192.168.137.1:8000/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  addUser(user: FormData, motDePass_confirmation) {
    return this.http.post(this.api + "signup", user);
  }
  /*
  addUser(user: FormData,motDePasse_confirmation){
    return this.http.post(this.api+"signup", {user,motDePasse_confirmation});
  }*/
  loginUser(user) {
    return this.http.post<any>(this.api + "login", user);
  }

  getValidePosts() {


    return this.http.get(this.api + "getValidePosts", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }
  
  getDetailsPost(idPost) {


    return this.http.post(this.api + "getDetailsPost", {idPost}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  userModifPost(modifPost) {


    return this.http.post(this.api + "userModifPost", {modifPost},{headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  userSignalePost(signalPost) {


    return this.http.post(this.api + "userSignalePost", {signalPost},{headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  userEnregistrerPost(enregistrerPost) {


    return this.http.post(this.api + "userEnregistrerPost",{enregistrerPost}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  
  deletePost(deletePost) {


    return this.http.post(this.api + "deletePost",{deletePost}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getCurrenUser() {


    
    return this.http.get(this.api + "getCurrenUser", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })}
    
    );

  }

  getUserPosts(idUser) {


    return this.http.post(this.api + "getUserPosts",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getEnregistrerPosts(idUser) {


    return this.http.post(this.api + "getEnregistrerPosts",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getSumPostsUser(idUser) {


    return this.http.post(this.api + "getSumPostsUser",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getSumAbonnementsUser(idUser) {


    return this.http.post(this.api + "getSumAbonnementsUser",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }
  getSumSuivitsUser(idUser) {


    return this.http.post(this.api + "getSumSuivitsUser",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getUserPw(idUser) {


    return this.http.post(this.api + "getUserPw",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  modifUser(user) {


    return this.http.post(this.api + "modifUser",{user}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  modifImageUser(userim: FormData) {


    return this.http.post(this.api + "modifImageUser",userim, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  deletePostEnregistrer(deletePostEnregistrer) {


    return this.http.post(this.api + "deletePostEnregistrer",{deletePostEnregistrer}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getAbonneUsers() {


    return this.http.get(this.api + "getAbonneUsers", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getSuiviUsers() {


    return this.http.get(this.api + "getSuiviUsers", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getUserById(idUser) {


    return this.http.post(this.api + "getUserById",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  getAllUsersNames() {


    return this.http.get(this.api + "getAllUsersNames", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  ifCurrentUSignaledUser(ids) {


    return this.http.post(this.api + "ifCurrentUSignaledUser",{ids}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  ifCurrentUFollowsUser(ids) {


    return this.http.post(this.api + "ifCurrentUFollowsUser",{ids}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  unFollowUser(ids) {


    return this.http.post(this.api + "unFollowUser",{ids}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  followUser(ids) {


    return this.http.post(this.api + "followUser",{ids}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }
  
  getStoryUser() {


    return this.http.get(this.api + "getStoryUser", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }
  getStoryUserId(idUser) {


    return this.http.post(this.api + "getStoryUserId",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }
  
  
  logout() {


    return this.http.get(this.api + "logout", {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })});

  }

  userSignaleUser(signalUser) {


    return this.http.post(this.api + "userSignaleUser", {signalUser},{headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })}
    );

  }

  ifUserExists(idUser) {

 
    return this.http.post(this.api + "ifUserExists",{idUser}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })}
    );

  }

  getValideUserPosts(idUser){
 
    return this.http.post(this.api + "getValideUserPosts", {idUser},{headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })}
    );
  }
  
  ifPostBelongsUser(idPost) {


    return this.http.post(this.api + "ifPostBelongsUser",{idPost}, {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    })}
    );

  }
}
