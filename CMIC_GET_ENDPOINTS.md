# CMiC API GET Endpoints

GET endpoints across the five target modules: Asset Management, Core System, Financials, Project Controls, Project Management.

**Total: 313 endpoints**

| Module | Count |
|---|---|
| Asset Management | 62 |
| Core System | 43 |
| Financials | 64 |
| Project Controls | 53 |
| Project Management | 91 |

## Source & caveats

- Extracted from the apidocs pages reachable via the sitemap on `developers.cmicglobal.com`.
- Each entry is the page's `og:title` (which encodes `Title — Module | Sub-module`) plus the REST path embedded in the page body.
- Some duplicates exist (e.g. two "Query an AP Cheque" pages with the same path) — these are duplicate doc pages on CMiC's side.
- `(no path)` means the page didn't expose a `/<x>-rest-api/rest/N/<resource>` pattern in a parseable spot — verify manually.
- All 24 General Ledger endpoints fell into the "no path" bucket; they are almost certainly under `/gl-rest-api/rest/1/...` but the path needs manual confirmation per endpoint.

---

## Asset Management

### Equipment
- Retrieve EM Truck Details By Code — `/em-rest-api/rest/1/emeqprate`
- Retrieve Eqp Com Tran By Code — `/em-rest-api/rest/1/emeqpcomtran`
- Retrieve Equipment Actual Locations By Code — `/em-rest-api/rest/1/emactloc`
- Retrieve Equipment Classes By Code — `/em-rest-api/rest/1/emeqpclass`
- Retrieve Equipment Home Locations By Code — `/em-rest-api/rest/1/emhomeloc`
- Retrieve Equipment Rates by Code — `/em-rest-api/rest/1/emeqprate`
- Retrieve Equipment Rates by Row ID — `/em-rest-api/rest/1/emeqprates`
- Retrieve Equipment Timesheet Transactions by Code — `/em-rest-api/rest/1/emtrantiment`
- Retrieve Equipment Transaction Location Transfers By Code — `/em-rest-api/rest/1/emtranactloc`
- Retrieve Equipment by Code — `/em-rest-api/rest/1/emeqprates`
- Retrieve Equipment by VUUID — `(no path)`
- Retrieve Posted Equipment Transaction Location Transfers By Equipment Code — `/em-rest-api/rest/1/emtranpostactloc`
- Retrieve Posted Equipment Transaction Location Transfers By New Location Code — `/em-rest-api/rest/1/emtranpostactloc`
- Retrieve Transactions by Code — `(no path)`
- Retrieve Unique Truck Detail by VUUID — `/em-rest-api/rest/1/emtruckdet`
- Retrieve Unique by VUUID — `/em-rest-api/rest/1/emeqpcomtran`
- Retrieve a Specific Equipment Class By Class Code — `/em-rest-api/rest/1/emeqpclass`
- Retrieve a Specific Equipment Location Transfer By VUUID — `/em-rest-api/rest/1/emtranactloc`
- Retrieve a Specific Equipment by VUUID — `/em-rest-api/rest/1/emequipment`
- Retrieve a Specific Equipment by VUUID — `/em-rest-api/rest/1/emtrantiment`
- Retrieve a Specific Home Location Code By Location Code — `/em-rest-api/rest/1/emhomeloc`
- Retrieve a Specific Posted Equipment Location Transfer By VUUID — `/em-rest-api/rest/1/emtranpostactloc`
- Retrieve a Unique Equipment Actual Location By Location ID — `/em-rest-api/rest/1/emactloc`

### Fixed Assets
- Retrieve Fixed Asset by Code — `/fa-rest-api/rest/1/faasset`
- Retrieve a Specific Fixed Asset by VUUID — `/fa-rest-api/rest/1/faasset`

