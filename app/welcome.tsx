import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function Welcome(){
  return <View style={s.container}><Text style={s.title}>Papu English</Text><Text style={s.tagline}>Speak English with Confidence</Text><Link href="/auth/register" style={s.button}>Get Started</Link><Link href="/auth/login" style={s.link}>I already have an account</Link></View>;
}
const s=StyleSheet.create({container:{flex:1,justifyContent:"center",padding:28,gap:18},title:{fontSize:40,fontWeight:"800"},tagline:{fontSize:18},button:{backgroundColor:"#111",color:"#fff",padding:16,borderRadius:14,textAlign:"center"},link:{textAlign:"center",padding:12}});
