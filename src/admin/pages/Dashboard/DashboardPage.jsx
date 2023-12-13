import { AccountBox, ChecklistOutlined, Inventory, Paid } from '@mui/icons-material'
import { Grid, colors } from '@mui/material'
import { default as React, useEffect, useState } from 'react'
import orderApi from '../../../api/orderApi'
import Animate from '../../components/common/Animate'
import BookedData from '../../components/common/BookedData'
import FavouriteData from '../../components/common/FavouriteData'
import StaticData from '../../components/common/StaticData'
import SummaryGrid from '../../components/common/SummaryGrid'

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [summaryData, setSummaryData] = useState([
        {
            id: "totalUser",
            title: "Người dùng",
            value: 0,
            icon: <AccountBox fontSize="large" color="warning" />,
            link: "/admin/user"
        },
        {
            id: "totalProduct",
            title: "Sản phẩm",
            value: 0,
            icon: <Inventory fontSize="large" color="error" />,
            link: "/admin/product"
        },
        {
            id: "totalOrder",
            title: "Đơn đặt",
            value: 0,
            icon: <ChecklistOutlined fontSize="large" color="primary" />,
            link: "/admin/order"
        },
        {
            id: "totalVenue",
            title: "Tổng thu nhập",
            value: 0,
            icon: <Paid fontSize="large" color="success" />,
            link: "/admin/order"
        },
    ]);

    const [bookedData, setBookedData] = useState([
        {
            id: "totalOrderRequest",
            title: "Đang chờ duyệt",
            value: 0,
            percent: 0,
            color: colors.yellow[600]
        },
        {
            id: "totalCompleted",
            title: "Đã duyệt",
            value: 0,
            percent: 0,
            color: colors.blue[600]
        },
        {
            id: "totalCanceled",
            title: "Đã hủy",
            value: 0,
            percent: 0,
            color: colors.red[600]
        },
        {
            id: "totalPayment",
            title: "Đã Thanh toán",
            value: 0,
            percent: 0,
            color: colors.green[600]
        },
    ]);

    const [favouriteData, setFavouriteData] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        const fetchAllSummaryList = async () => {
            setIsLoading(true)
            try {
                const response = await orderApi.getAllStatistics();
                const updatedSummaryData = summaryData.map(item => {
                    let updatedItem = {
                        ...item,
                        value: response[item.id],
                    };
                    if (item.id === "totalVenue") {
                        updatedItem.value = formatNumber(response["totalVenue"]);
                    }
                    return updatedItem;
                })
                setIsLoading(false)
                setSummaryData(updatedSummaryData);
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
            }

        };
        const fetchAllBookedList = async () => {
            setIsLoading(true)
            try {
                const response = await orderApi.getAllStatistics();
                const relevantKeys = ["totalOrderRequest", "totalCompleted", "totalCanceled", "totalPayment"];
                const totalSum = relevantKeys.reduce((sum, key) => sum + response[key], 0);

                const updatedBookedData = bookedData.map(item => {
                    if (relevantKeys.includes(item.id)) {
                        const value = response[item.id];
                        const percent = (value / totalSum) * 100;
                        return {
                            ...item,
                            value,
                            percent,
                        };
                    } else {
                        return item;
                    }
                });
                setIsLoading(false)
                setBookedData(updatedBookedData);
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
            }
        };

        const fetchAllFavouriteList = async () => {
            setIsLoading(true)
            try {
                const response = await orderApi.getAllStatistics();
                setIsLoading(false)

                setFavouriteData([...response.productLike]);
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
            }
        };

        const fetchOrderList = async () => {
            setIsLoading(true);
            try {
                const response = await orderApi.getAll();
                setIsLoading(false);
                setOrderList(response);
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
            }
        }

        fetchOrderList();
        fetchAllSummaryList();
        fetchAllBookedList();
        fetchAllFavouriteList();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <SummaryGrid isLoading={isLoading} summaryData={summaryData} />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Animate type="fade" delay={1.5}>
                            <FavouriteData favouriteData={favouriteData} isLoading={isLoading} />
                        </Animate>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Animate type="fade" delay={2}
                            sx={{
                                height: "100%"
                            }}>
                            <BookedData isLoading={isLoading} bookedData={bookedData} />
                        </Animate>
                    </Grid>
                    <Grid item xs={12}>
                        <Animate delay={2.5}
                            sx={{
                                height: "100%"
                            }}>
                            <StaticData isLoading={isLoading} orderList={orderList} />
                        </Animate>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardPage