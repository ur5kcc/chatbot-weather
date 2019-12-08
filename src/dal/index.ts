import * as get from './find';
import * as update from './update';
import * as create from './create';

export const dal = {...get, ...update, ...create};
