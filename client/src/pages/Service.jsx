import { useAuth } from "../Store/Auth";

const Service = () => {
  const { contact } = useAuth();
  // console.log(contact[0].description);
  if (!contact) {
    return <div>Loading...</div>; // Or handle loading state as needed
  }
  return (
    <div>
      {contact.map((cont, index) => (
        <div className="services" key={index}>
          <div className="img">
            <img
              src="https://images.hdqwalls.com/wallpapers/dark-soul-boy-minimal-hoodie-qd.jpg"
              alt=""
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className="content11">
            <p>Provider : {cont.provider}</p>
            <p>Price: {cont.price}</p>
            <p>Service : {cont.service}</p>
            <p>Description: {cont.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;
