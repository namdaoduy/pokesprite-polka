import { useSettingsContext } from "contexts/settings";
import { useEffect, useRef } from "react"
import { shuffleArray } from "utils/rng";
import { getRowColByNumber } from "utils/sprites";

export default function ResultCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { watch, pokemonData, pokemonSprite } = useSettingsContext();

  const originalCanvasWidth = watch('canvasWidth');
  const originalCanvasHeight = watch('canvasHeight');
  const spriteWidth = watch('spriteWidth');
  const spriteHeight = watch('spriteHeight');
  const spriteNumCol = watch('spriteNumCol');
  const drawWidth = watch('drawWidth');
  const drawHeight = watch('drawHeight');
  const drawNumCol = watch('drawNumCol');
  const drawScale = watch('drawScale');
  const scaleCanvas = watch('scaleCanvas');
  const horizontalPadding = watch('horizontalPadding');
  const verticalPadding = watch('verticalPadding');
  const enablePolka = watch('enablePolka');
  const minPokemons = watch('minPokemons');
  const shufflePokemons = watch('shufflePokemons');
  const shufflePokemonsSeed = watch('shufflePokemonsSeed');

  const canvasWidth = scaleCanvas ? originalCanvasWidth * drawScale : originalCanvasWidth;
  const canvasHeight = scaleCanvas ? originalCanvasHeight * drawScale : originalCanvasHeight;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }
    if (!pokemonData || !pokemonSprite) {
      return;
    }

    // Disable image smoothing for pixel perfect result
    ctx.imageSmoothingEnabled = false;

    // Draw BG
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#4f5463';
    ctx.fill();

    // Draw pokemon images
    let renderList = [...pokemonData.list];
    if (minPokemons > renderList.length) {
      const loopCount = Math.floor(minPokemons / renderList.length);
      for (let i = 0; i < loopCount; i++) {
        renderList = [...renderList, ...pokemonData.list];
      }
      renderList = renderList.slice(0, minPokemons);
    }
    if (shufflePokemons) {
      renderList = shuffleArray(renderList, shufflePokemonsSeed || undefined);
    }
    renderList.forEach((pokemon, index) => {
      const pokemonIdx = parseInt(pokemon.idx);
      const [spriteRow, spriteCol] = getRowColByNumber({
        number: pokemonIdx,
        numberOfCol: spriteNumCol,
      });
      const spritePos = [
        (spriteCol - 1) * spriteWidth,
        (spriteRow - 1) * spriteHeight,
        spriteWidth,
        spriteHeight,
      ] as const;

      const [drawRow, drawCol] = getRowColByNumber({
        number: index + 1,
        numberOfCol: drawNumCol,
        enablePolka,
      });
      const scaledDrawWidth = drawWidth * drawScale;
      const scaledDrawHeight = drawHeight * drawScale;
      const scaledSpriteWidth = spriteWidth * drawScale;
      const scaledSpriteHeight = spriteHeight * drawScale;
      const drawHorizontalPadding = (scaledDrawWidth - scaledSpriteWidth) / 2;
      const drawVerticalPadding = (scaledDrawHeight - scaledSpriteHeight) / 2;
      let extraDrawLeftOffset = 0;
      if (enablePolka && drawRow % 2 === 0) {
        extraDrawLeftOffset = scaledDrawWidth / 2;
      }
      const totalOffsetLeft = drawHorizontalPadding + horizontalPadding * drawScale + extraDrawLeftOffset;
      const totalOffsetTop = drawVerticalPadding + verticalPadding * drawScale;
      const drawPos = [
        (drawCol - 1) * scaledDrawWidth + totalOffsetLeft,
        (drawRow - 1) * scaledDrawHeight + totalOffsetTop,
        scaledSpriteWidth,
        scaledSpriteHeight,
      ] as const;

      ctx.drawImage(
        pokemonSprite,
        ...spritePos,
        ...drawPos,
      );
    });

    return () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }, [
    canvasWidth,
    canvasHeight,
    pokemonData,
    pokemonSprite,
    spriteWidth,
    spriteHeight,
    spriteNumCol,
    drawWidth,
    drawHeight,
    drawNumCol,
    drawScale,
    horizontalPadding,
    verticalPadding,
    enablePolka,
    minPokemons,
    shufflePokemons,
    shufflePokemonsSeed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}