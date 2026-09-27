import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { supabase } from "@/lib/supabase";
export default function ForgotPassword(){const [email,setEmail]=useState(""); async function submit(){const {error}=await supabase.auth.resetPasswordForEmail(email); if(error) Alert.alert("Reset failed",error.message); else Alert.alert("Check your email","If the account exists, a reset link will be sent.");} return <View style={{flex:1,justifyContent:"center",padding:24,gap:12}}><TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail}/><Button title="Send reset link" onPress={submit}/></View>;}
