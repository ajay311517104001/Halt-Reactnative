export const RegisterUserQuery = `
mutation($input:userinput!){
    addNewUser(userInput:$input){
     user_id
     token
    }}
 `
