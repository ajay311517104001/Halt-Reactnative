export const RegisterUserQuery = `
mutation($input:userinput!){
    registerNewUser(userInput:$input){
     user_id
     token
     message
     userCreated
    }}
 `
