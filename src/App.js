import "./App.css";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import useLocalStorage from "./hooks/useLocalStorage";
import data from "./data.json";
const App = () => {
  const [value, updateValue] = useLocalStorage("saved", "## Hello");
  const [compiled, setCompiled] = useState(marked(value));
  const [openMarkdown, setOpenMarkdown] = useState(true);
  const [openPreview, setOpenPreview] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [docs, setDocs] = useState(data);
  //////////// i had cors origin error from the api so i hardcoded the data
  // useEffect(() => {
  //   if (openDocs==true) {
  //     console.log('enter');
  //     const getDocs = async () => {
  //       const response = await fetch('https://www.markdownguide.org/api/v1/basic-syntax.json');
  //  if(response.data)
  // {
  //   setDocs(response.data);
  // }
  //       console.log(response);
  //     };
  //     getDocs()
  //   }
  // }, [openDocs]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    updateValue(newValue);
    setCompiled(marked(newValue));
  };

  return (
    <>
      <h1>Markdown Previewer React App</h1>
      <div className="container">
        <div className="btns" style={{ display: "flex" }}>
          <button
            onClick={() => {
              setOpenMarkdown(true);
              setOpenDocs(false);
              setOpenPreview(false);
            }}
            className={`${openMarkdown ? "btn" : ""}`}
          >
            Markdown
          </button>
          <button
            onClick={() => {
              setOpenMarkdown(false);
              setOpenDocs(false);
              setOpenPreview(true);
            }}
            className={`${openPreview ? "btn" : ""}`}
          >
            Preview
          </button>
          <button
            onClick={() => {
              setOpenMarkdown(false);
              setOpenDocs(true);
              setOpenPreview(false);
            }}
            className={`${openDocs ? "btn" : ""}`}
          >
            docs
          </button>
        </div>
        {openMarkdown && (
          <div>
            <span style={{ color: "wheat" }}>markdown</span>
            <textarea onChange={(e) => handleChange(e)} value={value} />
          </div>
        )}

        {openPreview && (
          <div>
            <span style={{ color: "wheat" }}>preview</span>
            <textarea value={compiled} />
          </div>
        )}

        {openDocs && (
          <div
            style={{
              padding: "20px",
              textAlign: "start",
              backgroundColor: "white",
            }}
          >
            <span style={{ color: "wheat" }}>docs</span>
            <div className="docs">
              {docs.basic_syntax.map((doc) => {
                return (
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "25px",
                      marginBottom: "20px",
                    }}
                  >
                    <h3>{doc.name}</h3>
                    <p>{doc.description}</p>
                    {doc.additional_examples.map((ex) => {
                      return (
                        <div style={{ backgroundColor: "gray" }}>
                          <h3>{ex.name} </h3>
                          <p>{ex.description} </p>
                          <h4>--markdown</h4>
                          <p>{ex.markdown} </p>
                          <h4>--html</h4>
                          <p>{ex.html}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
