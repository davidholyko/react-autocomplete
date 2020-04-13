import React from 'react';
import './App.css';
import classNames from 'classnames';

function useKeyPress(content, setCallback) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);

  // Add event listeners
  React.useEffect(() => {
    // If pressed key is our target key then set to true
    const downHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setKeyPressed(true);
      keyPressed && setCallback(content + event.key);
    };

    // If released key is our target key then set to false
    const upHandler = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setKeyPressed(false);
      keyPressed && setCallback(content + event.key);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [content, keyPressed, setCallback]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

const CustomEditor = (props) => {
  const [content, setContent] = React.useState('');
  const [isFocused, setFocus] = React.useState(false);
  const customEditorRef = React.useRef(null);
  const onHandleClick = (e, rest) => {
    console.log('onHandleClick', e);
    console.log('customEditorRef', customEditorRef);
    customEditorRef.current.focus();
    setFocus(true);
  };

  React.useEffect(() => {
    isFocused && customEditorRef.current.focus();
  }, [isFocused, content]);

  useKeyPress(content, setContent);

  return (
    <div
      className={classNames('editor', { focused: isFocused })}
      onClick={onHandleClick}
      ref={customEditorRef}
    >
      {content}
    </div>
  );
};

function App() {
  return <CustomEditor />;
}

export default App;
