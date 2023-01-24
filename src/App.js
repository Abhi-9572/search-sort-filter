import axios from "axios";
import { useEffect, useState } from "react";




function App() {

  const [data1, setData1] = useState([]);
  const [fdata, setFData] = useState([]);
  const [sortData, setSortData] = useState([])
  const [sdata, setSData] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      return await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((userData) => {
         setData1(userData.data)
          setSData(userData.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    fetchData();
  }, [])

  const searchData = (a) => {
    console.log(a);
    if (!a) {
      setSData(data1)
      return sdata;
    }
    else {

      let filterData = data1.filter((val) => {

        return val.name.toLowerCase().includes(a)
      })

      console.log(filterData);

      setFData(filterData)
      setSData(fdata)
    }
  }
  
  const handleSort = (e) => {
    let value = e.target.value;
    const sorter1 = (a, b) => a[value].toLowerCase() > b[value].toLowerCase() ? 1 : -1;
    let newData = data1.sort(sorter1)
  
    setSData(newData)

  }
 

  const handleFilter = (value) => {

  }
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Search Filter Sort Pagignation</h1>
      <form >
        <input placeholder="Search" onChange={(e) => searchData(e.target.value)}></input>

      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nos</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            sdata.map((val) => {
              return <tr>
                <th scope="row">{val.id}</th>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.address.city}</td>
                <td>{val.phone}</td>
                <td>{(val.id) % 2 == 0 ? "Active" : "Inactive"}</td>

              </tr>
            })
          }
        </tbody>
      </table>
      <div style={{ marginInline: "50px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <h5>SortBy:</h5>

          <select onChange={handleSort}>

            <option value="name">name</option>
            <option value="address">address</option>
            <option value="email">email</option>
            <option value="phone">phone</option>
            <option value="status">status</option>
          </select>
        </div>
        <div>
          <h5>Filter by Status</h5>
          <button onClick={() => handleFilter("active")}>Active</button>
          <button onClick={() => handleFilter("inactive")}>Inactive</button>
        </div>
      </div>

    </div>
  );
}
export default App;
