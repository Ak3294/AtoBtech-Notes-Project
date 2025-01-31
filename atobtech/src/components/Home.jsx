import React from "react";

import { useState } from "react";
import Navbar from "./Navbar";
import NotesPage from "../pages/NotesPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <NotesPage />
    </>
  );
}
