const Sequelize = require("sequelize");
const {DataTypes}= Sequelize;
const sequelize = new Sequelize(
 'urlinspecter',
 'root',
 '',
  {
    host: 'localhost',
    port:3308,
    dialect: 'mysql',
    
  }
);
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
const users = sequelize.define('users',{
  email:{
    type:DataTypes.STRING,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
})
// sSC stands for the name of database (shortname for sites_search_console)
const ssc= sequelize.define('sites_search_console',{
  siteUrl:{
    type:DataTypes.STRING,

  },
  date_inspected:{
    type:DataTypes.DATEONLY,
  },
  mail_sc:{
    type:DataTypes.STRING,
  }
}, {
  tableName: 'sites_search_console',
  
})
// SU stands for the name of database (shortname for sites_urls)
const su = sequelize.define('sites_urls',{
  site_id:{
    type:DataTypes.INTEGER,
  },
  date_inspected:{
    type:DataTypes.DATEONLY,
  },
  clicks:{
    type:DataTypes.STRING,
  },
  impressions:{
    type:DataTypes.STRING,
  },
  position:{
    type:DataTypes.STRING,
  },
  ctr:{
    type:DataTypes.STRING,
  },
  siteUrl:{
    type:DataTypes.STRING,
  },
  verdict:{
    type:DataTypes.STRING,
  },
  coverageState:{
    type:DataTypes.STRING,
  },
  robotsTxtState:{
    type:DataTypes.STRING,
  },
  indexingState:{
    type:DataTypes.STRING,
  },
  pageFetchState:{
    type:DataTypes.STRING,
  },
  crawledAs:{
    type:DataTypes.STRING,
  },
  mobileUsabilityResult:{
    type:DataTypes.STRING,
  },
  lastCrawlTime:{
    type:DataTypes.DATE,
  },
}, {
  tableName: 'sites_urls'
})
// returns all the data from table users
// su.sync({alter:true}).then(res=>console.log(res)).catch(err=>console.log(err)); 
module.exports = {
  sequelize,
  users,
  ssc,
  su
};

///   mysql -u root -p <back-end/database/schema.sql;   ///