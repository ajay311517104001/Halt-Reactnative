export const getMenuQuery = `
{
    getMenu{
      menuList{
        id
        item
        type
        price
      }
      error
    }
  }
 `


 export const updateMenuQuery = `
 mutation($input:menuInput!){
    updateMenu(menuInput:$input){
      
    message
    }
  }
 `
export const incomingOrderQuery=`
mutation($input:incomingOrderInput!){
  incomingOrder(incomingOrderInput:$input){
    
    message
  }
}`