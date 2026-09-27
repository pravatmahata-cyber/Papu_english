export interface AIProvider {
  reply(input:{level:string; topic:string; messages:Array<{role:"user"|"assistant";content:string}>}):Promise<{message:string; corrections?:Array<{original:string; correction:string; explanation:string; naturalAlternative?:string}>}>;
}
