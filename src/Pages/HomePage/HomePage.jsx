import React from "react";
import { Fragment } from "react";
import Banner from "../../components/Banner/Banner";
import CoinsTable from "../../components/CoinsTable/CoinsTable";

const HomePage = () => {
  return (
    <Fragment>
      <Banner />
      <CoinsTable />
    </Fragment>
  );
};

export default HomePage;
