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
      <input onChange={(e) => setText(e.target.value)} />
   
      
        <button onClick={generate}>Generate CV with docx!</button>
     
    </div>
  );
};

export default DownloadDocWithName;
