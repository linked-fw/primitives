---
'@_linked/primitives': major
---

The package's ontology is declared in `package.json` `linkedOntologies` (`primitives`, namespace `https://linked.cm/ont/primitives/`) with its data in `data/primitives.ttl`, which carries the suggested prefix as `vann:preferredNamespacePrefix`. A generated `ontologies/index` registers it with `registerOntologies`; the package no longer registers the `primitives` prefix (an app adds it to its own prefix map). Removed: `ontologies/primitives.register`, and the `ns`, `_self`, `primitives` and deprecated `radix` exports of `ontologies/primitives` (the ontology defines no terms); `linkedOntology` on the package object, replaced by `registerOntologies`.
