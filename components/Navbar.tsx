import fetchUser from "@/utils/fetchUser";

const Navbar = async () => {
  const user = await fetchUser()

  return(
    <>
      <p>{user.username}</p>
    </>
  )
}

export default Navbar;