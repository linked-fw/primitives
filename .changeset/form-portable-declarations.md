---
'@_linked/primitives': patch
---

`Form` and its parts (`Root`, `Field`, `Label`, `Control`, `Message`, `ValidityState`, `Submit`) now have explicit types. The emitted declarations name `typeof FormPrimitive.X` from `@radix-ui/react-form` rather than inferred types inside its nested dependencies. Before this, building the package inside an app whose install could not hoist react-form's exact radix dependencies failed with TS2742. The public types are unchanged.
