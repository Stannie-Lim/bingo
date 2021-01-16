import React, { useState } from "react";

const Login = ({ login, username, setUsername }) => {
  const changeUsername = ({ target }) => {
    setUsername(target.value);
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          onChange={changeUsername}
          username={username}
          required
        />
        <button>Play</button>
      </form>
    </div>
  );
};

export default Login;
