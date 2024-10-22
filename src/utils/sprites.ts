export const getRowColByNumber = ({
  number,
  numberOfCol,
  enablePolka = false,
}: {
  number: number;
  numberOfCol: number;
  enablePolka?: boolean;
}) => {
  if (!enablePolka) {
    const row = Math.ceil(number / numberOfCol);
    const col = (number % numberOfCol) || numberOfCol;
    return [row, col] as const;
  }

  const numberOfColFor2Rows = numberOfCol * 2 - 1;
  const div = number / numberOfColFor2Rows;
  const delta = div - Math.floor(div);
  const secondRow = Math.ceil(div) * 2;
  const prevDiv = (number - 1) / numberOfColFor2Rows;
  const prevDelta = prevDiv - Math.floor(prevDiv);
  const isFirstRow = delta > 0 && (delta < 0.5 || (prevDelta < 0.5 && delta > 0.5));
  const row = isFirstRow ? secondRow - 1 : secondRow;
  const colFor2Rows = (number % numberOfColFor2Rows) || numberOfColFor2Rows;
  const col = colFor2Rows > numberOfCol ? colFor2Rows - numberOfCol : colFor2Rows;
  return [row, col] as const;
}