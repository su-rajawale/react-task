import styles from "./styles.module.css";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Tooltip } from "@mui/material";

const ListOffers = ({ offers, getOffers }) => {
  const deleteOffer = async (id) => {
    await axios.delete(`http://localhost:5000/offers/${id}`);
    getOffers();
  };

  const handleActivation = (id) => {
    axios.get("http://localhost:5000/offers/").then((res) => {
      const data = res.data;
      const ofr = data.find((x) => x.id === id);
      if (ofr.activated === true) {
        const dact = { activated: false };
        axios.patch(`http://localhost:5000/offers/${id}`, dact);
        getOffers();
      } else if (ofr.activated === false) {
        const act = { activated: true };
        axios.patch(`http://localhost:5000/offers/${id}`, act);
        getOffers();
      }
    });
  };

  const handleDownload = (id, file) => {
    const pdfLink = `${file}`;
    const type = pdfLink.split(";")[0].split("/")[1];
    const anchorElement = document.createElement("a");
    const fileName = `offer_image_${id}.${type}`;
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;
    anchorElement.click();
  };

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
                    <TableCell>Activated</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map(
                    ({ title, updatedAt, id, activated, file }, index) => (
                      <TableRow key={index}>
                        <TableCell>{`${index + 1}.`}</TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>{updatedAt}</TableCell>
                        <TableCell>
                          {activated ? <p>Yes</p> : <p>No</p>}
                        </TableCell>
                        <TableCell className={styles.action}>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => deleteOffer(id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title={activated ? "Deactivate" : "Activate"}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => handleActivation(id)}
                            >
                              {activated ? (
                                <BlockIcon />
                              ) : (
                                <CheckCircleOutlineIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Download'>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDownload(id, file)}
                            >
                              {file ? <GetAppIcon /> : null}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  )}
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
