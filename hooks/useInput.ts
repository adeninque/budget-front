import { ChangeEvent, useState } from "react";

const useInput = (initValue: string) => {
  const [value, setValue] = useState(initValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return {
    bind: {
      value,
      onChange,
    },
    value,
  };
};

export default useInput;
