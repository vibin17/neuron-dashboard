(window["webpackJsonp_eKuiper"]=window["webpackJsonp_eKuiper"]||[]).push([["chunk-5409bf4e"],{"3d58":function(e,t,a){"use strict";function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}a.d(t,"b",(function(){return n}));var n=function(e){var t="WITH (",a=Object.keys(e);return a.forEach((function(a){e[a]&&(t+="".concat(a,'="').concat(e[a],'", '))})),t+=");",t};t["a"]=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var o=function e(t,a){var n="",o=Object.keys(t);o.forEach((function(a,s){if("object"===r(t[a])){var i=e(t[a],!0);n+="".concat(a," ").concat(i)}else n+="".concat(a," ").concat(t[a]);s+1!==o.length&&(n+=", ")}));var s="(\n      ".concat(n,"\n    )");return a?"struct".concat(s):s},s="";return e.forEach((function(e,t){var n=a[t];"object"===r(n)&&(n=o(n)),e&&n&&(s+="".concat(e).concat(n))})),s+=e[e.length-1],s}},"563e":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fields-table"},[e.disabled?e._e():a("Button",{staticClass:"top-create--btn action-add-btn",attrs:{icon:"md-add",type:"primary",ghost:"",disabled:e.onlyOneField},on:{click:e.showModal}},[e._v(" "+e._s(e.$t("common.add"))+" ")]),a("Table",{attrs:{"row-key":"id",columns:e.structCol,data:e.data},scopedSlots:e._u([{key:"action",fn:function(t){var r=t.row,n=t.index;return""===r.name||e.disabled?void 0:["struct"===r.type?a("Button",{staticStyle:{"margin-right":"8px"},attrs:{shape:"circle",type:"primary",size:"small",ghost:""},on:{click:function(t){return e.showModal(r)}}},[e._v(" "+e._s(e.$t("common.add"))+" ")]):e._e(),a("Button",{attrs:{shape:"circle",type:"error",size:"small",ghost:""},on:{click:function(t){return e.removeField(r,n)}}},[e._v(" "+e._s(e.$t("common.delete"))+" ")])]}}],null,!0)}),a("Modal",{attrs:{"class-name":"action-modal--view view-form",title:e.$t("streams.addField"),width:650,"mask-closable":!1},on:{"on-visible-change":e.handleVisibleChange},model:{value:e.viewModalVisible,callback:function(t){e.viewModalVisible=t},expression:"viewModalVisible"}},[e.viewModalVisible?a("Form",{ref:"fieldForm",attrs:{model:e.fieldForm,rules:e.fieldRule}},[a("Row",{attrs:{gutter:20}},[a("i-col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:e.$t("common.name"),prop:"name"}},[a("i-input",{attrs:{size:"large"},model:{value:e.fieldForm.name,callback:function(t){e.$set(e.fieldForm,"name",t)},expression:"fieldForm.name"}})],1)],1),a("i-col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:e.$t("common.type"),prop:"type"}},[a("Select",{attrs:{size:"large"},model:{value:e.fieldForm.type,callback:function(t){e.$set(e.fieldForm,"type",t)},expression:"fieldForm.type"}},e._l(e.typeList,(function(t,r){return a("Option",{key:r,attrs:{value:t}},[e._v(" "+e._s(t)+" ")])})),1)],1)],1),"array"===e.fieldForm.type?a("i-col",{attrs:{span:"12"}},[a("FormItem",{attrs:{label:e.$t("streams.arrayType"),prop:"arrayType"}},[a("Select",{attrs:{size:"large"},model:{value:e.fieldForm.arrayType,callback:function(t){e.$set(e.fieldForm,"arrayType",t)},expression:"fieldForm.arrayType"}},e._l(e.arrayTypeList,(function(t,r){return a("Option",{key:r,attrs:{value:t}},[e._v(" "+e._s(t)+" ")])})),1)],1)],1):e._e()],1)],1):e._e(),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"text"},on:{click:function(t){e.viewModalVisible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),a("Button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(e._s(e.$t("common.submit")))])],1)],1)],1)},n=[],o=function(){return Math.random().toString(16).substr(2,8)},s=o,i={name:"FieldsTable",model:{prop:"value",event:"update"},props:{value:{required:!0},isDetail:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},streamFormat:{type:String,default:""}},data:function(){return{viewModalVisible:!1,onlyOneField:!1,fieldForm:{},fieldRule:{name:[{required:!0,message:this.$t("common.fillContent")}],type:[{required:!0,message:this.$t("common.fillContent")}],arrayType:[{required:!0,message:this.$t("common.fillContent")}]},structCol:[{title:this.$t("common.name"),key:"name",tree:!0},{title:this.$t("common.type"),key:"type"},{title:this.$t("common.operations"),slot:"action",width:250}],parentID:"",data:[],typeList:["bigint","float","string","datetime","boolean","array","struct","bytea"],arrayTypeList:["bigint","float","string","datetime","boolean","struct","bytea"]}},watch:{data:{deep:!0,handler:function(e){this.onlyOneField="binary"===this.streamFormat&&1===e.length}},value:{deep:!0,handler:function(e){if(e){var t=0===Object.keys(e).length;t||this.parseToTableData(e)}}},streamFormat:function(e){this.onlyOneField="binary"===e&&1===this.data.length}},methods:{showModal:function(e){e&&(this.parentID=e.id),this.viewModalVisible=!0},handleVisibleChange:function(e){e?this.fieldForm={}:this.parentID=""},parseFormData:function(e){var t=e.name,a=e.type,r=e.arrayType,n={id:s(),name:t,type:a};return"array"===a?n.type="array(".concat(r,")"):"struct"===a&&(n.children=[],n._showChildren=!0),n},findDataAction:function(e,t,a){var r=function t(r){for(var n=0;n<r.length;n+=1){var o=r[n];if(o.id===e){a(o,r,n);break}o.children&&t(o.children)}};r(t)},insertChildData:function(e,t,a){this.findDataAction(e,t,(function(e){e.children.push(a)}))},removeField:function(e){this.findDataAction(e.id,this.data,(function(e,t,a){t.splice(a,1)})),this.parseToModelValue(this.data)},save:function(){var e=this;this.$refs.fieldForm.validate((function(t){if(t){var a=e.parseFormData(e.fieldForm);e.parentID?e.insertChildData(e.parentID,e.data,a):e.data.push(a),e.parseToModelValue(e.data),e.viewModalVisible=!1}}))},parseToModelValue:function(){var e=function e(t){var a={};return t.forEach((function(t){t.children?a[t.name]=e(t.children):a[t.name]=t.type})),a},t=e(this.data);this.$emit("update",t)},parseToTableData:function(e){this.data=this.deconstructData(e)},deconstructData:function(e){var t=this;return Object.keys(e).map((function(a){var r=e[a];if("string"!==typeof r){var n=t.deconstructData(r);return{id:s(),_showChildren:!0,name:a,type:"struct",children:n}}return{id:s(),name:a,type:r}}))}}},c=i,l=a("2877"),u=Object(l["a"])(c,r,n,!1,null,null,null);t["a"]=u.exports},"71cc":function(e,t,a){"use strict";a.d(t,"h",(function(){return o})),a.d(t,"j",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"d",(function(){return c})),a.d(t,"i",(function(){return l})),a.d(t,"e",(function(){return u})),a.d(t,"f",(function(){return m})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return f})),a.d(t,"g",(function(){return p}));var r=a("751a"),n=a("510b"),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r["a"].get(Object(n["b"])(e,"/streams"),{params:t})},s=function(e,t){return r["a"].get(Object(n["b"])(e,"/streams/".concat(t)))},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r["a"].post(Object(n["b"])(e,"/streams"),t)},c=function(e,t){return r["a"].delete(Object(n["b"])(e,"/streams/".concat(t)))},l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r["a"].put(Object(n["b"])(e,"/streams/".concat(t)),a)},u=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=Object(n["b"])(e,"/metadata/sources");return t&&(o="".concat(o,"/").concat(t)),r["a"].get(o,{params:a})},m=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=Object(n["b"])(e,"/metadata/sources/yaml");return t&&(o="".concat(o,"/").concat(t)),r["a"].get(o,{params:a})},d=function(e,t,a){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,i=Object(n["b"])(e,"/metadata/sources/".concat(t,"/confKeys"));return a&&(i="".concat(i,"/").concat(a)),s&&(i="".concat(i,"/").concat(s)),r["a"].put(i,o)},f=function(e,t,a){return r["a"].delete(Object(n["b"])(e,"/metadata/sources/".concat(t,"/confKeys/").concat(a)))},p=function(e,t){return r["a"].get(Object(n["b"])(e,"/metadata/sources/yaml/".concat(t)))}},"79a9":function(e,t,a){"use strict";a.r(t);var r,n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-details"},[a("div",{staticClass:"page-header"},[a("Breadcrumb",[a("BreadcrumbItem",{attrs:{to:e.sourceRoute}},[e._v(e._s(this.$t("streams.source")))]),a("BreadcrumbItem",[e._v(e._s(e.accessTitle))])],1),"create"===e.accessType?a("div",{staticClass:"mode-swtich"},[a("label",{attrs:{for:""}},[e._v(e._s(e.isTextMode?e.$t("rules.textMode"):e.$t("rules.visualizationMode")))]),a("i-switch",{on:{change:e.handleClearValidate},model:{value:e.isTextMode,callback:function(t){e.isTextMode=t},expression:"isTextMode"}})],1):e._e()],1),a("Card",{staticClass:"detail",attrs:{shadow:""}},[e.isView?a("div",{staticClass:"view-form"},[e.viewLoading?a("Spin",{attrs:{fix:""}}):e._e(),a("Row",[a("i-col",{attrs:{span:"16"}},[a("div",{staticClass:"view-item"},[a("label",{staticClass:"view-item--label"},[e._v(e._s(e.$t("tables.tableName"))+": ")]),a("span",[e._v(e._s(e.viewForm.name))])]),a("div",{staticClass:"view-item"},[a("label",{staticClass:"view-item--label"},[e._v(e._s(e.$t("tables.tableFields"))+": ")]),a("FieldsTable",{staticClass:"view-item--table",attrs:{isDetail:"view"===e.accessType,disabled:""},model:{value:e.viewForm.tableFields,callback:function(t){e.$set(e.viewForm,"tableFields",t)},expression:"viewForm.tableFields"}})],1),e.viewForm.options?e._l(Object.keys(e.viewForm.options),(function(t,r){return a("div",{key:r,staticClass:"view-item"},[a("label",{staticClass:"view-item--label"},[e._v(e._s(t)+": ")]),a("span",[e._v(e._s(e.viewForm.options[t]))])])})):e._e()],2)],1)],1):a("Form",{ref:"record",attrs:{model:e.createForm,rules:e.rules}},[a("Row",[e.isTextMode?a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:"SQL",prop:"sql"}},[a("div",{staticClass:"monaco-container sql"},[a("Monaco",{ref:"sqlData",attrs:{id:"sql-data",lang:"sql",backgroud:"#282a36",provider:e.dataTypeProvider},model:{value:e.createForm.sql,callback:function(t){e.$set(e.createForm,"sql",t)},expression:"createForm.sql"}})],1)])],1):[a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.tableName"),prop:"name"}},[a("i-input",{attrs:{size:"large",disabled:"edit"===e.accessType},model:{value:e.createForm.name,callback:function(t){e.$set(e.createForm,"name",t)},expression:"createForm.name"}})],1)],1),a("i-col",{attrs:{span:"16"}},[a("i-checkbox",{model:{value:e.isSchemaTable,callback:function(t){e.isSchemaTable=t},expression:"isSchemaTable"}},[e._v(e._s(e.$t("tables.isSchemaType")))])],1),e.isSchemaTable?a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.tableFields"),prop:"tableFields"}},[a("Tooltip",{staticClass:"fields-table--tip",attrs:{"max-width":350,transfer:"",content:e.$t("tables.schemaTip"),placement:"right"}},[a("Icon",{attrs:{type:"md-help-circle"}})],1),a("FieldsTable",{attrs:{isDetail:"edit"===e.accessType,tableFormat:e.createForm.format},model:{value:e.createForm.tableFields,callback:function(t){e.$set(e.createForm,"tableFields",t)},expression:"createForm.tableFields"}})],1)],1):e._e(),a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.dataSource"),prop:"dataSource"}},[a("i-input",{attrs:{size:"large"},model:{value:e.createForm.dataSource,callback:function(t){e.$set(e.createForm,"dataSource",t)},expression:"createForm.dataSource"}})],1)],1),a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.tableType"),prop:"tableType"}},[e.sourceInfo.helpUrl?a("a",{attrs:{href:e.sourceInfo.helpUrl[e.lang],target:"_blank",rel:"noopener"}},[a("Icon",{attrs:{type:"md-document"}}),e._v(" "+e._s(e.$t("common.documentation"))+" ")],1):e._e(),e.isView?e._e():a("Button",{staticClass:"top-create--btn action-add-btn",attrs:{icon:"ios-create-outline",type:"primary",ghost:""},on:{click:e.handleConfigSources}},[e._v(" "+e._s(e.$t("tables.sourceConfig"))+" ")]),a("Select",{staticClass:"custom-select",attrs:{size:"large"},on:{"on-change":e.handleSourceChange,"on-select":e.handleSourceSelected},model:{value:e.createForm.tableType,callback:function(t){e.$set(e.createForm,"tableType",t)},expression:"createForm.tableType"}},e._l(e.sourcesList,(function(t){return a("Option",{key:t.name,attrs:{value:t.name,label:t.name,disabled:!t.about.installed}},[a("div",{staticClass:"title"},[e._v(e._s(t.name))]),t.about.installed?e._e():a("Tooltip",{staticClass:"tag",attrs:{content:e.$t("plugins.installTip"),placement:"top","max-width":"200px",transfer:""}},[a("Button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.routeToInstallPage(t.name)}}},[e._v(" "+e._s(e.$t("common.install"))+" ")])],1),a("div",{staticClass:"info"},[e._v(e._s(t.about.author.name)+", "+e._s(t.about.author.email))]),a("p",{staticClass:"description"},[e._v(" "+e._s(t.about.description[e.lang])+" ")])],1)})),1)],1)],1),a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.confKey"),prop:"confKey"}},[a("Select",{attrs:{size:"large"},on:{"on-open-change":e.handleConfKeyOpen},model:{value:e.createForm.confKey,callback:function(t){e.$set(e.createForm,"confKey",t)},expression:"createForm.confKey"}},e._l(e.confKeyList,(function(e){return a("Option",{key:e,attrs:{value:e,label:e}})})),1)],1)],1),a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.format"),prop:"format"}},[a("Select",{attrs:{size:"large"},model:{value:e.createForm.format,callback:function(t){e.$set(e.createForm,"format",t)},expression:"createForm.format"}},e._l(e.formatList,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t)+" ")])})),1)],1)],1),a("i-col",{attrs:{span:"16"}},[a("FormItem",{attrs:{label:e.$t("tables.retainSize"),prop:"retainSize"}},[a("InputNumber",{attrs:{size:"large"},model:{value:e.createForm.retainSize,callback:function(t){e.$set(e.createForm,"retainSize",t)},expression:"createForm.retainSize"}})],1)],1)],a("i-col",{staticClass:"oper-col",attrs:{span:"16"}},[a("FormItem",[e.isView?e._e():a("Button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(e._s(e.$t("common.submit")))]),a("Button",{style:e.isView?"":"margin-left: 8px",attrs:{type:"text",to:e.sourceRoute}},[e._v(" "+e._s(e.$t("common.cancel"))+" ")])],1)],1)],2)],1)],1)],1)},o=[],s=a("724c"),i=a("9146"),c=a("ad8f"),l=a("71cc"),u=a("563e"),m=a("94dc"),d=a("ceb0"),f=a("3d58");function p(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function b(e){return F(e)||y(e)||v(e)||h()}function h(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function v(e,t){if(e){if("string"===typeof e)return g(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?g(e,t):void 0}}function y(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function F(e){if(Array.isArray(e))return g(e)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var T={name:"TableDetails",components:{Monaco:i["a"],FieldsTable:u["a"]},mixins:[s["a"]],data:function(){var e=this,t=function(t,a,r){return a?/\s/.test(a)?r(new Error(e.$t("tables.tableNameSpace"))):(r(),!0):r(new Error(e.$t("common.fillContent")))};return{accessType:this.$route.query.oper,isTextMode:!1,isSchemaTable:!0,viewLoading:!1,viewForm:{},formatList:["json","binary"],confKeyList:[],sourcesList:[],sourceInfo:{},createForm:{sql:"",retainSize:null},rules:{name:[{required:!0,message:this.$t("common.fillContent")},{validator:t,trigger:"blur"}],sql:[{required:!0,message:this.$t("common.fillContent")}],tableFields:[{required:!0,message:this.$t("common.fillContent")}]}}},computed:{lang:function(){return this.$store.state.lang},isView:function(){var e=this.$route.query.oper;return"view"===e},accessTitle:function(){var e=this.$route.query.oper,t={view:this.$t("common.view"),create:this.$t("common.create"),edit:this.$t("common.edit")};return t[e]},dataTypeProvider:function(){return[].concat(b(d["a"].sqlKeyWords),b(m["a"]))},sourceRoute:function(){return{name:"source",params:{id:this.nodeID,name:"1"}}}},beforeRouteEnter:function(e,t,a){a((function(e){var a="sources"===t.name,r=sessionStorage.getItem("tableForm"),n=sessionStorage.getItem("isSchemaTable");a&&r&&n?(e.createForm=JSON.parse(r),e.isSchemaTable="true"===n,e.handleSourceChange(e.createForm.tableType)):"create"!==e.accessType&&e.loadDetail(),setTimeout((function(){sessionStorage.removeItem("tableForm"),sessionStorage.removeItem("isSchemaTable")}),2e3)}))},created:function(){this.loadSources()},methods:{handleConfigSources:function(){sessionStorage.setItem("tableForm",JSON.stringify(this.createForm)),sessionStorage.setItem("isSchemaTable",this.isSchemaTable),this.$router.push({name:"Sources",params:{id:this.nodeID},query:{oper:this.accessType}})},handleConfKeyOpen:function(e){!this.createForm.tableType&&e&&this.$Message.warning(this.$t("tables.typeFirst"))},handleSourceChange:function(e){var t=this;e&&Object(l["f"])(this.nodeID,e).then((function(e){t.confKeyList=Object.keys(e.data)}))},handleSourceSelected:function(e){var t=this.sourcesList.find((function(t){return t.name===e.value}));this.sourceInfo=t?t.about:{}},loadSources:function(){var e=this;Object(l["e"])(this.nodeID).then((function(t){e.sourcesList=t.data}))},parseStremFields:function(e){var t=e.TableFields,a=function e(t){var a={};return t.forEach((function(t){"string"===typeof t.FieldType?a[t.Name]=t.FieldType:"struct"===t.FieldType.Type?a[t.Name]=e(t.FieldType.Fields):"array"===t.FieldType.Type&&(a[t.Name]="".concat(t.FieldType.Type,"(").concat(t.FieldType.ElementType,")"))})),a};return a(t)},loadDetail:function(){var e=this,t=this.$route.params.tableName;this.viewModalVisible=!0,this.viewLoading=!0,Object(c["e"])(this.nodeID,t).then((function(t){var a=t.data;if("view"===e.accessType){var r={};a.TableFields&&(r=e.parseStremFields(a)),e.viewForm={name:a.Name,options:a.Options,tableFields:r}}else{var n=a.Name,o=a.Options,s=a.TableFields,i=o.DATASOURCE,c=o.CONF_KEY,l=o.FORMAT,u=o.TYPE,m=o.RETAIN_SIZE;e.handleSourceChange(u),e.createForm={name:n,dataSource:i,confKey:c,format:l,tableType:u,retainSize:m},s?e.createForm.tableFields=e.parseStremFields(a):e.isSchemaTable=!1}e.viewLoading=!1})).catch((function(){e.viewLoading=!1}))},save:function(){var e=this;this.$refs.record.validate((function(t){if(t){var a={sql:""};if(e.isTextMode)a.sql=e.createForm.sql;else{var n=e.createForm,o=n.name,s=n.tableFields,i=n.confKey,l=n.format,u=n.dataSource,m=n.tableType,d=n.retainSize,b="CREATE TABLE ".concat(o),h=s||"()",v=Object(f["b"])({DATASOURCE:u,FORMAT:l,CONF_KEY:i,TYPE:m,RETAIN_SIZE:d});a.sql=Object(f["a"])(r||(r=p(["\n              ","\n              ","\n              ","\n          "])),b,h,v)}"create"===e.accessType?Object(c["a"])(e.nodeID,a).then((function(t){201===t.status&&"Created"===t.statusText?e.$Message.success(t.data):e.$Message.success(e.$t("common.addSuccess")),e.$router.push({name:"source",params:{id:e.nodeID,name:1}})})).catch((function(){})):Object(c["d"])(e.nodeID,e.createForm.name,a).then((function(){e.$Message.success(e.$t("common.editSuccess")),e.$router.push({name:"source",params:{id:e.nodeID,name:1}})})).catch((function(){}))}}))},handleClearValidate:function(){var e=this;setTimeout((function(){e.$refs.record.resetFields()}),1e3)},routeToInstallPage:function(e){this.$router.push({name:"plugins",params:{id:this.nodeID},query:{fromPage:"table"}});var t={fromType:"sources",pluginName:e};sessionStorage.setItem("installInfo",JSON.stringify(t))}}},_=T,S=(a("aabf"),a("2877")),$=Object(S["a"])(_,n,o,!1,null,null,null);t["default"]=$.exports},aabf:function(e,t,a){"use strict";a("caa10")},ad8f:function(e,t,a){"use strict";a.d(t,"c",(function(){return o})),a.d(t,"e",(function(){return s})),a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return c})),a.d(t,"d",(function(){return l}));var r=a("751a"),n=a("510b"),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r["a"].get(Object(n["b"])(e,"/tables"),{params:t})},s=function(e,t){return r["a"].get(Object(n["b"])(e,"/tables/".concat(t)))},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r["a"].post(Object(n["b"])(e,"/tables"),t)},c=function(e,t){return r["a"].delete(Object(n["b"])(e,"/tables/".concat(t)))},l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r["a"].put(Object(n["b"])(e,"/tables/".concat(t)),a)}},caa10:function(e,t,a){}}]);