### Inventory
- Retrieve Inventory Classes By Code — `/ci-rest-api/rest/1/ciclass`
- Retrieve Inventory Issue By Code — `/ci-rest-api/rest/1/ciinventoryissue`
- Retrieve Inventory Item Detail By Code — `/ci-rest-api/rest/1/ciitemdetail`
- Retrieve Inventory Item Location Logs By Code — `/ci-rest-api/rest/1/ciitemloclog`
- Retrieve Inventory Items By Code — `/ci-rest-api/rest/1/ciitem`
- Retrieve Inventory Locations By Code — `/ci-rest-api/rest/1/cilocation`
- Retrieve Inventory Posted Transactions By Code — `/ci-rest-api/rest/1/citranposted`
- Retrieve Inventory location by Company and location code — `(no path)`
- Retrieve a Specific Inventory Class By VUUID — `/ci-rest-api/rest/1/ciclass`
- Retrieve a Specific Inventory Issue By VUUID — `/ci-rest-api/rest/1/ciinventoryissue`
- Retrieve a Specific Inventory Item By VUUID — `/ci-rest-api/rest/2/ciitem`
- Retrieve a Specific Inventory Item Detail By VUUID — `/ci-rest-api/rest/1/ciitemdetail`
- Retrieve a Specific Inventory Item Header — `/ci-rest-api/rest/1/ciitemhdr`
- Retrieve a Specific Inventory Location By VUUID — `/ci-rest-api/rest/1/cilocation`
- Retrieve a Specific Inventory Posted Transaction By VUUID — `/ci-rest-api/rest/1/citranposted`
- Retrieve a Specific Inventory location by VUUID — `(no path)`
- Retrieve all Inventory Location — `(no path)`

### Purchase Order
- Retrieve Non-Stock Item By VUUID — `/po-rest-api/rest/1/poNonStockItem`
- Retrieve Non-Stock Items By Company Code, Item Code and Cost Code — `/po-rest-api/rest/1/poNonStockItem`
- Retrieve Posted Purchase Order Receipts By Company Code and Vendor Code — `/po-rest-api/rest/1/postedporeceipt`
- Retrieve Posted Purchase Order Receipts By VUUID — `/po-rest-api/rest/2/postedporeceipt`
- Retrieve Purchase Order Details By Code — `/po-rest-api/rest/1/podetail`
- Retrieve Purchase Order Headers By Code — `/po-rest-api/rest/1/pomaster`
- Retrieve Purchase Order Roles for User By Company Code and User ID — `/po-rest-api/rest/1/poRoles`
- Retrieve Purchase Order Roles for User by VUUID — `/po-rest-api/rest/1/poRoles`
- Retrieve Unposted Purchase Order Receipts By Company Code and Vendor Code — `/po-rest-api/rest/1/unpostedporeceipt`
- Retrieve Unposted Purchase Order Receipts By VUUID — `/po-rest-api/rest/2/unpostedporeceipt`
- Retrieve User Assigned With Tracking Code By Company Code, Tracking Code and User ID — `/po-rest-api/rest/1/poUserIdCrossRef`
- Retrieve User Assigned With Tracking Code By VUUID — `/po-rest-api/rest/1/poUserIdCrossRef`
- Retrieve a Specific Purchase Order Header By VUUID — `/po-rest-api/rest/1/pomaster`
- Retrieve a specific Purchase Order Detail By VUUID — `/po-rest-api/rest/1/podetail`
- Retrieve all Purchase Order Headers — `/po-rest-api/rest/1/pomaster`

### Requisition
- Retrieve Requisition — `/po-rest-api/rest/1/porequisition`
- Retrieve all Requisition Detail Lines — `/po-rest-api/rest/1/porequisitiondet`
- Retrieve all Requisition headers — `/po-rest-api/rest/1/porequisition`

## Core System

### Audit Status Log by Object
- Retrieve SD Object Audit Current States By Code — `/sys-rest-api/rest/1/sdobjectauditcurrstat`
- Retrieve a Specific SD Object Audit Current State By VUUID — `/sys-rest-api/rest/1/sdobjectauditcurrstat`

### Bank
- Retrieve BA Banks By Code — `/sys-rest-api/rest/1/babank`
- Retrieve a Specific BA Bank — `/sys-rest-api/rest/1/babank`

### Business Partner Addresses
- Retrieve A Specific BP Address By VUUID — `/sys-rest-api/rest/1/bpaddresses`
- Retrieve BP Address By Code — `/sys-rest-api/rest/1/bpaddresses`

### Business Partners
- Retrieve Specific Business Partners by Code — `/sys-rest-api/rest/1/businesspartner`
- Retrieve a specific Business Partner — `/sys-rest-api/rest/1/businesspartner`

### Company Access
- Retrieve Company Access By Company Code and User ID — `/sys-rest-api/rest/1/sdcompanyaccess`
- Retrieve Company Access By VUUID — `/sys-rest-api/rest/1/sdcompanyaccess`

### Currency
- Retrieve BA Currencies by Code — `/sys-rest-api/rest/1/bacurrency`
- Retrieve a Specific BA Currency By Currency Code — `/sys-rest-api/rest/1/bacurrency`

### Documents by Object
- Retrieve Documents by Object — `/sys-rest-api/rest/1/sysrelateddocquery`
- Retrieve a Specific Document By VUUID — `/sys-rest-api/rest/1/sysrelateddocquery`

