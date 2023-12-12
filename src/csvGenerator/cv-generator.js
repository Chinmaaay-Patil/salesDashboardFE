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
  create([SalesData, text]) {
    const document = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              text: SalesData.company.name,
              heading: HeadingLevel.HEADING_1,
             
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun(`Enter Name from React: ${text}`)],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun(
                 ''       ),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun(
                  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
                ),
              ],
            }),
          ],
        },
      ],
    });

    return document;
  }
}
