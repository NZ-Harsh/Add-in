import { getFilteredDevices,  getRelatedForFilteredDevice } from "../redux/action/libraryservice";
import { TreeNode } from "../interface";
import { TreeNodeType } from "../interface";
export const getStorageItem = (key: string) => {
    return window.sessionStorage.getItem(key);
}
export const setStorageItem = (key: string, session: any) => {
  window.sessionStorage.setItem(key, session);
}

export const checkIsSuccess = (resp: any) => {
    if (resp &&
        resp.status != 200) {
        return false;
    } else {
        return true;
    }
}

// Library common Functions



export const insertSvgContentIntoOffice = async (
  svgContent: string,
  insertType: string,
  shapeCounter: number
): Promise<void> => {
  try {
    let left = 50 + 20 * shapeCounter;
    let top = 50;

    if (left > 400) {
      const extraY = Math.floor(left / 400);
      left = 50 + 20 * (shapeCounter - 18);
      top = 50 + 20 * extraY;
    }

    const options = {
      coercionType: Office.CoercionType.XmlSvg,
      imageLeft: left,
      imageTop: top,
    };

    await Office.context.document.setSelectedDataAsync(svgContent, {
      ...options,
      asyncContext: { insertType },
    });

    console.log(`SVG inserted via ${insertType} at position (left: ${left}, top: ${top})`);
  } catch (error) {
    console.error(`Error during ${insertType}:`, error);
  }
};


interface SearchParams {
  keyword?: string;
  kwdSearchType?: string;
  related?: boolean;
  Eqid?: string;
  selectedManufacturer?: string;
  setSnackbarMessage?: (message: string) => void;
  setSnackbarOpen?: (open: boolean) => void;
  selectedEqType?: string;
  selectedProductLine?: string;
  selectedProductNumber?: string;
  selectedDtManufacturers?: string[];
  selectedManufacturerDetails?:string[]
}

type OnSuccess = (resultData: any[]) => void;
type OnError = (message: string) => void;

/**
  @param searchParams - Parameters for the search function
  @param onSuccess - Callback function for successful API call
  @param onError - Callback function for error in API call
 */
export const Search = async (
  searchParams: SearchParams,
  onSuccess: OnSuccess,
  onError: OnError
): Promise<void> => {
  const {
    keyword,
    Eqid,
    selectedEqType,
    selectedProductNumber,
    selectedManufacturerDetails,
  } = searchParams;


  if(!Eqid){
  try {
    getFilteredDevices(keyword,true,0,'',0,selectedManufacturerDetails,selectedEqType,'','',selectedProductNumber,'').then((resp) =>{
        const searchData = resp.data.deviceJson    
        const parse = JSON.parse(searchData)
        console.log("treedata", parse)

        if (searchData.length > 0 ) {
          onSuccess(searchData);
          
        } else {
          console.log('No relevant data found');
          onError('No results found');
    
        }
    })
   


  } catch (error: any) {
    console.error('Related not shown:', error.message);
    onError('An error occurred while fetching data');
  }
} else if(Eqid){
  try {
    getRelatedForFilteredDevice(0,'',Eqid).then((resp) =>{
        const relatedData = resp.data.deviceJson
        if(relatedData.length >0){
          onSuccess(relatedData)
        }else{
          console.log("related treedata not found")
        onError("No results found for related treedata")  
        }
    })
   
    
  } catch (error) {
 
  }
  
}
};

/**
 * Transforms search results into a tree data structure.
 * @param result - The search results to transform.
 * @returns The transformed tree data.
 */



  
