const initialResult :any = {}

const TreeDataReducer =(state = initialResult, action:any) =>{
    switch(action.type){

        case "RESULT_TREE_DATA":return{
            ...state,
            result_tree_data:action.data
        } 
        case "RELATED_TREE-DATA":return{
            ...state,
            related_tree_data:action.data
        }
        case "RESULT_TAB_EXPANDED_KEY":return{
            ...state,
            result_tab_expanded_key:action.data
        }
        case "RESULT_TAB_SELECTED_KEY":return{
            ...state,
            result_tab_selected_key:action.data
        }
        case "RELATED_TAB_EXPANDED_KEY":return{
            ...state,
            related_tab_expanded_key:action.data
        }
        case "RESULT_TAB_SELECTED_NODE":return{
            ...state,
            result_tab_selected_node:action.data
        }
        default:return state
    }
}
export default TreeDataReducer