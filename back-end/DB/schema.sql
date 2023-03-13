DROP DATABASE IF EXISTS urlinspecter;
create database urlinspecter;
use urlinspecter;
create table sites_search_console(
    id int AUTO_INCREMENT ,
    siteUrl text ,
    date_inspected date,
    PRIMARY KEY (id)
);
create table sites_urls(
    id int AUTO_INCREMENT ,
    url_site text ,
    date_inspected date,
    clicks int not null,
    impressions int not null,
    ctr int not null,
    position int not null,
    site_id int not null,
    PRIMARY KEY (id)
    FOREIGN KEY (site_id) REFERENCES sites_search_console(id)
);

