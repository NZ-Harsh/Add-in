import Tree from 'rc-tree';
import { ReactSVG } from 'react-svg';
import { TreeNodeProps } from 'rc-tree';
import { useCallback, useState, useEffect } from 'react';
import { TreeNodeType } from '../../interface';
import { autoExpandDefaultNodesOfTree } from '../../Common/Common';
import { getDevicemodelSvg, getPropertiesForEqidlist } from '../../redux/action/libraryservice';
import PropertyTable from '../PropertyTable';
import SvgContent from '../SvgContent';
import 'rc-tree/assets/index.css'
import { useDispatch } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import {insertSvgContentIntoOffice} from '../../Common/Common'


const Treeview = (props: any) => {

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeType | any>([]);
  const [propertyData, setPropertyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [stencilResponse, setStencilResponse] = useState<string>('');
  const [Eqid, setEqId] = useState<string | string>('');
  const [productnumber, setProductNumber] = useState<string[]>([])
  const [shapeCounter, setShapeCounter] = useState<number>(0);
  const dispatch = useDispatch()


  const switcherIcon = ({ expanded, isLeaf, selected }: TreeNodeProps) => {
    if (isLeaf) {
      return null;
    }

    const svgColor = selected ? 'black' : 'var(--font-color)';

    return expanded ? (
      <ReactSVG
        src="./assets/Icons/Down_128x128.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('fill', svgColor);
          svg.setAttribute('height', '16px');
          svg.setAttribute('width', '16px');
        }}
      />
    ) : (
      <ReactSVG
        src="./assets/Icons/Down_128x128.svg"
        beforeInjection={(svg) => {
          svg.setAttribute('fill', svgColor);
          svg.setAttribute('height', '16px');
          svg.setAttribute('width', '16px');
        }}
        style={{ transform: 'rotate(270deg)' }}
      />
    );
  };
  useEffect(() => {
    if (props.treedata) {
      // Apply autoExpand on first-time tree render
      autoExpandDefaultNodesOfTree(props.treedata).then(async ({ expandedKeys, selectedNode, isSelected }) => {
        setExpandedKeys(expandedKeys);

        if (selectedNode.EQID && isSelected) {
          GetPropertyValue(selectedNode.EQID);

          setSelectedKeys([selectedNode.key]);
          setSelectedNode(selectedNode);
        } else if (selectedNode.ShapeID) {
          await callApiForGetDevicePreview(selectedNode.ShapeID)
          setSelectedKeys([selectedNode.key]);
          setProductNumber(selectedNode.ProductNumber);
        }
        else {
          setSelectedKeys([selectedNode.key]);
          setSelectedNode(selectedNode);
        }
      });

      console.log('initial treeData', props.treedata);
    }
    // eslint-disable-next-line
  }, [props.treedata]);



  useEffect(() => {
    setExpandedKeys([...props.expandedkeys])
  }, [props.expandedkeys])

  useEffect(() => {
    if(props.instanceName === "nz-result-tab-tree"){
      setSelectedKeys([...props.selectedkeys])
    }
  }, [props.selectedkeys])



  const handleExpandMainTree = async (expandedKeys: any, { node, expanded, }: { node: any; expanded: boolean; nativeEvent: MouseEvent }) => {
    let newExpandedKeys = [...expandedKeys]
    const eqid = node.EQID;
    console.log('Expand/Collapse node:', eqid);

    if (!expanded) {
      newExpandedKeys = newExpandedKeys.filter(key => key !== node.key);
      setExpandedKeys(newExpandedKeys);
      if (props.instanceName === "nz-result-tab-tree") {
        dispatch({ type: "RESULT_TAB_EXPANDED_KEY", data: newExpandedKeys })
        dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: node })
        await props.handleSelect('');

      }
      if (props.instanceName === "nz-result-tab-tree") {
        dispatch({ type: "RESULT_TAB_SELECTED_KEY", data: [node.key] })
        dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: node })

      }
      setSelectedKeys([node.key]);
      setSelectedNode(node);
      setEqId('')

      if (!node.EQID) {
        setPropertyData([]);
        setSvgContent(null);
        setEqId('')
        if (props.instanceName === "nz-result-tab-tree") {
          await props.handleSelect('');
        }
      } else if (node.EQID || props.selectedkeys == node.EQID) {
        await GetPropertyValue(node.EQID);
        dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: node })

      }

      if (node.HasRelated === true) {
        setEqId(node.EQID)
        await props.handleSelect(node.EQID);
      }
      return;
    }

    const { expandedKeys: autoExpandedKeys, selectedKeys: autoSelectedKeys, selectedNode, isSelected } = await autoExpandDefaultNodesOfTree([node]);
    newExpandedKeys = Array.from(new Set([...newExpandedKeys, ...autoExpandedKeys]));
    setExpandedKeys(newExpandedKeys);
    if (props.instanceName === "nz-result-tab-tree") {

      dispatch({ type: "RESULT_TAB_EXPANDED_KEY", data: newExpandedKeys })
      dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: node })

    }


    if (autoSelectedKeys.length > 0) {
      setSelectedKeys(autoSelectedKeys);
      setSelectedNode(selectedNode);
      if (props.instanceName === "nz-result-tab-tree") {

        dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: selectedNode })

      }
    }
    if (selectedNode.EQID && isSelected === true) {
      await GetPropertyValue(selectedNode.EQID);

      setSelectedKeys(autoSelectedKeys)
    }
    else if (selectedNode.ShapeID) {
      await callApiForGetDevicePreview(selectedNode.ShapeID);
      setProductNumber(selectedNode.ProductNumber)

    }

  };

  useEffect(() => {
    if (props.selectedNode) {

      if (props.instanceName === "nz-result-tab-tree" && props.selectedNode) {
        let resultnode = props.selectedNode
        if (resultnode && resultnode?.EQID) {
          GetPropertyValue(resultnode.EQID)
        }
      } else if (props.instanceName === "nz-result-tab-tree" && props.selectedNode.ShapeID) {
        let resultnode = props.selectedNode
        if (resultnode && resultnode.ShapeID) {
          callApiForGetDevicePreview(resultnode.ShapeID)
        }
      }
    }

  }, [props.selectedNode])


  const handleSelectMainTree = async (_selectedKeys: any, info: { event: "select"; selected: boolean; node: any; selectedNodes: any[]; nativeEvent: MouseEvent }) => {
    const selectedNode = info.node;
    console.log("selected node info", selectedNode);

    setSelectedKeys([selectedNode.key]);
    if (props.instanceName === "nz-result-tab-tree") {
      dispatch({ type: "RESULT_TAB_SELECTED_KEY", data: [selectedNode.key] })
      dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: selectedNode })

    }

    setSelectedNode(selectedNode);

    // if (selectedNode.key.includes('visio') && selectedNode.visioDownloadUrl) {
    //   selectedNode.onClick();
    //   return;
    // }

    if (selectedNode.ShapeID) {
      await callApiForGetDevicePreview(selectedNode.ShapeID);
      dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: selectedNode })
      setSelectedKeys([selectedNode.key])

    } else if (selectedNode.EQID) {
      setSelectedKeys([selectedNode.key])

      if (props.instanceName === "nz-result-tab-tree") {
        const resultNode = props.selectedNode.EQID
        console.log("resultnode", resultNode)
        await GetPropertyValue(resultNode);

      }

      await GetPropertyValue(selectedNode.EQID);
      dispatch({ type: "RESULT_TAB_SELECTED_NODE", data: selectedNode })

    }
    else if (!selectedNode.EQID && !selectedNode.ShapeID) {
      setPropertyData([]);
      setSvgContent(null);
    }

    if (selectedNode.HasRelated === true) {
      setEqId(selectedNode.EQID)
      if (props.handleSelect) {
        await props.handleSelect(selectedNode.EQID);
      }
    } else {
      if (props.instanceName === "nz-result-tab-tree") {

        await props.handleSelect('');
      }


    }

  };

  const GetPropertyValue = useCallback(async (eqId: string) => {
    setIsLoading(true);
    try {
      await getPropertiesForEqidlist([eqId]).then((resp) => {

        const librarypropertywithskeloton = resp.data.deviceJson
        let parse = JSON.parse(librarypropertywithskeloton)
        let property = parse.find((item: any) => item.TableName === "Hardware")
        let parseProperty = JSON.parse(property.Properties)
        console.log("property", parseProperty)

        setPropertyData(parseProperty);
      })
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  const callApiForGetDevicePreview = async (shapeId: string) => {
    try {
      await getDevicemodelSvg(shapeId).then((resp) => {

        const parsesvg = JSON.parse(resp.data.devicePreviewJson)
        setSvgContent(parsesvg);
        setPropertyData([])

        console.log('Device Preview Response:', resp.data);
      })
    } catch (error) {
      console.error('Error fetching device preview:', error);
    }
  };

  const handleDragStart = async (info: any) => {
    const { node } = info;
    console.log('Drag started on node:', node);

    try {
      await getDevicemodelSvg(node.shapeId).then((resp) => {
        const parsesvg = JSON.parse(resp.data.devicePreviewJson)
        const decodedSvg = window.atob(parsesvg[0].SVG);

        console.log(parsesvg)
         insertSvgContentIntoOffice(decodedSvg, 'drag', shapeCounter)
        setShapeCounter(shapeCounter + 1)
        return resp;
      })
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className="tree">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {expandedKeys && props.treedata &&
        <Tree
          treeData={props.treedata}
          className="custom-rc-tree"
          switcherIcon={switcherIcon}
          onExpand={handleExpandMainTree}
          onSelect={handleSelectMainTree}
          showIcon={true}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          showLine={true}
          onDragStart={handleDragStart} 
        />
      }
      {propertyData && propertyData.length > 0 ? (
        <PropertyTable propertyData={propertyData} stencilResponse={stencilResponse} />
      ) : (
        svgContent && svgContent.length > 0 && <SvgContent svgContent={svgContent} productnumber={productnumber} />
      )}
    </div>
  );
};

export default Treeview;
