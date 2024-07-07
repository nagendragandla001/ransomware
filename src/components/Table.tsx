import { Link } from "react-router-dom";
import styles from "./Table.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { deleteRecord, queryClient } from "../utils/http";

interface RandomwareRecord {
  name: string[];
  microsoftDetectionName: string;
  extensions: string;
  encryptionAlgorithm: string;
  iocs: string;
}

interface TableProps {
  data: RandomwareRecord[],
}

const Table = ({ data }: TableProps) => {

  const { mutate } = useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    }
  })

  const onDelete = (id: string) => {
    mutate({ id });
  }


  return (
    <table className={styles.table} border={1}>
      <thead className={styles.thead}>
        <tr>
          <th>Name</th>
          <th>Microsoft Detection Name</th>
          <th>Extension</th>
          <th>Encryption Algorithm</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {
          data.map(record => (
            <tr key={record.iocs}>
              <td>{record.name.join(", ")}</td>
              <td>{record.microsoftDetectionName}</td>
              <td>{record.extensions}</td>
              <td>{record.encryptionAlgorithm}</td>
              <td className={styles.actions}>
                <Link to={`/${record.name.join("")}`}>
                  <MdEdit />
                </Link>
                <button className="deleteButton" onClick={() => onDelete(record.encryptionAlgorithm)}>
                  <MdDelete className="" />
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>

    </table>


  )
}

export default Table;