### Exchange Rates
- Retrieve BA Exchange Rates by Code — `/sys-rest-api/rest/1/exchangerate`
- Retrieve a Specific BA Exchange Rate By VUUID — `/sys-rest-api/rest/1/exchangerate`

### Field User Defined Classifiers
- Retrieve User Defined Classifier Query By Object Attributes — `/sys-rest-api/rest/1/userdefinedclassifierquery`

### Global Table Text Codes
- Retrieve GT Texts By Code — `/sys-rest-api/rest/1/gttext`

### Global Table Regions
- Retrieve Region Lists By Code — `/sys-rest-api/rest/1/gtregion`
- Retrieve a Specific Region By VUUID — `/sys-rest-api/rest/1/gtregion`

### Job/Project Security
- Retrieve Job Assigned to Security Groups — `/sys-rest-api/rest/1/jcjobsecgrpjob`
- Retrieve Project Assigned to Security Groups — `/sys-rest-api/rest/1/jcjobsecgrpproj`
- Retrieve Users Assigned to Job Security Groups — `/sys-rest-api/rest/1/jcjobsecgrpuser`

### Licensed Users
- Retrieve Licensed Users — `/sys-rest-api/rest/1/syscontactpool`

### Security Groups
- Retrieve Security Groups By VUUID — `/sys-rest-api/rest/1/jcjobsecgrp`

### System Contact
- Retrieve Contacts By Codes — `/sys-rest-api/rest/1/syscontact`
- Retrieve a Specific Contact By VUUID — `/sys-rest-api/rest/1/syscontact`

### Terms
- Retrieve Term List By Code — `/sys-rest-api/rest/1/gtregion`
- Retrieve a Specific Term By VUUID — `/sys-rest-api/rest/1/term`

### User Defined Classifiers by Object
- Retrieve User Defined Classifiers By Date — `/sys-rest-api/rest/1/userdefinedclassifier`

### User Extension Definitions by Object
- Retrieve User Extension Fields Definitions By Code — `/sys-rest-api/rest/1/sdobjusrextdef`
- Retrieve a Specific User Extension Field Definition By VUUID — `/sys-rest-api/rest/1/sdobjusrextdef`

### User Extension Table Data Value
- Retrieve UE Table Data — `(no path)`

### User Extension Values by Object
- Retrieve User Extension Field Value By Object — `/sys-rest-api/rest/1/sdobjusrextvalue`
- Retrieve a Specific User Extension Field Value By VUUID — `/sys-rest-api/rest/1/sdobjusrextvalue`

### User Extention Field Data Value
- Retrieve Specific Valid Field Data By VUUID — `/sys-rest-api/rest/1/uevalidfielddata`
- Retrieve Valid Field Data List By Code — `/sys-rest-api/rest/1/uevalidfielddata`

### User Maintenance
- Retrieve Users By Company Code, User ID, Employee No and Created Date — `(no path)`

### User Roles
- Retrieve User Roles By User ID, Role Code and Created Date — `/sys-rest-api/rest/1/sduserroles`
- Retrieve User Roles By VUUID — `/sys-rest-api/rest/1/sduserroles`

### Weight Measures
- Retrieve a Specific Weight Measures By Code — `/sys-rest-api/rest/1/weightmeasure`

## Financials

