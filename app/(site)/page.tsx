import fetchUser from "@/utils/fetchUser";

const Home = async () => {
  const user = await fetchUser()
  return(
    <>
      <h1>Home</h1>
      <p>{user.email}</p>
    </>
  )
}

export default Home;