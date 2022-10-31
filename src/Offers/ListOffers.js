import styles from "./styles.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const ListOffers = ({ offers, getOffers }) => {

  const deleteOffer = async (id) => {
    await axios.delete(`http://localhost:5000/offers/${id}`)
    getOffers()
  }

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCardInner}>
        <div className={styles.offerTitle}>
          <h5>List Offers</h5>
        </div>
        <div className={styles.offerList}>
          {offers && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Updated Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map(({ title, updatedAt, id }, index) => (
                    <TableRow key={index}>
                      <TableCell>{`${index + 1}.`}</TableCell>
                      <TableCell>{title}</TableCell>
                      <TableCell>{updatedAt}</TableCell>
                      <TableCell className={styles.action}>
                        <IconButton color="secondary">
                          <MoreVertIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteOffer(id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOffers;
