import conf from "../config/config";
import {Client,Account,ID} from "appwrite";


export class AuthService{

    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);

    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                return this.login(email,password);
            } else {
                return  userAccount;
            }
        } catch (error) {
            console.log("SignUp failed ",error)

        }

    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log("Login Authentication failed ",error)
        }
    }


    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Current User Error method ",error)
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error in Logout Method");
        }
    }

   

}
const authService=new AuthService();

export default authService