'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () =>{
    // try {
        
    // } catch (error) {
    //     console.error('Erro', error);
    // }
}

export const signUp = async (userData: SignUpParams) =>{
    //destructuring sitanx :
    const {email, password, firstName, lastName} = userData;
   // ou utilizar direto com userData.email
    try {
        //Mutation / Database / Make fetch

        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("my-custom-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount);

    } catch (error) {
        console.error('Erro', error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();

      const user =  await account.get();
      return parseStringify(user);
    } catch (error) {
      return null;

    }
  }
  