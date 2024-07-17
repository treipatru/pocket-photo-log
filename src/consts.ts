import { getConstValue, pb } from './lib/pb';

const siteConsts = await pb.collection('consts').getFullList();

export const SITE_TITLE = getConstValue('SITE_TITLE', siteConsts);
export const SITE_DESCRIPTION = getConstValue('SITE_DESCRIPTION', siteConsts);
