import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
export default function Register(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
 async function submit(){const {error}=await supabase.auth.signUp({email,password}); if(error) Alert.alert("Registration failed",error.message); else {Alert.alert("Check your email","Verify your email before signing in."); router.replace("/auth/login");}}
 return <View style={{flex:1,justifyContent:"center",padding:24,gap:12}}><TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/><TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/><Button title="Create account" onPress={submit}/></View>;
}