### Accounts Payable
- Query an AP Cheque — `/ap-rest-api/rest/1/apcheque`
- Retrieve Outstanding Invoice By Code — `/ap-rest-api/rest/1/apinvoutstanding`
- Retrieve A Specific AP Registered Invoice By VUUID — `/ap-rest-api/rest/1/apreginv`
- Retrieve A Specific AP Registered Invoice Detail Line By VUUID — `/ap-rest-api/rest/1/apreginvdet`
- Retrieve A Specific Registered Invoice Details by VUUID — `/ap-rest-api/rest/1/apreginvdetails`
- Retrieve A Specific Unposted Voucher By Voucher Number — `/ap-rest-api/rest/1/unpostedvouchers`
- Retrieve A Specific Voucher By Voucher Number — `/ap-rest-api/rest/1/apallvouchers`
- Retrieve AP Insurance by Multiple Compliance Types — `/ap-rest-api/rest/1/apinsurance`
- Retrieve AP Manual Cheque by Code — `/ap-rest-api/rest/1/manualcheck`
- Retrieve AP Open Periods By Code — `/ap-rest-api/rest/1/openperiods`
- Retrieve AP Registered Invoices By Code — `/ap-rest-api/rest/1/apreginv`
- Retrieve AP Vendor by Code — `/ap-rest-api/rest/1/apvendor`
- Retrieve AP Voudist Rollup by Code — `/ap-rest-api/rest/1/voudistphssegmsum`
- Retrieve Allvouchers By Code — `/ap-rest-api/rest/1/apallvouchers`
- Retrieve By Query Params — `(no path)`
- Retrieve Cheque by Code — `/ap-rest-api/rest/1/apvouchq`
- Retrieve Registered Invoice Details by Code — `/ap-rest-api/rest/1/apreginvdetails`
- Retrieve SC RFP Detail By Code — `/ap-rest-api/rest/1/scrfpdetail`
- Retrieve Specific AP Voudist Phs Segm by VouNum — `/ap-rest-api/rest/1/voudistphssegm`
- Retrieve Unposted Vouchers By Code — `/ap-rest-api/rest/1/unpostedvouchers`
- Retrieve Voucher Memos By Voucher Number — `/ap-rest-api/rest/1/apvoumemo`
- Retrieve a Specific AP Insurance By VUUID — `/ap-rest-api/rest/1/apinsurance`
- Retrieve a Specific AP Outstanding Invoice By Invoice Voucher Number — `/ap-rest-api/rest/1/apinvoutstanding`
- Retrieve a Specific AP Vendor by VUUID — `/ap-rest-api/rest/1/apvendor`
- Retrieve a Specific AP Voucher By Voucher Number with Distribution — `/ap-rest-api/rest/1/apvoucher`
- Retrieve a Specific Invoice Registry Group By VUUID — `/ap-rest-api/rest/1/apreggrp`
- Retrieve a Unique AP Manual Cheque by Chq Seq Number — `/ap-rest-api/rest/1/manualcheck`

### Accounts Receivable
- Retrieve A Specific Invoice Payment By VUUID — `/ar-rest-api/rest/1/arinvpay`
- Retrieve AR Aged Report — `/ar-rest-api/rest/1/aragedreport`
- Retrieve AR Customers by Code — `/ar-rest-api/rest/1/arcustomer`
- Retrieve AR Invoice Memo Log By Code — `/ar-rest-api/rest/1/arinvmemolog`
- Retrieve AR Outstanding Invoices By Code — `/ar-rest-api/rest/1/arinvoutstanding`
- Retrieve AR Payments by Code — `/ar-rest-api/rest/1/arpayment`
- Retrieve AR Tax Items By Code — `/ar-rest-api/rest/1/artaxitems`
- Retrieve Invoice Payments by Code — `/ar-rest-api/rest/1/arinvpay`
- Retrieve Specific AR Invoice by Code — `/ar-rest-api/rest/1/arinvoice`
- Retrieve a Specific AR Customer By VUUID — `/ar-rest-api/rest/1/arcustomer`
- Retrieve a Specific AR Invoice By VUUID — `/ar-rest-api/rest/1/arinvoice`
- Retrieve a specific AR Tax Item By VUUID — `/ar-rest-api/rest/1/artaxitems`

### General Ledger
*All 24 General Ledger endpoints had path-extraction failures — paths likely live under `/gl-rest-api/rest/1/...` but need manual confirmation.*

- Retrieve Document Top Levels By Code — `(no path)`
- Retrieve GL Accounts By Code — `(no path)`
- Retrieve GL Budgets By Code — `(no path)`
- Retrieve GL Companies By Code — `(no path)`
- Retrieve GL Departments By Code — `(no path)`
- Retrieve GL Document Columns By Code — `(no path)`
- Retrieve GL Document rows By Code — `(no path)`
- Retrieve GL Documents By Code — `(no path)`
- Retrieve GL Ledgers By Code — `(no path)`
- Retrieve GL Period Activity Logs By Code — `(no path)`
- Retrieve GL Periods By Code — `(no path)`
- Retrieve GL Trial Balance by Account — `(no path)`
- Retrieve GL document drill downs By Code — `(no path)`
- Retrieve a Specific GL Company By VUUID — `(no path)`
- Retrieve a Specific GL Consolidation — `(no path)`
- Retrieve a Specific GL Consolidation Chart — `(no path)`
- Retrieve a Specific GL Department — `(no path)`
- Retrieve a Specific GL Journal By Journal Code — `(no path)`
- Retrieve a Specific GL Period By Row ID — `(no path)`
- Retrieve a Specific GL document — `(no path)`
- Retrieve a Specific GL document column — `(no path)`
- Retrieve a Specific GL document row — `(no path)`
- Retrieve a specific GL Account By View ID — `(no path)`
- Retrieve a specific GL budget — `(no path)`

