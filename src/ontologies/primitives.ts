import { Prefix } from '@_linked/core/utils/Prefix';
import { createNameSpace } from '@_linked/core/utils/NameSpace';


/**
 * First-party ontologies live on linked.cm: `https://linked.cm/ont/{ontologySlug}/`, and a
 * package's own ontology takes the package's publicSlug (`@_linked/primitives` → `primitives`).
 *
 * Until this release it was `http://lincd.org/ont/radix/` under the prefix `radix`, a leftover of
 * the package's old name. The ontology defines no terms, so nothing was ever stored under it.
 */
const base = 'https://linked.cm/ont/primitives/';

Prefix.add('primitives', base);

export const ns = createNameSpace(base);
export const _self = ns('');

export const primitives = {
  _self,
};

/** @deprecated Use `primitives`. Kept so existing imports keep working. */
export const radix = primitives;
