import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { supabase } from "../src/lib/supabase";

const goals=["Speak confidently","Improve pronunciation","Improve grammar","Interview prep","Travel","Workplace","Everyday conversation"];
const times=[5,10,15,20,30,45];

export default function Onboarding(){
 const [step,setStep]=useState(0); const [goal,setGoal]=useState(goals[0]); const [minutes,setMinutes]=useState(15); const [level,setLevel]=useState("beginner"); const [saving,setSaving]=useState(false);
 const title=step===0?"What is your main goal?":step===1?"How much time can you practice daily?":"What is your current English level?";
 const options=step===0?goals:step===1?times.map(String):["beginner","elementary","intermediate","upper_intermediate","advanced"];
 const selected=step===0?goal:step===1?String(minutes):level;
 const setSelected=(v:string)=>step===0?setGoal(v):step===1?setMinutes(Number(v)):setLevel(v);
 const finish=async()=>{setSaving(true); try{const {data:{user}}=await supabase.auth.getUser(); if(user) await supabase.from("profiles").update({learning_goal:goal,daily_goal_minutes:minutes,english_level:level,onboarding_completed:true}).eq("id",user.id); router.replace("/home");} finally{setSaving(false)}};
 return <SafeAreaView style={{flex:1,backgroundColor:"#F7F8FC"}}><ScrollView contentContainerStyle={{padding:24,gap:18}}><Text style={{fontSize:32,fontWeight:"800",color:"#171923"}}>Build your English plan</Text><Text style={{fontSize:16,color:"#656A7A"}}>Step {step+1} of 3</Text><Text style={{fontSize:24,fontWeight:"800",marginTop:16}}>{title}</Text>{options.map(v=><Pressable key={v} onPress={()=>setSelected(v)} style={{padding:18,borderRadius:16,borderWidth:2,borderColor={true:selected===v?"#5B5FEF":"#E2E4EC"}[true] as string,backgroundColor:"#fff"}}><Text style={{fontSize:17,fontWeight:"700"}}>{v.replace("_"," ")}</Text></Pressable>)}<Pressable disabled={saving} onPress={()=>step<2?setStep(step+1):finish()} style={{padding:18,borderRadius:16,backgroundColor:"#5B5FEF",alignItems:"center",marginTop:10}}><Text style={{color:"#fff",fontSize:17,fontWeight:"800"}}>{saving?"Saving…":step<2?"Continue":"Start learning"}</Text></Pressable></ScrollView></SafeAreaView>
}
