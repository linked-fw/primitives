import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';

const dataFile = '../data/primitives.json';
const base = 'http://lincd.org/ont/radix/';

Prefix.add('radix', base);

export const loadData = () => {
  //@ts-ignore
  return import('../data/primitives.json', {
    with: { type: 'json' },
  }).then((data) => data.default);
};

export const ns = createNameSpace(base);
export const _self = ns('');

export const radix = {
  _self,
};