## Project Controls

### CM Statuses
- Retrieve PCI Statuses By Code — `/cm-rest-api/rest/1/cmstatus`
- Retrieve a Specific PCI Status By VUUID — `/cm-rest-api/rest/1/cmstatus`

### CM Types
- Retrieve PCI Types By Code — `/cm-rest-api/rest/1/cmtype`
- Retrieve a Specific PCI Type By VUUID — `/cm-rest-api/rest/1/cmtype`

### CM Vendor Details
- Retrieve PCI Change Order SC Vendor Details By Code — `/cm-rest-api/rest/1/cmvendordetail`
- Retrieve a Specific PCI Change Order SC Vendor Detail By VUUID — `/cm-rest-api/rest/1/cmvendordetail`

### Job Billing
- Retrieve JB Groups By Code — `/jb-rest-api/rest/1/jbgroup`
- Retrieve a Specific JB Group By VUUID — `/jb-rest-api/rest/1/jbcont`
- Retrieve a Specific JB Group By VUUID — `/jb-rest-api/rest/1/jbgroup`
- Retrieve all JB Contracts By Code — `/jb-rest-api/rest/1/jbcont`

### Job Cost
- Retrieve JC Batches By Code — `/jc-rest-api/rest/1/jcbatch`
- Retrieve JC Combined Job Relations By Code — `/jc-rest-api/rest/1/jcjobcombinedjobrel`
- Retrieve JC Contract Forecasting Staff By Code — `/jc-rest-api/rest/1/jccontforecaststaff`
- Retrieve JC Contract Forecasting Staff By VUUID — `/jc-rest-api/rest/1/jccontforecaststaff`
- Retrieve JC Contract Forecasting Staff Details By VUUID — `/jc-rest-api/rest/1/jccontforecaststaffdet`
- Retrieve JC Cost Complete Details By Codes — `/jc-rest-api/rest/1/jccostcompletedetail`
- Retrieve JC Cost To Complete Spreads By VUUID — `/jc-rest-api/rest/1/jccosttocompletespread`
- Retrieve JC Cost to Complete Details by Code — `/jc-rest-api/rest/1/jccontfcostcompdet`
- Retrieve JC Foreign Batch Data File By VUUID — `/jc-rest-api/rest/1/jcforeignbatchdatafile`
- Retrieve JC Job Phases By Code — `/jc-rest-api/rest/1/jcjobcostcodes`
- Retrieve JC Job Phases Category Codes By Code — `/jc-rest-api/rest/1/jcjobcostcatcodes`
- Retrieve JC Jobs By Code — `/jc-rest-api/rest/1/jcjob`
- Retrieve JC Transaction By Code — `/jc-rest-api/rest/1/jctran`
- Retrieve JC WIP Report Export — `/jc-rest-api/rest/1/jcwiprep`
- Retrieve Job Categories By Code — `/jc-rest-api/rest/1/jcjobcategory`
- Retrieve Master Categories By Code — `/jc-rest-api/rest/1/jcmastercategories`
- Retrieve Master Phases/Cost Codes By Code — `/jc-rest-api/rest/1/jcmastercostcodes`
- Retrieve Posted JC Details — `/jc-rest-api/rest/1/jcdetailposted`
- Retrieve Specific JC Unit Complete Transaction by Code — `/jc-rest-api/rest/1/jcutran`
- Retrieve a Specific JC Combined Job Relation By VUUID — `/jc-rest-api/rest/1/jcjobcombinedjobrel`
- Retrieve a Specific JC Cost Complete Detail By VUUID — `/jc-rest-api/rest/1/jccostcompletedetail`
- Retrieve a Specific JC Forecast Archives By Code — `/jc-rest-api/rest/1/jccontforecastarch`
- Retrieve a Specific JC Job Phase By VUUID — `/jc-rest-api/rest/1/jcjobcostcatcodes`
- Retrieve a Specific JC Unit Complete Transaction By VUUID — `/jc-rest-api/rest/1/jcutran`
- Retrieve a Specific Posted JC Detail Posted By VUUID — `/jc-rest-api/rest/1/jcdetailposted`
- Retrieve a specific Cost Complete Details by VUUID — `/jc-rest-api/rest/1/jccontfcostcompdet`
- Retrieve a specific JC Job Batch By VUUID — `/jc-rest-api/rest/1/jcbatch`
- Retrieve a specific JC Job By VUUID — `/jc-rest-api/rest/1/jcjob`
- Retrieve a specific JC Job Category By VUUID — `/jc-rest-api/rest/1/jcjobcategory`
- Retrieve a specific JC Master Phase By VUUID — `/jc-rest-api/rest/1/jcmastercostcodes`
- Retrieve a specific JC Transaction By VUUID — `/jc-rest-api/rest/1/jctran`

