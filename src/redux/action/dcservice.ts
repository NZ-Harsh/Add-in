import apiUris from "../../Api/api-uris";
import fetchInterceptor from "./apiInterceptor";


export const getRefList = (groupNameCollection: any) => {
    return fetchInterceptor(apiUris.MiscApi.GetRefList, {
        groupNameCollection: groupNameCollection
    });
}