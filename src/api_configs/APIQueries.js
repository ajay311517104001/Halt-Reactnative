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

export const getIncomingOrderQuery=`{
  getIncomingOrders {
    orderList{
     id,
     name,
     items{
       item_name,
       count
     },
     total,
     status
     
     
   }
 }
 }`

 export const exitFromFlowQuery=`query($input:exitFromFlowInput!){
  exitFromFlow(exitFromFlowId:$input){
   orderList{
   id,
    name,
    items{
      item_name,
      count
    },
    total,
    status
   
   
   },
   error
 }}`