### Owner Change Orders
- Retrieve Owner Change Orders By Code — `/cm-rest-api/rest/1/cmownerchangeorder`
- Retrieve a Specific Owner Change Order By VUUID — `/cm-rest-api/rest/1/cmownerchangeorder`

### PCI Details
- Retrieve PCI details By Code — `/cm-rest-api/rest/1/cmdetail`
- Retrieve a Specific PCI Detail By VUUID — `/cm-rest-api/rest/1/cmdetail`

### PCI Headers
- Retrieve PCI Masters By Code — `/cm-rest-api/rest/1/cmmast`
- Retrieve a Specific PCI Detail By VUUID — `/cm-rest-api/rest/1/cmmast`

### RFQ (Request for Quote) Extensions
- Retrieve PCI RFQ Extensions By Code — `/cm-rest-api/rest/1/cmrfqextend`
- Retrieve a Specific RFQ Extension By VUUID — `/cm-rest-api/rest/1/cmrfqextend`

### Unposted PCI Details
- Retrieve Unposted PCI Details By Code — `/cm-rest-api/rest/1/cmdetailunposted`

## Project Management

### Communications
- Retrieve PM Communications By Code — `/pm-rest-api/rest/1/pmcomm`
- Retrieve a Specific PM Communication — `/pm-rest-api/rest/1/pmcomm`

### Communications Types
- Retrieve a Specific PM Communication Type — `/pm-rest-api/rest/1/pmcommtype`

### Company Contacts
- Retrieve PM Contact By Code — `/pm-rest-api/rest/1/pmcompcontact`
- Retrieve a Specific PM Company Contact By VUUID — `/pm-rest-api/rest/1/pmcompcontact`

### Contract Types
- Retrieve a Specific PM Contract Type — `/pm-rest-api/rest/1/pmcontracttype`

### Daily Journal Bill Details
- Retrieve PM Daily Journal Bill Details By Code — `/pm-rest-api/rest/1/pmdailyjourbilldet`
- Retrieve a Specific PM Daily Journal Bill Detail — `/pm-rest-api/rest/1/pmdailyjourbilldet`

### Daily Journal Daily Work Plans
- Retrieve PM Daily Journal Daily Work Plans By Code — `/pm-rest-api/rest/1/pmdailyjourdwp`
- Retrieve a Specific PM Daily Journal Daily Work Plan — `/pm-rest-api/rest/1/pmdailyjourdwp`

### Daily Journal Field Forces
- Retrieve PM Daily Journal Field Force By Code — `/pm-rest-api/rest/1/pmdailyjourff`
- Retrieve a Specific PM Daily Journal Field Force — `/pm-rest-api/rest/1/pmdailyjourff`

### Daily Journal Labour
- Retrieve PM Daily Journal Labour By Code — `/pm-rest-api/rest/1/pmdailyjourlab`
- Retrieve a Specific PM Daily Journal Labour By VUUID — `/pm-rest-api/rest/1/pmdailyjourlab`

### Daily Journal Materials
- Retrieve PM Daily Journal Materials By Code — `/pm-rest-api/rest/1/pmdailyjourmat`
- Retrieve a Specific PM Daily Journal Material By VUUID — `/pm-rest-api/rest/1/pmdailyjourmat`

### Daily Journal Owner Equipment
- Retrieve PM Daily Journal Owner Equipment By Code — `/pm-rest-api/rest/1/pmdailyjouroeqp`
- Retrieve a Specific PM Daily Journal Owner Equipment By VUUID — `/pm-rest-api/rest/1/pmdailyjouroeqp`

### Daily Journal Quality Control
- Retrieve PM Daily Journal Quality Control By Code — `/pm-rest-api/rest/1/pmdailyjourqc`
- Retrieve a Specific PM Daily Journal Quality Control By VUUID — `/pm-rest-api/rest/1/pmdailyjourqc`

### Daily Journal Tasks
- Retrieve PM Daily Journal Tasks By Code — `/pm-rest-api/rest/1/pmdailyjourtask`
- Retrieve a Specific PM Daily Journal Task By VUUID — `/pm-rest-api/rest/1/pmdailyjourtask`

