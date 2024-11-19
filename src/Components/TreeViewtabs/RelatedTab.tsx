import Treeview from '../TreeView/TreeView'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
export const RelatedTab = (props:any) => {

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const relatedExpandedKeys = useSelector((state:any) =>state.TreeDataReducer).related_tab_expanded_key

  useEffect(()=>{
    if(relatedExpandedKeys?.length > 0){
      setExpandedKeys([...relatedExpandedKeys])
      // console.log("redux expandedkeys",resultExpandedKeys)
    } 
  },[relatedExpandedKeys])


  return (

    <div>
        <Treeview treedata={props.treedata} instanceName='nz-related-tab-tree'
         expandedkeys={expandedKeys} selectedkeys={[]} handleSelect={props.handleSelect}
         selectedNode={''}
         />

    </div>
  )
}
