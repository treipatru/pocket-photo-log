import { apiClient } from "@/lib/api/api-client";
import { getConstValue } from "@/lib/api/get-const-value";

const siteConsts = await apiClient.collection("settings").getFullList();

export const SITE_TITLE = getConstValue("SITE_TITLE", siteConsts);
export const SITE_DESCRIPTION = getConstValue("SITE_DESCRIPTION", siteConsts);
