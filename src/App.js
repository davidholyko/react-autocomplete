import React from 'react';
import './App.css';
import classNames from 'classnames';

function useKeyPress(content, setCallback) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);
  const [multiKeyPressed, setMultiKeyPressed] = React.useState(new Set([]));

  // Add event listeners
  React.useEffect(
    () => {
      // If pressed key is our target key then set to true
      const downHandler = (event) => {
        const { key } = event;
        console.log('!!! key down', key);
        setKeyPressed(true);
        setMultiKeyPressed(multiKeyPressed.add(key));
      };

      // If released key is our target key
      // add to content passed in and then set to false
      const upHandler = (event) => {
        const { key } = event;
        console.log('!!! key up', key, keyPressed);
        if (!keyPressed && !multiKeyPressed.has(key)) {
          return;
        }
        event.preventDefault();
        setKeyPressed(false);
        switch (key) {
          case 'Tab':
            setCallback(content + '\t');
            break;
          case 'Enter':
            setCallback(content + '\n');
            break;
          case 'Meta':
          case 'Shift':
            // @todo: add uppercase
            break;
          case 'Backspace':
            setCallback(content.substring(0, content.length - 1));
            break;
          default:
            setCallback(content + key);
            break;
        }

        multiKeyPressed.delete(key);
        setKeyPressed(multiKeyPressed);
      };

      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    },
    // Empty array ensures that effect is only run on mount and unmount
    [content, keyPressed, setCallback],
  );

  return keyPressed;
}

// eslint-disable-next-line
const CustomEditor = (props) => {
  const [content, setContent] = React.useState('');
  const [isFocused, setFocus] = React.useState(false);
  const customEditorRef = React.useRef(null);
  const onHandleClick = (e, rest) => {
    setFocus(true);
  };

  React.useEffect(
    () => {
      isFocused && customEditorRef.current.focus();
    },
    //
    [isFocused, content],
  );

  useKeyPress(content, setContent);

  return (
    <div
      className={classNames('editor', { focused: isFocused })}
      onClick={onHandleClick}
      ref={customEditorRef}
    >
      {content}
      <span className="cursor">|</span>
    </div>
  );
};

function App() {
  return <CustomEditor />;
}

export default App;
