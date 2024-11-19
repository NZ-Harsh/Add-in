import  { useEffect, useState } from 'react'
import Treeview from '../TreeView/TreeView'
import { useSelector } from 'react-redux'

export const ResultTab = (props:any) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>('')

const resultExpandedKeys = useSelector((state:any) =>state.TreeDataReducer).result_tab_expanded_key
const resultSelectedKeys = useSelector((state:any) =>state.TreeDataReducer).result_tab_selected_key
const resultselectednode = useSelector((state:any) => state.TreeDataReducer).result_tab_selected_node

useEffect(()=>{
  if(resultExpandedKeys?.length > 0){
    setExpandedKeys([...resultExpandedKeys])
   
  } 
},[resultExpandedKeys])

useEffect(() =>{
if(resultSelectedKeys?.length > 0){
  setSelectedKeys(resultSelectedKeys)
}
},[resultSelectedKeys])
console.log("redux selected",resultSelectedKeys)

useEffect(() =>{
  if(resultselectednode?.length > 0){
    setSelectedNode(resultselectednode)
 console.log("node",resultselectednode)
  }
},[resultselectednode])

  return (
    <div>
        <Treeview treedata={props.treedata} 
        handleSelect={props.handleSelect} 
        expandedkeys= {expandedKeys} 
        selectedkeys ={selectedKeys} 
        instanceName= "nz-result-tab-tree"
        selectedNode = {resultselectednode}
         />
    </div>
  )
}
