import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { SalesData } from "./cv-data";
import { DocumentCreator } from "./cv-generator";

const DownloadDocWithName = () => {
  const [text, setText] = useState("");

  const generate = () => {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      
      SalesData,
      text,
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "salesDashbord.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <div>
      <div style={{margin:'10px'}}>

      <label>
        Enter Text: <input placeholder="Enter Text..." onChange={(e) => setText(e.target.value)} />
      </label>
      
      </div>
   
      
        <button style={{ backgroundColor:'black',color:'white'}}onClick={generate}>Generate  docx!</button>
     
    </div>
  );
};

export default DownloadDocWithName;
