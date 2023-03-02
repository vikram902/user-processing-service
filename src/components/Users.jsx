import styled from '@emotion/styled';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';



const Component = styled(Box)`
width:80%
`;
const Users = () => {
    // this is api gateway url   in this api gate we give our lambda function  for ui o be n cloud we upload build folder using 
    //aws s3 sync build/ s3://user-processing-services
    // command to connect aws cli 
    //$ aws configure
// AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
// AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
// Default region name [None]: us-west-2
// Default output format [None]: json
    const API_URL=' https://web21i3gh1.execute-api.us-east-1.amazonaws.com/dev'
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(API_URL);
            console.log(JSON.parse(response.data).Items); 
            setUsers(JSON.parse(response.data).Items)
        }
        getData();
    }, [])
    const removeEntry = (id) => {
      const UpadtedUsers=  users.filter(user => user.id!==id);
      setUsers(UpadtedUsers)
    }

    
  
    return (
        <Component>

            <Typography variant='h4'>Users</Typography>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Remove Entry</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.salary}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={()=> removeEntry(user.id)}>Remove</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                        


                  

                   


                    
                </Table>
            </Box>
        </Component>
    );
}

export default Users;