### Daily Journal Trade Equipment
- Retrieve PM Daily Journal Trade Equipment By Code — `/pm-rest-api/rest/1/pmdailyjourteqp`
- Retrieve a Specific PM Daily Journal Trade Equipment By VUUID — `/pm-rest-api/rest/1/pmdailyjourteqp`

### Daily Journal Transactions
- Retrieve PM Daily Journal Transactions By Code — `/pm-rest-api/rest/1/pmdailyjourtran`
- Retrieve a Specific PM Daily Journal Transaction By VUUID — `/pm-rest-api/rest/1/pmdailyjourtran`

### Daily Journal User Defined Data
- Retrieve PM Daily Journal User Defined Data By Code — `/pm-rest-api/rest/1/pmdailyjourtran`
- Retrieve a Specific PM Daily Journal User Defined Data By VUUID — `/pm-rest-api/rest/1/pmdailyjourudd`

### Daily Journal Visitors
- Retrieve PM Daily Journal Visitors By Code — `/pm-rest-api/rest/1/pmdailyjourvis`
- Retrieve a Specific PM Daily Journal Visitor By VUUID — `/pm-rest-api/rest/1/pmdailyjourvis`

### Daily Journals
- Retrieve PM Daily Journals By Code — `/pm-rest-api/rest/1/pmdailyjournal`
- Retrieve a Specific PM Daily Journal By VUUID — `/pm-rest-api/rest/1/pmdailyjournal`

### Distribution BCC
- Retrieve a Specific PM Distribution (BCC) By VUUID — `/pm-rest-api/rest/1/pmdistbcc`

### Distribution CC
- Retrieve a Specific PM Distribution (CC) By VUUID — `/pm-rest-api/rest/1/pmdistcc`

### Field Work Directive Statuses
- Retrieve a Specific PM Field Work Directive Status By VUUID — `/pm-rest-api/rest/1/pmfwdstatus`

### Field Work Directives
- Retrieve a Specific PM Field Work Directive By VUUID — `/pm-rest-api/rest/1/pmfwd`

### Foreign Bid Item Imports
- Retrieve a Specific Foreign Bid Item Import — `/pm-rest-api/rest/1/foreignbiditemimport`

### Issues
- Retrieve a Specific PM Issue By VUUID — `/pm-rest-api/rest/1/pmissue`

### Key Players
- Retrieve PM Key Players By Code — `/pm-rest-api/rest/1/pmkeyplayers`

### Meeting Attendees
- Retrieve a Specific PM Meeting Attendee By VUUID — `/pm-rest-api/rest/1/pmmeetingattnd`

### Meeting Item Statuses
- Retrieve a Specific PM Meeting Item Status By VUUID — `/pm-rest-api/rest/1/pmmeetingitemstatus`

### Meeting Items
- Retrieve a Specific PM Meeting Item By VUUID — `/pm-rest-api/rest/1/pmmeetingitem`

### Meeting Tracks
- Retrieve PM Meeting Tracks By Code — `/pm-rest-api/rest/1/pmmeetingtrack`
- Retrieve a Specific PM Meeting Track By VUUID — `/pm-rest-api/rest/1/pmmeetingtrack`

### Meetings
- Retrieve a Specific PM Meeting By VUUID — `/pm-rest-api/rest/1/pmmeeting`

### Notes
- Retrieve PM Notes By Code — `/pm-rest-api/rest/1/pmnotes`
- Retrieve a Specific PM Note By VUUID — `/pm-rest-api/rest/1/pmnotes`

### Notice Statuses
- Retrieve a Specific PM Notice Status By VUUID — `/pm-rest-api/rest/1/pmnoticestatus`

### Notices
- Retrieve a Specific PM Notice By VUUID — `/pm-rest-api/rest/1/pmnotice`

### PCI Real Locations
- Retrieve a Specific PM PCI Real Location By VUUID — `/pm-rest-api/rest/1/pmpcirealloc`

### Project Contacts
- Retrieve PM Project Contacts By Code — `/pm-rest-api/rest/1/pmprojcontact`
- Retrieve a Specific PM Project Contact By VUUID — `/pm-rest-api/rest/1/pmprojcontact`

### Project Item Phase Segment Sums
- Retrieve PM Project Item Phase Segment Sums By Code — `/pm-rest-api/rest/1/pmprojectitemphssegmsum`
- Retrieve a Specific PM Project Item Phase Segment Sum By VUUID — `/pm-rest-api/rest/1/pmprojectitemphssegmsum`

### Project Items
- Retrieve PM Project Items By Code — `/pm-rest-api/rest/1/pmprojectitem`
- Retrieve a Specific PM Project Item By VUUID — `/pm-rest-api/rest/1/pmprojectitem`

