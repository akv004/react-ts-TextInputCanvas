import React, { useEffect, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';


const textState = atom({
  key: 'textState',
  default: '6546',
});

const selectionState = atom({
  key: 'selectionState',
  default: { start: 0, end: 0 },
});

export const  TextInputCanvas= ()=> {
  const [text, setText] = useRecoilState(textState);
  const [selection, setSelection] = useRecoilState(selectionState);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.font = '48px serif';
    context.fillText(text, 10, 50);

    // Calculate the position of the text cursor
    const { start, end } = selection;
    const startPos = getCursorPos(start);
    const endPos = getCursorPos(end);

    // Draw the text cursor
    context.fillStyle = 'black';
    context.fillRect(startPos.x, startPos.y, 2, 48);

    // Draw the selection highlight
    if (start !== end) {
      context.fillStyle = 'rgba(0, 0, 255, 0.2)';
      context.fillRect(startPos.x, startPos.y, endPos.x - startPos.x, 48);
    }
  }, [text, selection]);

  function getCursorPos(index: number): { x: number; y: number } {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const measure = context.measureText(text.substring(0, index));
    return { x: measure.width, y: 10 };
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("ddd");
    const { value } = event.target;
    setText(value);
    setSelection({ start: value.length, end: value.length });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      // Do something with the entered text
    } else if (event.key === 'ArrowLeft') {
      setSelection({
        start: Math.max(selection.start - 1, 0),
        end: Math.max(selection.end - 1, 0),
      });
    } else if (event.key === 'ArrowRight') {
      setSelection({
        start: Math.min(selection.start + 1, text.length),
        end: Math.min(selection.end + 1, text.length),
      });
    } else if (event.key === 'ArrowUp') {
      // Move the cursor to the start of the previous line
    } else if (event.key === 'ArrowDown') {
      // Move the cursor to the start of the next line
    } else if (event.key === 'Home') {
      setSelection({ start: 0, end: 0 });
    } else if (event.key === 'End') {
      setSelection({ start: text.length, end: text.length });
    } else if (event.key === 'Backspace') {
      if (selection.start === selection.end) {
        setText(text.substring(0, selection.start - 1) + text.substring(selection.end));
        setSelection({ start: selection.start - 1, end: selection.start - 1 });
      } else {
        setText(text.substring(0, selection.start) + text.substring(selection.end));
      }
    }
  }

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        className="canvas"
        onClick={() => canvasRef.current?.focus()}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
    </div>
  );
}

    
