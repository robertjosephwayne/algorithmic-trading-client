/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from '@mui/material/Grid';

// NextJS Material Dashboard 2 PRO components
import MDBox from '/components/MDBox';

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from '/components/LayoutContainers/DashboardLayout';
// import DashboardNavbar from '/examples/Navbars/DashboardNavbar';

export default function Positions() {
    return (
        <DashboardLayout>
            {/* <DashboardNavbar /> */}
            <MDBox py={3}>
                <Grid container></Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}
