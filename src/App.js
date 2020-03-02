import React from 'react';
import './App.css';
import { Editor, EditorState } from 'draft-js';

const CustomEditor = props => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );
  return <Editor editorState={editorState} onChange={setEditorState} />;
};

function App() {
  return <CustomEditor />;
}

export default App;
