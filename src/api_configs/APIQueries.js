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

 export const cancelOrderQuery =`mutation($input: cancelOrderInput!){
  cancelOrder(cancelOrderInput:$input){
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
    error
  }
}`


export const updateOrderQuery =`
mutation($input: updateOrderInput!){
  updateOrder(updateOrderInput:$input){
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
    error
  }
}
`

export const deleteMenuItemQuery =`
mutation($input:delete_menu_inputobj!){
  deleteMenuItem(deleteMenuInput:$input){
    message
  }
}`