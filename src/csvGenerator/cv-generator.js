import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";


export class DocumentCreator {
  
  create([
    SalesData,
    text,
  ]) {
    
    const document = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: SalesData.company.name,
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun(`Mobile: ${text}`)],
            }),

        
          ],
        },
      ],
    });

    return document;
  }

  

}