export const transformToRcTreeData = (data: any): TreeNode[] => {
  const treeData: TreeNode[] = [];
  
  let parseddata = JSON.parse(data);
  // Add the root node titled "Search Result"
  const rootNode: TreeNode = {
    title: "Search Result",
    key: "root",
    icon: (
      <img
        src="./assets/Icons/main_node.png"
        alt="Search Results Icon"
        style={{ width: 16, height: 16 }}
      />
    ),
    children: treeData
  };

  if (parseddata?.Manufacturer) {
    for (let manufacturer of parseddata.Manufacturer) {
      let manufacturerNode: TreeNode = {
        title: manufacturer.Name,
        key: `manufacturer-${manufacturer.Name}`,
        icon: (
          <img
            src="./assets/Icons/manufacturer.png"
            alt="manufacturer"
            style={{ width: 16, height: 16 }}
          />
        ),
        children: []
      };

      if (manufacturer.EQType) {
        for (let eqType of manufacturer.EQType) {
          let eqTypeNode: TreeNode = {
            title: eqType.Name,
            key: `eqType-${eqType.Name}`,
            icon: (
              <img
                src={`./assets/EqType/${eqType.Name}.png`}
                alt="EQTYPE"
                style={{ width: 16, height: 16 }}
              />
            ),
            children: []
          };

          if (eqType.ProductNumber) {
            for (let product of eqType.ProductNumber) {
              let productNode: TreeNode = {
                title: product.Name,
                key: `${product.EQID}`,
                EQID: product.EQID,
                Description: product.Description,
                HasNetworkport: product.HasNetworkPorts,
                HasPowerPorts: product.HasPowerPorts,
                HasRelated: product.HasRelated,
                icon: (
                  <img
                    src="./assets/Icons/product_no.gif"
                    style={{ width: 16, height: 16 }}
                    alt="Product Number"
                  />
                ),
                children: []
              };

              if (product.Views) {
                for (let view of product.Views) {
                  let viewNode: TreeNode = {
                    title: view.Name,
                    key: `${view.ShapeID}`,
                    isLeaf: true,
                    ShapeID: view.ShapeID,
                    ProductNumber: product.Name,
                    icon: view.Name.toLowerCase().includes('front') ? (
                      <img src="./assets/Icons/Front.png" alt="Front icon" />
                    ) : view.Name.toLowerCase().includes('rear') ? (
                      <img src="./assets/Icons/Rear.png" alt="Rear icon" /> 
                    ) : view.Name.toLowerCase().includes('top') ? (
                      <img src="./assets/Icons/TopView.png" alt="Top Icon" />
                    ) : null,
                  };
                  productNode.children?.push(viewNode);
                }
              }

              eqTypeNode.children?.push(productNode);
            }
          }

          manufacturerNode.children?.push(eqTypeNode);
        }
      }

      treeData.push(manufacturerNode);
    }
  } 

  return [rootNode];

};



export const autoExpandDefaultNodesOfTree = async (treeData: TreeNodeType[]) => {
  let expKeys: any[] = [];
  let selKeys: any[] = [];
  let selNodes: any
  let isSelected = false;

  const expandAuto = async (nodes: TreeNodeType[]) => {
    for (let index = 0; index < nodes.length; index++) {
      const element = nodes[index];
      expKeys.push(element.key);

      if (element.children && element.children.length === 1) {
        isSelected = false
        await expandAuto(element.children);
      } else if (element.children && element.children.length > 1) {
        expKeys.push(element.key);
        selKeys.push(element.children[0].key);
        selNodes = element.children[0];
        isSelected = true;
        break;
      } else {
        selKeys.push(element.key);
        selNodes = element;
        break;
      }
    }
  };

  await expandAuto(treeData);
  return { expandedKeys: expKeys, selectedKeys: selKeys, selectedNode: selNodes, isSelected };
};

export const getSessionVariableFromStorage = (VariableContext: string = "", VariableName: string = "") => {
  
  let session_var_string = getStorageItem("session_variables");

  if (session_var_string && session_var_string.length > 0) {
      let session_var = JSON.parse(session_var_string);
      if (session_var && session_var.length > 0) {
          return session_var.filter((ele: any) => { return ele.VariableContext == (VariableContext && VariableContext != "" ? VariableContext : ele.VariableContext) && ele.VariableName == (VariableName && VariableName != "" ? VariableName : ele.VariableName) });
      }
      else {
          return null;
      }
  }
  else {
      return null;
  }
};


export type DataItem = {
  Name: string;
  Value: any;
};

export const getValuesByName = (data: DataItem[], name: string): any[] => 
  data.filter(item => item.Name === name).map(item => item.Value);

