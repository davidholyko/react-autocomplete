import React from 'react';
import classNames from 'classnames';
import AutoSuggestion from './AutoSuggestion';
import _ from 'lodash';

function useKeyPress(content, setCallback) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = React.useState(false);
  const [multiKeyPressed, setMultiKeyPressed] = React.useState(new Set([]));

  // Add event listeners
  React.useEffect(
    () => {
      // If pressed key is our target key then set to true
      const downHandler = _.debounce((event) => {
        const { key } = event;

        setKeyPressed(true);
        setMultiKeyPressed(multiKeyPressed.add(key));

        switch (key) {
          case 'Tab':
            setCallback(content + '\t');
            break;
          case 'Enter':
            setCallback(content + '\n');
            break;
          case 'Meta':
          case 'Shift':
            // Allows shift
            break;
          case 'Backspace':
            setCallback(content.substring(0, content.length - 1));
            break;
          default:
            setCallback(content + key);
            break;
        }
      });

      // If released key is our target key
      // add to content passed in and then set to false
      const upHandler = (event) => {
        const { key } = event;
        if (!keyPressed && !multiKeyPressed.has(key)) {
          return;
        }
        event.preventDefault();
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
    [content, keyPressed, setCallback, multiKeyPressed],
  );

  return keyPressed;
}

// eslint-disable-next-line
const Editor = (props) => {
  const [content, setContent] = React.useState('');
  const [isFocused, setFocus] = React.useState(false);
  const customEditorRef = React.useRef(null);
  const onHandleClick = (e, rest) => {
    setFocus(true);
  };

  React.useEffect(() => {
    isFocused && customEditorRef.current.focus();
  }, [isFocused]);

  useKeyPress(content, setContent);

  return (
    <div
      className={classNames('editor', { focused: isFocused })}
      onClick={onHandleClick}
      ref={customEditorRef}
    >
      {content}
      <span className="cursor">|</span>
      <AutoSuggestion />
    </div>
  );
};

export default Editor;
