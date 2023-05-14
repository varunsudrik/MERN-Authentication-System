import React from "react";
import { useAuthStore } from "../store/store";

export default function Dodo() {
  const { Username } = useAuthStore((state) => state.auth);
  console.log(`Username is ${Username} at dodo`);

  return <div>dodo</div>;
}
