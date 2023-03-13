const customStyles = {
    header: {
        style: {
          fontSize: '22px',
          borderBottomWidth:"2px",
        },
    },
    head: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
          borderWidth:"1px",
        },
    },
    headRow: {
      style: {
        minHeight: '72px',   
      },
       
    },
    headCells: {
      style: {
          borderRightWidth:"2px", 
          '&:nth-child(2)':{
            minWidth: '300px',
          }
        },
    },
    cells: {
        style: {
          paddingLeft: '6px',
          paddingRight: '6px',
          borderRightWidth:"2px",
          '&:nth-child(2)':{
            minWidth: '300px',
          },
          
        },
    },
    rows: {
      style: {
          fontSize: '13px',
          backgroundColor: "",
          minHeight: '48px',
          borderWidth:"2px",
      },
      stripedStyle: {
          backgroundColor: "#F1F5F9",
      },
    },
    
    noData: {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
   
};
const theadDetails= [
    {name:"#",selector: row => row["#"]},
    {name:"SiteUrl",selector: row => row["siteUrl"]},
    {name:"Clicks ",selector: row => row["clicks"]},
    {name:"Impressions",selector: row => row["impressions"]},
    {name:"Ctr",selector: row => row["ctr"]},
    {name:"Position",selector: row => row["position"]},
    {name:"Coverage State",selector: row => row["coverageState"]},
    {name:"CrawledAs",selector: row => row["crawledAs"]},
    {name:"Indexing State  ",selector: row => row["indexingState"]},
    {name:"Mobile Usability Result",selector: row => row["mobileUsabilityResult"]},
    {name:"Page Fetch State ",selector: row => row["pageFetchState"]},
    {name:"robotsTxtState",selector: row => row["robotsTxtState"]},
    {name:"Verdict",selector: row => row["verdict"]},
    {name:"Last Crawl Time ",selector: row => row["lastCrawlTime"]},
]
const theadCompare= [
    {name:"#",selector: row => row["#"]},
    {name:"key",selector: row => row["key"]},
    {name:"Clicks First Period",selector: row => row["ClicksFirstPeriod"]},
    {name:"Clicks Second Period",selector: row => row["ClicksSecondPeriod"]},
    {name:"Clicks Diffrence",selector: row => row["ClicksDiffrence"]},
    {name:"Impressions First Period",selector: row => row["ImpressionsFirstPeriod"]},
    {name:"Impressions Second Period",selector: row => row["ImpressionsSecondPeriod"]},
    {name:"Impressions Diffrence",selector: row => row["ImpressionsDiffrence"]},
    {name:"changes",selector: row => row["Changes"]},
    {name:"Position First Period",selector: row => row["PositionFirstPeriod"]},
    {name:"Position Second Period",selector: row => row["PositionSecondPeriod"]},
    {name:"Position Diffrence",selector: row => row["PositionDiffrence"]},
]
export {theadCompare,theadDetails,customStyles}