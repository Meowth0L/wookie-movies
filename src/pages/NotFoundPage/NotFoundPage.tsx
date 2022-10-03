import React from "react";
import { Typography } from "../../components/common";
import MainLayout from "../../layouts/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <Typography variant="header" center>
        Page is not found
      </Typography>
    </MainLayout>
  );
};

export default NotFoundPage;
