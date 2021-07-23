// @index('./*', f => `export { default as ${f.name.split('.')[0]}Styles } from '${f.path}${f.ext}'`)
export { default as appStyles } from "./app.module.css";
export { default as dataMapStyles } from "./dataMap.module.css";
export { default as minimapStyles } from "./minimap.module.css";
export { default as resizableStyles } from "./resizable.module.css";
export { default as selectOptionsStyles } from "./selectOptions.module.css";
export { default as sidebarStyles } from "./sidebar.module.css";
