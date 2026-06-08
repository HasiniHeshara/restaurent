import { useEffect, useState } from "react";
import axios from "axios";

function AdminCustomers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get(
      "http://localhost:5000/customers"
    );

    setCustomers(res.data);
  };

  return (
    <div>
      <h2>Customers</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default AdminCustomers;