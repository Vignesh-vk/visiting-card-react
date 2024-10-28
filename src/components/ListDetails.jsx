import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CardsPage = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCards();
    }, [page, rowsPerPage]);

    const fetchCards = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cards?page=${page + 1}&limit=${rowsPerPage}`);
            setCards(response.data.cards);
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error fetching cards', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Button variant="outlined" onClick={handleBack}>
                    Back to Upload
                </Button>
            </Box>
            <Typography variant="h4" gutterBottom>
                Stored Visiting Cards
            </Typography>
            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards && cards.map((contact) => (
                                <TableRow key={contact._id}>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.jobTitle}</TableCell>
                                    <TableCell>{contact.companyName}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell>{contact.address}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};

export default CardsPage;
