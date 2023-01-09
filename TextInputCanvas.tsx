import React, { useEffect, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';


const textState = atom({
  key: 'textState',
  default: '',
});

export const  TextInputCanvas= ()=> {
  const [text, setText] = useRecoilState(textState);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.font = '48px serif';
    context.fillText(text, 10, 50);
  }, [text]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Do something with the entered text
    }
  };

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        className="canvas"
        onClick={() => canvasRef.current?.focus()}
      />
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="input"
      />
    </div>
  );
}
