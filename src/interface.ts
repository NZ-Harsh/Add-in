export interface TreeNode {
    title: string;
    key: string;
    children?: TreeNode[];
    isLeaf?: boolean;
    EQID?:string,
    Description?:string,
    HasNetworkport?:boolean,
    HasPowerPorts?:boolean
    HasRelated?:boolean
    ShapeID?:number
    icon?:any,
    ProductNumber?:any
  
  }

  export interface TreeNodeType {
    title: string;
    key: string;
    children?: TreeNodeType[];
    isLeaf?: boolean;
    EQID?:string,
    Description?:string,
    HasNetworkport?:boolean,
    HasPowerPorts?:boolean
    HasRelated?:boolean
    ShapeID?:number
    icon?:any,
  }

  export interface TreeNodeType {
    title: string;
    key: string;
    children?: TreeNodeType[];
    isLeaf?: boolean;
    EQID?:string,
    Description?:string,
    HasNetworkport?:boolean,
    HasPowerPorts?:boolean
    HasRelated?:boolean
    ShapeID?:number
    icon?:any,
  }

  export interface PropertyItem {
    pName: string;
    pValue: string | number;
    pType: string | number;
    newValue: string;
  }