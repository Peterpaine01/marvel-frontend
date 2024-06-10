import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Home = ({}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://site--marvel-backend--fklc4pfyn242.code.run/characters?name=${search}&skip=${skip}`
  //       );
  //       console.log(response.data);
  //       setData(response.data);
  //       setIsLoading(false);

  //       // console.log(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <main>
      <div className="container">
        <section className="flex-parent page-title">
          <h1>Home</h1>
        </section>

        <section className="flex-parent">
          <Link className="btn-light" to={`/characters`}>
            Personnages
          </Link>
          <Link className="btn-light" to={`/comics`}>
            Comics
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Home;
