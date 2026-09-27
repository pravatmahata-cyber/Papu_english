import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "@/lib/supabase";
export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
 async function submit(){const {error}=await supabase.auth.signInWithPassword({email,password}); if(error) Alert.alert("Sign in failed",error.message); else router.replace("/home");}
 return <View style={{flex:1,justifyContent:"center",padding:24,gap:12}}><TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/><TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/><Button title="Sign In" onPress={submit}/><Link href="/auth/register">Create account</Link><Link href="/auth/forgot-password">Forgot password?</Link></View>;
}
