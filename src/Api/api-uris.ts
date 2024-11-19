import config from "../config/config";
const apiUris: any = {};

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? config.BASE_URL
    : config.BASE_URL_PROD;
    
const SESSION_API_URL = `${baseUrl}${config.Session_API_URL}`;
const MISC = `${baseUrl}${config.misc}`
const Explorer_TJAPI = `${baseUrl}${config.Explorer}`
const NODE = `${baseUrl}${config.NODE}`
const DEVICE = `${baseUrl}${config.device}`
const LIB = `${baseUrl}${config.LIB}`




const Session: object = {
CreateSession: `${SESSION_API_URL}/create_session`,
UpdateSession: `${SESSION_API_URL}/update_session`,
IsSessionOpen: `${SESSION_API_URL}/is_session_open`,

}
const MiscApi: object = {
GetRefList: `${MISC}/get_ref_list`,

};
const ExplorerApi: object = {

  //search API
  SiteHierarchy: `${Explorer_TJAPI}/site_hierarchy`,
  FloorDevicesConfigurationHierarchy: `${Explorer_TJAPI}/floor_devices_configuration_hierarchy`,
  MountedDeviceConfigurationHierarchy: `${Explorer_TJAPI}/mounted_device_configuration_hierarchy`
};
const NODEApi: object = {
  GetKebabMenuData: `${NODE}/get_kebab_menu_data`,
};

const DevicePreviewApi:object= {
  GetSvgData: `${DEVICE}/get_svgdata`,

}
  
const LibApi: object = {
  GetFilteredDevicesByMfgeqtype: `${LIB}/get_filtered_devices_by_mfgeqtype`,
  GetPropertiesForEqidlist: `${LIB}/get_properties_for_eqidlist`,
  GetDevicemodelViews: `${LIB}/get_devicemodel_views`,
  GetDevicemodelSvg: `${LIB}/get_devicemodel_svg`,
  GetMfg: `${LIB}/get_mfg`,
  GetEqtype: `${LIB}/get_eqtype`,
  GetProductno: `${LIB}/get_prodno`,
  GetFilteredDevices: `${LIB}/get_filtered_devices`,
  GetRelatedForFilteredDevice: `${LIB}/get_related_for_filtered_device`,
};
    
apiUris.Session = Session
apiUris.MiscApi = MiscApi
apiUris.ExplorerApi = ExplorerApi
apiUris.LibApi = LibApi

export default apiUris