### Project Partners
- Retrieve PM Project Partners By Code — `/pm-rest-api/rest/1/pmprojpartner`
- Retrieve Vendor From Project Partners — `/pm-rest-api/rest/1/pmprojpartner`
- Retrieve a Specific PM Project Partner By VUUID — `/pm-rest-api/rest/1/pmprojpartner`

### Projects
- Retrieve PM Projects By Code — `/pm-rest-api/rest/1/pmproject`
- Retrieve a Specific PM Project By VUUID — `/pm-rest-api/rest/1/pmproject`

### Punchlist Details
- Retrieve PM Punchlist Details By Code — `/pm-rest-api/rest/1/pmpunchlistdet`
- Retrieve a Specific PM Project Punchlist Detail By VUUID — `/pm-rest-api/rest/1/pmpunchlistdet`

### Punchlist Statuses
- Retrieve PM Punchlist Statuses By Code — `/pm-rest-api/rest/1/pmpunchliststatus`
- Retrieve a Specific PM Punchlist Status By VUUID — `/pm-rest-api/rest/1/pmpunchliststatus`

### Punchlists
- Retrieve PM Punchlists By Code — `/pm-rest-api/rest/1/pmpunchlist`
- Retrieve a Specific PM Punchlist By VUUID — `/pm-rest-api/rest/1/pmpunchlist`

### RFI Statuses
- Retrieve PM RFI Statuses By Code — `/pm-rest-api/rest/1/pmrfistatus`
- Retrieve a Specific PM RFI Status By PmrfisStatusCode — `/pm-rest-api/rest/1/pmrfistatus`

### RFIs (Requests for Information)
- Retrieve PM RFI By Code — `/pm-rest-api/rest/1/pmrfi`
- Retrieve a Specific PM RFI By VUUID — `/pm-rest-api/rest/1/pmrfi`

### Self Perform Vendor
- Retrieve Self Perform Vendor By Company Code — `/pm-rest-api/rest/1/selfperformvendor`

### Subcontract Headers
- Retrieve SC Headers By Code — `/pm-rest-api/rest/1/scmast`
- Retrieve a Specific SC Header By VUUID — `/pm-rest-api/rest/1/scmast`

### Subcontract Prequal
- Retrieve Subcontract Prequal partners by Tax ID — `/prq-rest-api/rest/1/pmprqbpartners`
- Retrieve Subcontract Prequal partners by VUuid — `/prq-rest-api/rest/1/pmprqbpartners`

### Subcontract Schedules
- Retrieve SC Details By Code — `/pm-rest-api/rest/1/scsched`
- Retrieve a Specific SC Detail By VUUID — `/pm-rest-api/rest/1/scsched`

### Subcontract Schedule Phase Segment Sums
- Retrieve Schedule Phases By Code — `/pm-rest-api/rest/1/scschedphssegsum`

### Submittal Package Details
- Retrieve PM Submittal Package Details By Code — `/pm-rest-api/rest/1/pmsbmtpdetail`
- Retrieve a Specific PM Submittal Package Detail By VUUID — `/pm-rest-api/rest/1/pmsbmtpdetail`

### Submittal Package Status
- Retrieve a Specific PM Submittal Package Status By VUUID — `/pm-rest-api/rest/1/pmsubmitpkgstatus`

### Submittal Packages
- Retrieve PM Submittal Packages By Code — `/pm-rest-api/rest/1/pmsubmitpkg`
- Retrieve a Specific PM Submittal Package By VUUID — `/pm-rest-api/rest/1/pmsubmitpkg`

### Submittal Status
- Retrieve PM Submittal Statuses By Code — `/pm-rest-api/rest/1/pmsubmittalstatus`
- Retrieve a Specific PM Submittal Status By PmsmsStatusCode — `/pm-rest-api/rest/1/pmsubmittalstatus`

### Submittal Types
- Retrieve a Specific PM Submittal Type By PmsmtTypeCode — `/pm-rest-api/rest/1/pmsubmittaltype`

### Submittals
- Retrieve PM Submittals By Code — `/pm-rest-api/rest/1/pmsubmittal`
- Retrieve a Specific PM Submittal By VUUID — `/pm-rest-api/rest/1/pmsubmittal`

### Transmittals
- Retrieve a Specific PM Transmittal By VUUID — `/pm-rest-api/rest/1/pmtransmittal`

### User Roles
- Retrieve a Specific PM User Role By Code — `/pm-rest-api/rest/1/pmuserrole`
