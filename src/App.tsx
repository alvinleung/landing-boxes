import React from "react";
import "./App.css";
import Project from "./components/Project";

const RepeatableGrid = () => (
  <>
    <Project name="Inspired" />
    <div />
    <div />
    <div />
    <div />
    <Project name="Prologue" />
    <div />
    <Project name="Work Week" />
    <div />
    <Project name="Almost Fun" />
    <div />
    <div />
    <div />
    <div />
    <Project name="Inspired" />
    <Project name="Party Round" />
    <div />
    <div />
    <div />
    <div />
    <Project name="Inspired" />
  </>
);

function App() {
  return (
    <div className="w-full h-screen grid grid-cols-3 gap-4 p-4 overflow-x-hidden">
      <RepeatableGrid />
      <RepeatableGrid />
    </div>
  );
}

export default App;
