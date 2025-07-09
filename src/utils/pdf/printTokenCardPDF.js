import jsPDF from "jspdf";

export const generateCardsPdf = (data, fileName = "kartu") => {
  const doc = new jsPDF();

  const cardWidth = 80;
  const cardHeight = 40;
  const marginX = 10;
  const marginY = 10;
  const gapX = 5;
  const gapY = 5;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const cardsPerRow = Math.floor(
    (pageWidth - 2 * marginX + gapX) / (cardWidth + gapX),
  );
  const cardsPerCol = Math.floor(
    (pageHeight - 2 * marginY + gapY) / (cardHeight + gapY),
  );
  const cardsPerPage = cardsPerRow * cardsPerCol;

  data.forEach((user, index) => {
    const pageIndex = Math.floor(index / cardsPerPage);
    const positionInPage = index % cardsPerPage;
    const row = Math.floor(positionInPage / cardsPerRow);
    const col = positionInPage % cardsPerRow;

    const x = marginX + col * (cardWidth + gapX);
    const y = marginY + row * (cardHeight + gapY);

    if (index > 0 && positionInPage === 0) {
      doc.addPage();
    }

    // Gambar kotak kartu
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.rect(x, y, cardWidth, cardHeight);

    // Teks dalam kartu
    const fontSize = user.name.length > 20 ? 10 : 12;
    doc.setFontSize(fontSize);
    doc.text(`Token: ${user.token}`, x + 5, y + 15);
    doc.text(`Nama: ${user.name}`, x + 5, y + 25);
  });

  doc.save(`${fileName}`);
};
