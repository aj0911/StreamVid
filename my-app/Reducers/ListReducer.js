import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    watchLater:[]
}

export const ListsReducer = createSlice({
    name:'ListsReducer',
    initialState,
    reducers:{
        add:(state,action)=>{
            let flag = false;
            state.watchLater.forEach(x=>{
                if(x.user.email===action.payload.user.email){
                    x.items.forEach(y=>{
                        if(y.id===action.payload.item.id){
                            flag = true;
                        }
                    })
                    if(!flag){
                        x.items.push(action.payload.item);
                        flag=true;
                    }
                }
            })
            if(!flag){
                state.watchLater.push({user:action.payload.user,items:[action.payload.item]})
            }
        },
        remove:(state,action)=>{
            state.watchLater.forEach(x=>{
                if(x.user.email===action.payload.user.email){
                    const index = x.items.findIndex(x=>x.id===action.payload.removeId);
                    x.items.splice(index,1);
                }
            })
        },
        empty:(state)=>{
            state.watchLater = [];
        }
    }
})

export const {add,empty,remove} = ListsReducer.actions;