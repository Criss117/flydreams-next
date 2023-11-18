const page = () => {
  return (
    <div className="w-full justify-center items-center flex">
      <form className="flex flex-col w-[30rem]">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default page;
