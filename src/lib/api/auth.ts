'use server'
import {createClient} from "@/utils/supabase/server";
import {User} from "@/lib/types";


export async function findUserByEmail(email: string): Promise<User | null> {
    const client = await createClient();

    const { data, error } = await client
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    if(error) {
        console.log(error)
        return null
    } else {
        console.log(data)
        return data;
    }
}


export async function createAccount(email: string, password: string, firstName: string, lastName: string, phoneNumber: string): Promise<User | null> {
    const client = await createClient();


    const register = await client.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                firstName: firstName,
                lastName: lastName,
                phone: phoneNumber,
            }
        }
    })
    if(register.error && !register.data.user) {
        console.log('autherror')
        console.log(register.error)
        return null
    }
    const dbuser = await client.from('users').insert({
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        userId: register.data.user?.id
    }).single()
    if(dbuser.error) {
        console.log('dberror')

        console.log(dbuser.error)
        await client.auth.admin.deleteUser(register.data.user!.id)
        return null
    }
    console.log('success')
    return dbuser.data;

}


export async function signInWithPassword(email: string, password: string) {
    const client = await createClient()

    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
    })
}