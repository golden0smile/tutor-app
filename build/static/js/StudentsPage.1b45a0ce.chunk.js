"use strict";(self.webpackChunksea_tutor_react=self.webpackChunksea_tutor_react||[]).push([[297],{4255:function(e,t,n){var i=n(29439),s=n(47313),o=s.useState,l=s.useEffect;t.Z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=o(e),s=(0,i.Z)(n,2),r=s[0],u=s[1];return l((function(){var n=setTimeout((function(){u(e)}),t);return function(){clearTimeout(n)}}),[e,t]),r}},44766:function(e,t,n){n.r(t);var i=n(74165),s=n(93433),o=n(15861),l=n(29439),r=n(4809),u=n(93721),a=n(25327),d=n(37217),c=n(68366),v=n(47313),f=n(85554),_=n(4255),h=n(97738),p=n(773),k=n(79178),S=n(58467),m=n(40713),F=n(46417);t.default=function(){var e,t,n,y=(0,v.useState)(),Z=(0,l.Z)(y,2),g=Z[0],x=Z[1],b=(0,v.useState)([]),L=(0,l.Z)(b,2),j=L[0],P=(L[1],(0,v.useState)([])),O=(0,l.Z)(P,2),E=O[0],w=O[1],C=(0,_.Z)(null===g||void 0===g?void 0:g.trim()),M=(0,v.useState)(!1),D=(0,l.Z)(M,2),N=D[0],T=D[1],V=(0,v.useState)(!1),A=(0,l.Z)(V,2),z=A[0],B=A[1],I=(0,f.I0)(),U=(0,S.s0)(),Y=(0,f.v9)((function(e){return e.student})),G=Y.page,H=Y.sizePerPage,R=Y.sortField,J=Y.sortOrder,X=Y.schoolFilterR,q=Y.unPlannedLesson,K=Y.levelFilterR,Q=Y.StudentsDetails,W=Y.isLoading,$=(0,f.v9)((function(e){return e.session.studentDetails})),ee=$.pastSession,te=$.pastSession_sortOrder,ne=$.pastSession_sortField,ie=$.pastSessionLoading,se=(0,v.useMemo)((function(){return{level:K,school:X}}),[K,X]),oe=(0,v.useMemo)((function(){return[K,X,q].some((function(e){return!!e}))}),[K,X,q]),le=(0,v.useState)(""),re=(0,l.Z)(le,2),ue=re[0],ae=re[1],de=[{dataField:"pk_student_id",text:"Student ID",sort:!0},{dataField:"sname",text:"Student Name",sort:!0,formatter:function(e,t){return(0,F.jsx)("div",{children:(null===t||void 0===t?void 0:t.st_first_name)+" "+(null===t||void 0===t?void 0:t.st_surname)})}},{dataField:"st_year_level",text:"Level",sort:!0,formatter:function(e,t){var n,i;return(0,F.jsx)("div",{children:null!==t&&void 0!==t&&null!==(n=t.activity_level)&&void 0!==n&&n.level_name?null===t||void 0===t||null===(i=t.activity_level)||void 0===i?void 0:i.level_name:"-"})}},{dataField:"fk_sc_id",text:"School",sort:!0,formatter:function(e,t){return(0,F.jsx)("div",{children:null!==t&&void 0!==t&&t.fk_sc_id?null===t||void 0===t?void 0:t.fk_sc_id:"-"})}},{dataField:"total_session",text:"Sessions Attended",sort:!0},{dataField:"nextSession",text:"Next Session",sort:!0,formatter:function(e,t){var n=null===t||void 0===t?void 0:t.ses_date;return(0,F.jsx)("div",{children:n||"-"})}},{dataField:"action",text:"",formatter:function(e,t){return(0,F.jsx)("img",{src:a.UV,alt:"",onClick:function(){return function(e){T(!0),ae(e);var t={pk_student_key:null===e||void 0===e?void 0:e.pk_student_key};I((0,h.ep)(t))}(t)},className:"cursor-pointer"})}}],ce=(0,v.useCallback)((0,o.Z)((0,i.Z)().mark((function e(){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t={subject_id:0},I((0,h.Mg)(t)).then((function(e){var t,n,i,o,l,r,u=(null===e||void 0===e||null===(t=e.payload)||void 0===t||null===(n=t.data)||void 0===n||null===(i=n.activityLevels)||void 0===i?void 0:i.filter((function(e){return 2===(null===e||void 0===e?void 0:e.subject_id)})))||[],a=(null===e||void 0===e||null===(o=e.payload)||void 0===o||null===(l=o.data)||void 0===l||null===(r=l.activityLevels)||void 0===r?void 0:r.filter((function(e){return 1===(null===e||void 0===e?void 0:e.subject_id)})))||[],d=[].concat((0,s.Z)(a),(0,s.Z)(u)).reduce((function(e,t){var n=1===t.subject_id?"English":"Maths";return e[n]||(e[n]=[]),e[n].push({label:t.level_name,value:t.activity_level_id}),e}),{}),c=Object.keys(d).map((function(e){return{label:e,options:d[e]}}));w(c)}));case 2:case"end":return e.stop()}}),e)}))),[I]);return(0,v.useEffect)((function(){if(null!==ue&&void 0!==ue&&ue.pk_student_key){var e={pk_student_key:null===ue||void 0===ue?void 0:ue.pk_student_key,sort_by:ne,sort_order:te};I((0,h.ep)(e))}}),[te,ne,I]),(0,v.useEffect)((function(){I((0,d.O8)({search:C,sort_field:R,sort_order:J,levelFilter:K,schoolFilter:X,unplannedLesson:q}))}),[I,R,K,J,C,q,X]),(0,v.useEffect)((function(){ce()}),[ce]),(0,F.jsxs)("div",{className:"p-3",children:[(0,F.jsx)(r.Z,{keyField:"pk_student_id",isBackArrow:!0,tableTitle:"Students",handleFilters:!0,isSearch:!0,search:g,handleSearch:function(e){x(e)},handleFilter:function(e,t){t===u.DF.SCHOOL?I((0,d.Vy)(e.value)):t===u.DF.LEVEL&&I((0,d.Z8)(e.value))},handleSizePerPageChange:function(e){I((0,d.cY)(e.value))},handlePageChange:function(e){},onTableChange:function(e,t){var n=t.sortField,i=t.sortOrder;if("sort"===e)I((0,d.yB)({field:n,order:i}))},columns:de,list:Q,isHeading:!0,isLevel:!0,isLevelGroup:!0,isSchool:!0,schoolList:j,levelData:E,page:G,sizePerPage:H,placeholderMsg:u.ZX.STUDENTS,isFilter:oe,filterState:se,isPagination:!1,handleClearFilter:function(){I((0,d.YO)())},handleUnplannedLesson:function(e){var t=e.target.checked;I((0,d.ZA)(t))},unPlannedLesson:q,loading:W,sortField:R,sortOrder:J}),N&&(0,F.jsx)(c.Z,{session:!0,student_key:null===ue||void 0===ue?void 0:ue.pk_student_key,subject_id:null===ue||void 0===ue||null===(e=ue.tbl_student_enrolments[0])||void 0===e||null===(t=e.tbl_enrolment_subjects)||void 0===t||null===(n=t.map((function(e){return null===e||void 0===e?void 0:e.fk_sub_id})))||void 0===n?void 0:n.sort(),modalForViewPastLessons:z,setModalForViewPastLessons:B,closeModal:T}),z&&(0,F.jsx)(p.Z,{closeModal:function(){return B(!1)},show:z,title:"View past sessions",hide:function(){return B(!1)},modalBody:(0,k.Z)(ee,(function(e,t){var n=t.sortField,i=t.sortOrder;if("sort"===e)I((0,h.cJ)(n)),I((0,h._Y)(i))}),ie,ne,te,(function(e){T(!1),B(!1),U("/"+m.Z.SESSION_PAGE+"/"+e.pk_ses_key)}))})]})}}}]);